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
            $id                = $data['id'];
            $this->propertyId  = $data['property_id'];
            $this->name        = $data["name"];
            $this->totalArea   = $data["total_area"];
            $this->description = $data["description"];
            $this->walls       = $data["walls"];

            $this->existingRoom = $this->find($id);

            $this->entity = $this->existingRoom ? $this->existingRoom : new RoomsEntity();

            $op  = !$this->existingRoom ? 'added' : 'updated';
            $msg = "Room successfully {$op}.";

            // Save or update vehicle
            $property = $this->_save();

            if (!$property) {
                $msg = "Room could not be {$op}.";
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
     * Save or update room
     *
     */
    private function _save()
    {
        $property = $this->em->getRepository('AppBundle\Entity\Properties\PropertyEntity')->find($this->propertyId);

        /*foreach($this->walls as $wall) {
            $wallsEntity = new RoomsWallsEntity();

            if (isset($wall["id"])) {
                $wallsEntity = $this->em->getRepository('AppBundle\Entity\Properties\RoomsWallsEntity')->find($wall["id"]);
            }

            if (empty($wall["paint_id"]) && empty($wall["name"])) {
                continue;
            }

            $wallsEntity->setRoomId($this->entity->getId());
            $wallsEntity->setPaintId((int) $wall['paint_id']);
            $wallsEntity->setName($wall['name']);
            $this->entity->addWall($wallsEntity);
        }*/

        $this->entity->setPropertyId($this->propertyId);
        $this->entity->setName($this->name);
        $this->entity->setTotalArea($this->totalArea);
        $this->entity->setDescription($this->description);
        $property->addRoom($this->entity);

        if (!$this->existingRoom) {
            $this->em->persist($property);
        }

        $this->em->flush();

        return $property;
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
            return ['err_msg' => $e->getMessage()];
        }
    }
}