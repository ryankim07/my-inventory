<?php
/**
 * Created by PhpStorm.
 * User: kimr234z
 * Date: 2/21/17
 * Time: 10:28 AM
 */

namespace AppBundle\Service\Properties;

use AppBundle\Entity\Properties\RoomsEntity;
use AppBundle\Entity\Properties\RoomsWallsEntity;
use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Properties\PropertyEntity;
use AppBundle\Entity\Properties\AddressEntity;
use AppBundle\Entity\Properties\FeaturesEntity;
use AppBundle\Entity\Properties\ExteriorFeaturesEntity;
use AppBundle\Entity\Properties\InteriorFeaturesEntity;
use AppBundle\Entity\Properties\PropertyAssetsEntity;
use AppBundle\Service\FileUploader;
use AppBundle\Service\Configuration\Properties\Rooms as ConfiguredRooms;

class Features
{
    private $em;
    private $repo;
    private $propertyId;
    private $parking;
    private $multiUnit;
    private $hoa;
    private $utilities;
    private $lot;
    private $commonWalls;
    private $facingDirection;
    private $others;
    private $entity;
    private $existingFeatures;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     */
    public function __construct(EntityManager $entityManager)
    {
        $this->em   = $entityManager;
        $this->repo = $this->em->getRepository('AppBundle\Entity\Properties\FeaturesEntity');
    }

    /**
     * Get all property features
     *
     * @return mixed|string
     */
    public function findAll()
    {
        return $this->doSelect();
    }

    /**
     * Find specific property features
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
        $results = !is_null($id) ? $this->repo->find($id) : $this->repo->findBy([], ['id' => 'DESC']);

        if (!is_null($id)) {
            $results = $this->addDependencies($results);
        }

        return $results;
    }

    /**
     * Add dependencies
     *
     * @param $results
     * @return array
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
            return ['msg' => 'Features information empty.'];
        }

        try {
            $id                    = $data['id'];
            $this->propertyId      = $data['property_id'];
            $this->parking         = $data['parking'];
            $this->multiUnit       = $data['multi_unit'];
            $this->hoa             = $data['hoa'];
            $this->utilities       = $data['utilities'];
            $this->lot             = $data['lot'];
            $this->commonWalls     = $data['common_walls'];
            $this->facingDirection = $data['facing_direction'];
            $this->others          = $data['others'];

            $this->existingFeatures = $this->find($id);

            $this->entity = $this->existingFeatures ? $this->existingFeatures : new FeaturesEntity();

            $op  = !$this->existingFeatures ? 'added' : 'updated';
            $msg = "Property features successfully {$op}.";

            // Save or update property
            $property = $this->_save();

            if (!$property) {
                $msg = "Property features could not be {$op}.";
            };

            return [
                'property' => $property,
                'msg'      => $msg
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }

    /**
     * Save or update property features
     *
     * @return null|object
     */
    private function _save()
    {
        $property = $this->em->getRepository('AppBundle\Entity\Properties\PropertyEntity')->find($this->propertyId);

        $this->entity->setPropertyId($this->entity->getId());
        $this->entity->setParking($this->features['parking']);
        $this->entity->setMultiUnit($this->features['multi_unit']);
        $this->entity->setHoa($this->features['hoa']);
        $this->entity->setUtilities($this->features['utilities']);
        $this->entity->setLot($this->features['lot']);
        $this->entity->setCommonWalls($this->features['common_walls']);
        $this->entity->setFacingDirection($this->features['facing_direction']);
        $this->entity->setOthers($this->features['others']);
        $property->addFeatures($this->entity);

        if (!$this->existingFeatures) {
            $this->em->persist($property);
        }

        $this->em->flush();

        return $property;
    }

    /**
     * Delete property features
     *
     * @param $id
     * @return array
     */
    public function delete($id)
    {
        if (!isset($id)) {
            return ['msg' => 'Empty ID for deleting property features.'];
        }

        try {
            $features = $this->repo->find($id);
            $this->em->remove($features);
            $this->em->flush();

            return [
                'msg' => 'Property features successfully deleted.',
                'id'  => $id
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }
}