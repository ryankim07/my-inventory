<?php

/**
 * Class VehiclesController
 *
 * Controller class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Controller\Vehicles;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

/**
 * @Security("is_granted(['ROLE_USER','ROLE_ADMIN'])")
 */
class VehiclesController extends FOSRestController
{
    /**
     * Get vehicles
     *
     * @Rest\Get("/api/vehicles", name="get_all_vehicles")
     *
     * @return mixed|string
     */
    public function getListAction()
    {
        $service = $this->get('Vehicles');
        $results = $service->findAll();

        return $results;
    }

    /**
     * Add new vehicle
     *
     * @Rest\Post("/api/vehicle", name="new_vehicle")
     *
     * @param Request $request
     * @return View
     */
    public function postAction(Request $request)
    {
        // Request param
        $data           = json_decode(stripslashes($request->get('data')), true);

        // Add new assets
        $data['new_assets'] = $request->files->all();

        // Call service to save
        $service = $this->get('Vehicles');
        $results = $service->save($data);

        return new View($results, Response::HTTP_OK);
    }

    /**
     * Delete vehicle
     *
     * @Rest\Delete("/api/vehicles/{id}", name="delete_vehicle")
     *
     * @param $id
     * @return View
     */
    public function deleteAction($id)
    {
        $service = $this->get('Vehicles');
        $results = $service->delete($id);

        return new View($results, Response::HTTP_OK);
    }
}