<?php
/**
 * Created by PhpStorm.
 * User: kimr234z
 * Date: 2/21/17
 * Time: 10:28 AM
 */

namespace AppBundle\Service\Properties;

use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Properties\AddressEntity;

class Address
{
    private $em;
    private $repo;
    private $propertyId;
    private $street;
    private $city;
    private $state;
    private $zip;
    private $county;
    private $country;
    private $subdivision;
    private $entity;
    private $existingAddress;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     */
    public function __construct(EntityManager $entityManager)
    {
        $this->em   = $entityManager;
        $this->repo = $this->em->getRepository('AppBundle\Entity\Properties\AddressEntity');
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
        $results = !is_null($id) ? $this->repo->find($id) : $this->repo->findBy([], ['county' => 'DESC']);

        if (count($results) == 0) {
            return false;
        }

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
            return ['msg' => 'Property information empty.'];
        }

        try {
            $id                = (int)$data['id'];
            $this->propertyId  = (int)$data['property_id'];
            $this->street      = $data["street"];
            $this->city        = $data["city"];
            $this->state       = $data["state"];
            $this->zip         = $data["zip"];
            $this->county      = $data["county"];
            $this->country     = $data["country"];
            $this->subdivision = $data["subdivision"];

            $this->existingAddress = $this->find($id);

            if (!$this->existingAddress) {
                $this->entity = $this->existingAddress;
            }

            // Save or update address
            $this->_saveAddress();

            $msg = !$this->existingAddress ? 'added' : 'updated';

            return [
                'property' => $this->entity,
                'msg'      => "Address successfully {$msg}."
            ];
        } catch(\Exception $e) {
            return ['msg' => $e->getMessage()];
        }
    }

    /**
     * Delete address
     *
     * @param $id
     * @return array
     */
    public function delete($id)
    {
        if (!isset($id)) {
            return ['msg' => 'Empty ID for deleting address.'];
        }

        try {
            $address = $this->repo->find($id);

            $this->em->remove($address);
            $this->em->flush();

            return [
                'msg' => 'Address successfully deleted.',
                'id'  => $id
            ];
        } catch(\Exception $e) {
            return ['msg' => $e->getMessage()];
        }
    }

    /**
     * Save or update address
     *
     * @return bool
     */
    private function _saveAddress()
    {
        if (!$this->existingAddress) {
            $this->entity = new AddressEntity();
        }

        $this->entity->setPropertyId($this->propertyId);
        $this->entity->setStreet($this->street);
        $this->entity->setCity($this->city);
        $this->entity->setState($this->state);
        $this->entity->setZip($this->zip);
        $this->entity->setCounty($this->county);
        $this->entity->setCountry($this->country);
        $this->entity->setSubdivision($this->subdivision);

        if (!$this->existingAddress) {
            $this->em->persist($this->entity);
        }

        $this->em->flush();

        return true;
    }
}