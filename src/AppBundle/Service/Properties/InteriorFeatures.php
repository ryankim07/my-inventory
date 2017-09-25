<?php
/**
 * Created by PhpStorm.
 * User: kimr234z
 * Date: 2/21/17
 * Time: 10:28 AM
 */

namespace AppBundle\Service\Properties;

use AppBundle\Entity\Properties\InteriorFeaturesEntity;

class InteriorFeatures
{
    private $em;
    private $repo;
    private $entity;
    private $existingInteriorFeatures;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     */
    public function __construct(EntityManager $entityManager)
    {
        $this->em   = $entityManager;
        $this->repo = $this->em->getRepository('AppBundle\Entity\Properties\InteriorFeaturesEntity');
    }

    /**
     * Get all property interior features
     *
     * @return mixed|string
     */
    public function findAll()
    {
        return $this->doSelect();
    }

    /**
     * Find specific property interior features
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
            return ['msg' => 'Interior features information empty.'];
        }

        try {
            $this->existingInteriorFeatures = $this->find($data['id']);

            $this->entity = $this->existingInteriorFeatures ? $this->existingInteriorFeatures : new InteriorFeaturesEntity();

            $op  = !$this->existingInteriorFeatures ? 'added' : 'updated';
            $msg = "Property interior features successfully {$op}.";

            // Save or update property
            $property = $this->_save($data);

            if (!$property) {
                $msg = "Property interior features could not be {$op}.";
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
     * Save or update property interior features
     *
     * @param $data
     * @return mixed
     */
    private function _save($data)
    {
        $property = $this->em->getRepository('AppBundle\Entity\Properties\PropertyEntity')->find($data['property_id']);

        $this->entity->setPropertyId($data['property_id']);
        $this->entity->setKitchen($data['kitchen']);
        $this->entity->setBathroom($data['bathroom']);
        $this->entity->setLaundry($data['laundry']);
        $this->entity->setCooling($data['cooling']);
        $this->entity->setHeating($data['heating']);
        $this->entity->setFireplace($data['fireplace']);
        $this->entity->setFlooring($data['flooring']);
        $this->entity->setOthers($data['others']);
        $property->addInteriorFeatures($this->entity);

        if (!$this->existingInteriorFeatures) {
            $this->em->persist($property);
        }

        $this->em->flush();

        return $property;
    }

    /**
     * Delete property interior features
     *
     * @param $id
     * @return array
     */
    public function delete($id)
    {
        if (!isset($id)) {
            return ['msg' => 'Empty ID for deleting property interior features.'];
        }

        try {
            $interiorFeatures = $this->repo->find($id);
            $this->em->remove($interiorFeatures);
            $this->em->flush();

            return [
                'msg' => 'Property interior features successfully deleted.',
                'id'  => $id
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }
}