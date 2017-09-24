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
class PropertyController extends FOSRestController
{
    /**
     * Get property by ID
     *
     * @Rest\Get("/api/properties/{id}", name="get_property")
     * @param $id
     * @return View
     */
    public function getAction($id)
    {
        $service = $this->get('Properties');
        $results = $service->find($id);

        if ($results === null) {
            return new View("Property not found", Response::HTTP_NOT_FOUND);
        }

        return $results;
    }

    /**
     * Get properties
     *
     * @Rest\Get("/api/properties", name="get_all_properties")
     * @return mixed|string
     */
    public function getListAction()
    {
        $service = $this->get('Properties');
        $results = $service->findAll();

        if ($results === null) {
            return new View("Properties not found", Response::HTTP_NOT_FOUND);
        }

        return $results;
    }

    /**
     * Add new or update property
     *
     * @Rest\Post("/api/property", name="new_property")
     * @param Request $request
     * @return View
     */
    public function postPropertyAction(Request $request)
    {
        // Request param
        $data           = json_decode(stripslashes($request->get('data')), true);
        $data['assets'] = $request->files->get('file');

        // Call service to save
        $service = $this->get('Properties');
        $results = $service->save($data);

        return new View($results, Response::HTTP_OK);
    }

    /**
     * Delete property
     *
     * @Rest\Delete("/api/properties/{id}", name="delete_property")
     * @param $id
     * @return View
     */
    public function deletePropertyAction($id)
    {
        $service = $this->get('Properties');
        $results = $service->delete($id);

        return new View($results, Response::HTTP_OK);
    }

    /**
     * Add new or update property room
     *
     * @Rest\Post("/api/property/room", name="new_room")
     * @param Request $request
     * @return View
     */
    public function postRoomAction(Request $request)
    {
        // Request param
        $data           = json_decode(stripslashes($request->get('data')), true);
        $data['assets'] = $request->files->get('file');

        // Call service to save
        $service = $this->get('Rooms');
        $results = $service->save($data);

        return new View($results, Response::HTTP_OK);
    }

    /**
     * Delete room
     *
     * @Rest\Delete("/api/properties/rooms/{id}", name="delete_room")
     * @param $id
     * @return View
     */
    public function deleteRoomAction($id)
    {
        $service = $this->get('Rooms');
        $results = $service->delete($id);

        return new View($results, Response::HTTP_OK);
    }
}