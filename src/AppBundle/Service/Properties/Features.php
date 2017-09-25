<?php
/**
 * Created by PhpStorm.
 * User: kimr234z
 * Date: 2/21/17
 * Time: 10:28 AM
 */

namespace AppBundle\Service\Properties;

use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Properties\FeaturesEntity;

class Features
{
    private $em;
    private $repo;
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
            $this->existingFeatures = $this->find($data['id']);

            $this->entity = $this->existingFeatures ? $this->existingFeatures : new FeaturesEntity();

            $op  = !$this->existingFeatures ? 'added' : 'updated';
            $msg = "Property features successfully {$op}.";

            // Save or update property
            $property = $this->_save($data);

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
     * @param $data
     * @return null|object
     */
    private function _save($data)
    {
        $property = $this->em->getRepository('AppBundle\Entity\Properties\PropertyEntity')->find($data['property_id']);

        $this->entity->setPropertyId($data['property_id']);
        $this->entity->setParking($data['parking']);
        $this->entity->setMultiUnit($data['multi_unit']);
        $this->entity->setHoa($data['hoa']);
        $this->entity->setUtilities($data['utilities']);
        $this->entity->setLot($data['lot']);
        $this->entity->setCommonWalls($data['common_walls']);
        $this->entity->setFacingDirection($data['facing_direction']);
        $this->entity->setOthers($data['others']);
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