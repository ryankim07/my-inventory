<?php
/**
 * Created by PhpStorm.
 * User: kimr234z
 * Date: 2/21/17
 * Time: 10:28 AM
 */

namespace AppBundle\Service\Properties;

use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Properties\ExteriorFeaturesEntity;

class ExteriorFeatures
{
    private $em;
    private $repo;
    private $entity;
    private $existingExteriorFeatures;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     */
    public function __construct(EntityManager $entityManager)
    {
        $this->em   = $entityManager;
        $this->repo = $this->em->getRepository('AppBundle\Entity\Properties\ExteriorFeatures');
    }

    /**
     * Get all property exterior features
     *
     * @return mixed|string
     */
    public function findAll()
    {
        return $this->doSelect();
    }

    /**
     * Find specific property exterior features
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
            return ['msg' => 'Exterior features information empty.'];
        }

        try {
            $this->existingExteriorFeatures = $this->find($data['id']);

            $this->entity = $this->existingExteriorFeatures ? $this->existingExteriorFeatures : new ExteriorFeaturesEntity();

            $op  = !$this->existingExteriorFeatures ? 'added' : 'updated';
            $msg = "Property exterior features successfully {$op}.";

            // Save or update property
            $property = $this->_save($data);

            if (!$property) {
                $msg = "Property exterior features could not be {$op}.";
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
     * Save or update property exterior features
     *
     * @param $data
     * @return null|object
     */
    private function _save($data)
    {
        $property = $this->em->getRepository('AppBundle\Entity\Properties\PropertyEntity')->find($data['property_id']);

        $this->entity->setPropertyId($data['property_id']);
        $this->entity->setExterior($data['exterior']);
        $this->entity->setFoundation($data['foundation']);
        $this->entity->setOthers($data['others']);
        $property->addExteriorFeatures($this->entity);

        if (!$this->existingExteriorFeatures) {
            $this->em->persist($property);
        }

        $this->em->flush();

        return $property;
    }

    /**
     * Delete property exterior features
     *
     * @param $id
     * @return array
     */
    public function delete($id)
    {
        if (!isset($id)) {
            return ['msg' => 'Empty ID for deleting property exterior features.'];
        }

        try {
            $exteriorFeatures = $this->repo->find($id);
            $this->em->remove($exteriorFeatures);
            $this->em->flush();

            return [
                'msg' => 'Property exterior features successfully deleted.',
                'id'  => $id
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }
}