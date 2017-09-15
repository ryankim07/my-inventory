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
use AppBundle\Entity\Properties\RoomsWallsEntity;

class Rooms
{
    private $em;
    private $repo;
    private $propertyId;
    private $name;
    private $totalArea;
    private $description;
    private $walls;
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

    public function findByPropertyId($id)
    {
        return $this->repo->findByPropertyId($id);
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
            $this->walls       = $data["walls"];

            $this->existingRoom = $this->find($id);

            if (!$this->existingRoom) {
                $this->entity = $this->existingRoom;
            }

            // Save or update room
            $this->_saveRoom();

            $msg = !$this->existingRoom ? 'added' : 'updated';

            return [
                'room' => [
                    'id'          => $this->entity->getId(),
                    'property_id' => $this->entity->getPropertyId(),
                    'name'        => $this->entity->getName(),
                    'total_area'  => $this->entity->getTotalArea(),
                    'description' => $this->entity->getDescription()
                ],
                'msg'   => "Room successfully {$msg}."
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
            $room = $this->repo->find($id);

            $this->em->remove($room);
            $this->em->flush();

            return [
                'msg' => 'Room successfully deleted.',
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

        foreach($this->walls as $wall) {
            $wallsEntity = new RoomsWallsEntity();

            $wallsEntity->setRoomId($this->entity->getId());
            $wallsEntity->setPaintId((int) $wall['paint_id']);
            $wallsEntity->setName($wall['name']);

            $this->entity->addWall($wallsEntity);
        }

        if (!$this->existingRoom) {
            $this->em->persist($property);
        }

        $this->em->flush();

        return true;
    }
}