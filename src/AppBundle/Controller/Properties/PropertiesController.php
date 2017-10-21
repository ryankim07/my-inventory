<?php

/**
 * Class PropertiesController
 *
 * Controller class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Controller\Properties;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

/**
 * @Security("is_granted(['ROLE_USER','ROLE_ADMIN'])")
 */
class PropertiesController extends FOSRestController
{
    /**
     * Get property by ID
     *
     * @Rest\Get("/api/properties/{id}", name="get_property")
     *
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
     *
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
     *
     * @param Request $request
     * @return View
     */
    public function postAction(Request $request)
    {
        // Request param
        $data = json_decode(stripslashes($request->get('data')), true);

        // Add assets
        $data['assets'] = $request->files->all();

        $service = $this->get('Properties');

        // Call service to save
        switch($data['obj_type']) {
            case 'rooms':
                $results = $service->saveRoom($data);
            break;

            case 'features':
                $results = $service->saveFeatures($data);
            break;

            case 'exterior_features':
                $results = $service->saveExteriorFeatures($data);
            break;

            case 'interior_features':
                $results = $service->saveInteriorFeatures($data);
            break;

            default:
                $results = $service->saveProperty($data);
        }

        return new View($results, Response::HTTP_OK);
    }

    /**
     * Delete property
     *
     * @Rest\Delete("/api/properties/{id}", name="delete_property")
     *
     * @param $id
     * @return View
     */
    public function deletePropertyAction($id)
    {
        $service = $this->get('Properties');
        $results = $service->deleteProperty($id);

        return new View($results, Response::HTTP_OK);
    }

    /**
     * Delete room
     *
     * @Rest\Delete("/api/properties/{propertyId}/rooms/{roomId}", name="delete_room")
     *
     * @param $propertyId
     * @param $roomId
     * @return View
     */
    public function deleteRoomAction($propertyId, $roomId)
    {
        $service = $this->get('Properties');
        $results = $service->deleteRoom($propertyId, $roomId);

        return new View($results, Response::HTTP_OK);
    }
}