<?php

/**
 * Created by PhpStorm.
 * User: kimr234z
 * Date: 2/21/17
 * Time: 10:28 AM
 */

namespace AppBundle\Service\Vendors;

use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Vendors\VendorsEntity;

class Vendors
{
    private $em;
    private $repo;
    private $entity;
    private $existingVendor;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     */
    public function __construct(EntityManager $entityManager)
    {
        $this->em   = $entityManager;
        $this->repo = $this->em->getRepository('AppBundle\Entity\Vendors\VendorsEntity');
    }

    /**
     * Get all rooms
     *
     * @return mixed|string
     */
    public function findAll()
    {
        return $this->doSelect();
    }

    /**
     * Find specific room
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
        $results = !is_null($id) ? $this->repo->find($id) : $this->repo->findBy([], ['company' => 'DESC']);

        if (!is_null($id)) {
            $results = $this->addDependencies($results);
        }

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
            return ['msg' => 'Vendor information empty.'];
        }

        try {
            $this->existingVendor = $this->find($data['id']);

            $this->entity = $this->existingVendor ? $this->existingVendor : new VendorsEntity();

            $op = !$this->existingVehicle ? 'added' : 'updated';
            $msg = "Vendor successfully {$op}.";

            // Save or update vendor
            $this->_save($data);

            // Save or update vendor
            if (!$this->_save($data)) {
                $msg = "Vendor could not be {$op}.";
            };

            return [
                'vendor' => $this->entity,
                'msg'    => $msg
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }

    /**
     * Save or update vendor
     *
     * @param $data
     * @return bool
     */
    private function _save($data)
    {
        $this->entity->setCategoryId($data['category_id']);
        $this->entity->setCompany($data['brand']);
        $this->entity->setStreet($data['street']);
        $this->entity->setCity($data['city']);
        $this->entity->setState($data['state']);
        $this->entity->setZip($data['zip']);
        $this->entity->setCounty($data['company']);
        $this->entity->setPhone($data['phone']);
        $this->entity->setUrl($data['url']);
        $this->entity->setContact($data['contact']);
        $this->entity->setNotes($data['notes']);

        if (!$this->existingVendor) {
            $this->em->persist($this->entity);
        }

        $this->em->flush();

        return true;
    }

    /**
     * Delete vendor
     *
     * @param $id
     * @return array
     */
    public function delete($id)
    {
        if (!isset($id)) {
            return ['msg' => 'Empty ID for deleting vendor.'];
        }

        try {
            $vendor = $this->repo->find($id);

            $this->em->remove($vendor);
            $this->em->flush();

            return [
                'msg' => 'Vendor color successfully deleted.',
                'id'  => $id
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }
}