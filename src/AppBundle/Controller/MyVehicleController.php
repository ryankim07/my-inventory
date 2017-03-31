<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;
use AppBundle\Entity\VehicleEntity;


class MyVehicleController extends FOSRestController
{
    /**
     * Get my vehicles
     * 
     * @Rest\Get("/api/vehicles", name="get_all_vehicles")
     */
    public function getListAction()
    {
        $service = $this->get('My_Vehicles');
        $results = $service->findAll();

        if (is_null($results)) {
            return new View("My vehicles not found.", Response::HTTP_NOT_FOUND);
        }
        
        return $results;
    }

    /**
     * Show specific vehicle
     *
     * @Rest\Get("/api/vehicles/{id}", name="get_vehicle")
     */
    /*public function getAction($id)
    {
        $repo   = $this->getDoctrine()->getRepository('AppBundle:VehicleEntity');
        $result = $repo->find($id);

        if ($result === null) {
            return new View("Vehicle not found", Response::HTTP_NOT_FOUND);
        }

        return $result;
    }*/

    /**
     * Add my new vehicle
     *
     * @Rest\Post("/api/vehicle", name="new_vehicle")
     * @param Request $request
     * @return View
     */
    public function postAction(Request $request)
    {
        // Request param
        $data = $request->get('my_new_vehicle');

        // Call service to save
        $service = $this->get('My_Vehicles');
        $results = $service->save($data);

        $msg = !is_bool($results) && !empty($results) ? $results : 'New vehicle added successfully.';

        return new View($msg, Response::HTTP_OK);
    }

    /**
     * Delete
     *
     * @Rest\Delete("/api/vehicles/{id}", name="delete_vehicle")
     * @param $id
     * @return View
     */
    public function deleteAction($id)
    {
        $service = $this->get('My_Vehicles');
        $results = $service->delete($id);

        $msg = !is_bool($results) && !empty($results) ? $results : 'Deleted successfully.';

        return new View($msg, Response::HTTP_OK);
    }
}