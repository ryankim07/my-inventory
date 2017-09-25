<?php
/**
 * Created by PhpStorm.
 * User: kimr234z
 * Date: 2/21/17
 * Time: 10:28 AM
 */

namespace AppBundle\Service\Properties;

use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Properties\RoomsWallsEntity;

class RoomsWalls
{
    private $em;
    private $repo;
    private $entity;
    private $existingWall;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     */
    public function __construct(EntityManager $entityManager)
    {
        $this->em   = $entityManager;
        $this->repo = $this->em->getRepository('AppBundle\Entity\Properties\RoomsWallsEntity');
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

    public function findByRoomId($id)
    {
        return $this->repo->findByRoomId($id);
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
            return ['msg' => 'Wall information empty.'];
        }

        try {
            $this->existingWall = $this->find($data['id']);

            $this->entity = $this->existingWall ? $this->existingWall :  new RoomsWallsEntity();

            // Save or update wall
            $this->_save($data);

            $msg = !$this->existingWall ? 'added' : 'updated';

            return [
                'property' => $this->entity,
                'msg'      => "Room successfully {$msg}."
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }

    /**
     * Save or update room walls
     *
     * @param $data
     * @return bool
     */
    private function _save($data)
    {
        $room = $this->em->getRepository('AppBundle\Entity\Properties\RoomEntity')->find($data['room_id']);

        $this->entity->setRoomId($data['room_id']);
        $this->entity->setPaintId($data['paint_id']);
        $this->entity->setName($data["name"]);

        $room->addWall($this->entity);

        if (!$this->existingWall) {
            $this->em->persist($room);
        }

        $this->em->flush();

        return true;
    }

    /**
     * Delete wall
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
            $wall = $this->repo->find($id);

            $this->em->remove($wall);
            $this->em->flush();

            return [
                'msg' => 'Wall successfully deleted.',
                'id'  => $id
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }
}