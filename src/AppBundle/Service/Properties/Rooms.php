<?php
/**
 * Created by PhpStorm.
 * User: kimr234z
 * Date: 2/21/17
 * Time: 10:28 AM
 */

namespace AppBundle\Service\Properties;

use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Properties\RoomsEntity;

class Rooms
{
    private $em;
    private $repo;
    private $propertyId;
    private $name;
    private $totalArea;
    private $description;
    private $entity;
    private $existingRoom;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     */
    public function __construct(EntityManager $entityManager)
    {
        $this->em   = $entityManager;
        $this->repo = $this->em->getRepository('AppBundle\Entity\Properties\RoomsEntity');
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
        $results = !is_null($id) ? $this->repo->find($id) : $this->repo->findBy([], ['name' => 'DESC']);

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
            return ['msg' => 'Room information empty.'];
        }

        try {
            $id                = (int)$data['id'];
            $this->propertyId  = (int)$data['property_id'];
            $this->name        = $data["name"];
            $this->totalArea   = $data["total_area"];
            $this->description = $data["description"];

            $this->existingRoom = $this->find($id);

            if (!$this->existingRoom) {
                $this->entity = $this->existingRoom;
            }

            // Save or update room
            $this->_saveRoom();

            $msg = !$this->existingRoom ? 'added' : 'updated';

            return [
                'property' => $this->entity,
                'msg'      => "Room successfully {$msg}."
            ];
        } catch(\Exception $e) {
            return ['msg' => $e->getMessage()];
        }
    }

    /**
     * Delete room
     *
     * @param $id
     * @return array
     */
    public function delete($id)
    {
        if (!isset($id)) {
            return ['msg' => 'Empty ID for deleting room.'];
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
     * Save or update room
     *
     * @return bool
     */
    private function _saveRoom()
    {
        if (!$this->existingRoom) {
            $this->entity = new RoomsEntity();
        }

        $property = $this->em->getRepository('AppBundle\Entity\Properties\PropertyEntity')->find($this->propertyId);

        $this->entity->setPropertyId($this->propertyId);
        $this->entity->setName($this->name);
        $this->entity->setTotalArea($this->totalArea);
        $this->entity->setDescription($this->description);

        $property->addRoom($this->entity);

        if (!$this->existingRoom) {
            $this->em->persist($property);
        }

        $this->em->flush();

        return true;
    }
}