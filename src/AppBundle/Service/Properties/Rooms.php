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
            $this->existingRoom = $this->find($data['id']);
            $this->entity       = $this->existingRoom ? $this->existingRoom : new RoomsEntity();

            $op  = !$this->existingRoom ? 'added' : 'updated';
            $msg = "Room successfully {$op}.";

            // Save or update vehicle
            $property = $this->_save($data);

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
     * @param $data
     * @return null|object
     */
    private function _save($data)
    {
        $property = $this->em->getRepository('AppBundle\Entity\Properties\PropertyEntity')->find($data['property_id']);

        /*foreach($data["walls"] as $wall) {
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

        $this->entity->setPropertyId($data['property_id']);
        $this->entity->setName($data["name"]);
        $this->entity->setTotalArea($data["total_area"]);
        $this->entity->setDescription($data["description"]);
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