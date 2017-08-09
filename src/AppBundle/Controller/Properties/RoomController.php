<?php

namespace AppBundle\Controller\Properties;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\JsonResponse;
use AppBundle\Entity\PropertyEntity;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

/**
 * @Security("is_granted(['ROLE_USER','ROLE_ADMIN'])")
 */
class RoomController extends FOSRestController
{
    /**
     * Get rooms
     *
     * @Rest\Get("/api/properties/rooms", name="get_all_rooms")
     * @return mixed|string
     */
    public function getListAction()
    {
        $service = $this->get('Rooms');
        $results = $service->findAll();

        return $results;
    }

    /**
     * Get all the rooms by property ID
     *
     * @Rest\Get("/api/properties/non-added-rooms/property/{id}", name="get_non_added_rooms")
     * @param $id
     * @return array
     */
    public function getNonAddedRoomsAction($id)
    {
        $service       = $this->get('Rooms');
        $allRooms      = $service->findByPropertyId($id);
        $existingRooms = [];

        foreach($allRooms as $room) {
            $existingRooms[] = $room->getName();
        }

        $configRoomsService = $this->get('Configured_Rooms');
        $configRooms        = $configRoomsService->getRoomsList();

        $roomsDiff = array_diff($configRooms, $existingRooms);

        $diff = [];
        foreach($roomsDiff as $index => $value) {
            $diff[] = [
                'value' => $value,
                'title' => ucwords($value)
            ];
        }

        return $diff;
    }

    /**
     * Add new room
     *
     * @Rest\Post("/api/property/room", name="new_room")
     * @param Request $request
     * @return View
     */
    public function postAction(Request $request)
    {
        // Request param
        $data = json_decode(stripslashes($request->get('data')), true);

        // Call service to save
        $service = $this->get('Rooms');
        $results = $service->save($data);

        return new View($results, Response::HTTP_OK);
    }

    /**
     * Delete room
     *
     * @Rest\Delete("/api/properties/rooms/{id}", name="delete_address")
     * @param $id
     * @return View
     */
    public function deleteAction($id)
    {
        $service = $this->get('Rooms');
        $results = $service->delete($id);

        return new View($results, Response::HTTP_OK);
    }
}