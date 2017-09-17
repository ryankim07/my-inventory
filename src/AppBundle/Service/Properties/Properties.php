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

class Properties
{
    private $em;
    private $repo;
    private $fileUploader;
    private $built;
    private $style;
    private $beds;
    private $baths;
    private $floors;
    private $finishedArea;
    private $unfinishedArea;
    private $totalArea;
    private $parcelNumber;
    private $address;
    private $assets;
    private $entity;
    private $existingProperty;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     * @param FileUploader $fileUploader
     */
    public function __construct(EntityManager $entityManager,
                                FileUploader $fileUploader)
    {
        $this->em           = $entityManager;
        $this->repo         = $this->em->getRepository('AppBundle\Entity\Properties\PropertyEntity');
        $this->fileUploader = $fileUploader;
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

        $results = $this->addDependencies($results);

        return $results;
    }

    /**
     * Add dependencies
     *
     * @param $results
     * @return mixed
     */
    private function addDependencies($results)
    {
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
            $id                   = (int)$data['id'];
            $this->built          = $data['built'];
            $this->style          = $data['style'];
            $this->floors         = (int)$data['floors'];
            $this->beds           = (int)$data['beds'];
            $this->baths          = $data['baths'];
            $this->finishedArea   = $data['finished_area'];
            $this->unfinishedArea = $data['unfinished_area'];
            $this->totalArea      = $data['total_area'];
            $this->parcelNumber   = $data['parcel_number'];
            $this->address        = $data['address'];
            $this->assets         = $data['assets'];

            $this->existingProperty = $this->find($id);

            if ($this->existingProperty) {
                $this->entity = $this->existingProperty;
            }

            $op = !$this->existingProperty ? 'added' : 'updated';
            $msg = "Property successfully {$op}.";

            // Save or update property
            if ($this->_saveProperty()) {
                $msg = "Property could not be {$op}.";
            };

            return [
                'property' => $this->entity,
                'msg'      => "Property successfully {$msg}."
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
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

    /**
     * Save or update property
     *
     * @return bool
     */
    private function _saveProperty()
    {
        // Upload asset
        $assetFullPath = !is_null($this->assets) ? $this->fileUploader->upload($this->assets) : null;

        if (!$this->existingProperty) {
            $this->entity = new PropertyEntity();
            $assetEntity  = new PropertyAssetsEntity();
        } else {
            $assetEntity = $this->em->getRepository('AppBundle\Entity\Properties\PropertyAssetsEntity')->findByPropertyId($this->entity->getId());
        }

        $this->entity->setBuilt($this->built);
        $this->entity->setStyle($this->style);
        $this->entity->setFloors($this->floors);
        $this->entity->setBeds($this->beds);
        $this->entity->setBaths($this->baths);
        $this->entity->setFinishedArea($this->finishedArea);
        $this->entity->setUnfinishedArea($this->unfinishedArea);
        $this->entity->setTotalArea($this->totalArea);
        $this->entity->setParcelNumber($this->parcelNumber);

        $addressEntity = new AddressEntity();

        $addressEntity->setPropertyId($this->entity->getId());
        $addressEntity->setStreet($this->address['street']);
        $addressEntity->setCity($this->address['city']);
        $addressEntity->setState($this->address['state']);
        $addressEntity->setZip($this->address['zip']);
        $addressEntity->setCounty($this->address['county']);
        $addressEntity->setCountry($this->address['country']);
        $addressEntity->setSubdivision($this->address['subdivision']);

        $this->entity->addAddress($addressEntity);

        if (!is_null($this->assets)) {
            foreach($assetEntity as $asset) {
                $asset->setName($this->assets->getClientOriginalName());
                $asset->setPath($assetFullPath);
                $this->entity->addAsset($asset);
            }
        }

        if (!$this->existingProperty) {
            $this->em->persist($this->entity);
        }

        $this->em->flush();

        return true;
    }
}