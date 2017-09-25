<?php
/**
 * Created by PhpStorm.
 * User: kimr234z
 * Date: 2/21/17
 * Time: 10:28 AM
 */

namespace AppBundle\Service\Properties;

use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Properties\PropertyEntity;
use AppBundle\Entity\Properties\AddressEntity;
use AppBundle\Entity\Properties\PropertyAssetsEntity;
use AppBundle\Service\FileUploader;
use AppBundle\Service\Configuration\Properties\Rooms as ConfiguredRooms;

class Properties
{
    private $em;
    private $repo;
    private $configuredRoomsService;
    private $fileUploader;
    private $entity;
    private $existingProperty;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     * @param ConfiguredRooms $configuredRoomsService
     * @param FileUploader $fileUploader
     */
    public function __construct(EntityManager $entityManager,
                                ConfiguredRooms $configuredRoomsService,
                                FileUploader $fileUploader)
    {
        $this->em                     = $entityManager;
        $this->repo                   = $this->em->getRepository('AppBundle\Entity\Properties\PropertyEntity');
        $this->configuredRoomsService = $configuredRoomsService;
        $this->fileUploader           = $fileUploader;
    }

    /**
     * Get all properties
     *
     * @return mixed|string
     */
    public function findAll()
    {
        return $this->doSelect();
    }

    /**
     * Find specific property
     *
     * @param $id
     * @return mixed|null|object|string
     */
    public function find($id = null)
    {
        return $this->doSelect($id);
    }

    /**
     * Query and add dependencies
     *
     * @param null $id
     * @return mixed|string
     */
    private function doSelect($id = null)
    {
        $results = !is_null($id) ? $this->repo->find($id) : $this->repo->findBy([], ['built' => 'DESC']);

        if (!$results instanceof PropertyEntity) {
            $results = $this->addDependencies($results);
        }

        return $results;
    }

    /**
     * Add dependencies
     *
     * @param $properties
     * @return array
     */
    private function addDependencies($properties)
    {
        // Get all the rooms available for a property
        $configRooms = $this->configuredRoomsService->getRoomsList();
        $results     = [];

        foreach($properties as $property) {
            $rooms         = $property->getRooms();
            $existingRooms = [];

            foreach ($rooms as $room) {
                $existingRooms[] = $room->getName();
            }

            // Get the differences of what a particular property already
            // has against all the available rooms
            $roomsDiff = array_diff($configRooms, $existingRooms);

            $diff = [];
            foreach ($roomsDiff as $index => $value) {
                $diff[] = [
                    'value' => $value,
                    'title' => ucwords($value)
                ];
            }

            $property->addNonAddedRooms($diff);
            $results[] = $property;
        }

        return $results;
    }

    /**
     * Save
     *
     * @param $data
     * @return array
     */
    public function save($data)
    {
        if (count($data) == 0) {
            return ['msg' => 'Property information empty.'];
        }

        try {
            $this->existingProperty = $this->find($data['id']);

            $this->entity = $this->existingProperty ? $this->existingProperty : new PropertyEntity();

            $op = !$this->existingProperty ? 'added' : 'updated';
            $msg = "Property successfully {$op}.";

            // Save or update property
            if (!$this->_save($data)) {
                $msg = "Property could not be {$op}.";
            };

            return [
                'property' => $this->entity,
                'msg'      => $msg
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }

    /**
     *  Save or update property
     *
     * @param $data
     * @return bool
     */
    private function _save($data)
    {
        // Upload asset
        $assets        = $data['assets'];
        $assetFullPath = !is_null($assets) ? $this->fileUploader->upload($assets) : null;

        if (!$this->existingProperty) {
            $addressEntity = new AddressEntity();
            $assetEntity   = new PropertyAssetsEntity();
        } else {
            $addressEntity = $this->em->getRepository('AppBundle\Entity\Properties\AddressEntity')->findOneByPropertyId($this->entity->getId());
            $assetEntity   = $this->em->getRepository('AppBundle\Entity\Properties\PropertyAssetsEntity')->findByPropertyId($this->entity->getId());
        }

        // Property entity
        $this->entity->setBuilt($data['built']);
        $this->entity->setStyle($data['style']);
        $this->entity->setFloors($data['floors']);
        $this->entity->setBeds($data['beds']);
        $this->entity->setBaths($data['baths']);
        $this->entity->setFinishedArea($data['finished_area']);
        $this->entity->setUnfinishedArea($data['unfinished_area']);
        $this->entity->setTotalArea($data['total_area']);
        $this->entity->setParcelNumber($data['parcel_number']);

        // Address entity
        if (!is_null($data['address'])) {
            $addressEntity->setPropertyId($this->entity->getId());
            $addressEntity->setStreet($data['address']['street']);
            $addressEntity->setCity($data['address']['city']);
            $addressEntity->setState($data['address']['state']);
            $addressEntity->setZip($data['address']['zip']);
            $addressEntity->setCounty($data['address']['county']);
            $addressEntity->setCountry($data['address']['country']);
            $addressEntity->setSubdivision($data['address']['subdivision']);
            $this->entity->addAddress($addressEntity);
        }

        // Assets entity
        if (!is_null($assets)) {
            if (!$this->existingProperty) {
                $assetEntity->setName($assets->getClientOriginalName());
                $assetEntity->setPath($assetFullPath);
                $this->entity->addAsset($assetEntity);
            } else {
                foreach($assetEntity as $asset) {
                    $asset->setName($assets->getClientOriginalName());
                    $asset->setPath($assetFullPath);
                    $this->entity->addAsset($asset);
                }
            }
        }

        if (!$this->existingProperty) {
            $this->em->persist($this->entity);
        }

        $this->em->flush();

        return true;
    }

    /**
     * Delete property
     *
     * @param $id
     * @return array
     */
    public function delete($id)
    {
        if (!isset($id)) {
            return ['msg' => 'Empty ID for deleting property.'];
        }

        try {
            $property = $this->repo->find($id);
            //$address  = $property->getAddress();
            $assets   = $property->getAssets();

            foreach($assets as $asset) {
                if ($asset->getPropertyId() == $id) {
                    $this->fileUploader->removeUpload($asset->getPath());
                    $this->em->remove($asset);
                    break;
                } else {
                    continue;
                }
            }

            //$property->setAddress(null);
            $this->em->remove($property);
            $this->em->flush();

            return [
                'msg' => 'Property successfully deleted.',
                'id'  => $id
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }
}