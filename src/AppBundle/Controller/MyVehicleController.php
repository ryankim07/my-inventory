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

        return new View($results, Response::HTTP_OK);
    }

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
        $data           = json_decode(stripslashes($request->get('data')), true);
        $data['assets'] = $request->files->get('file');

        // Call service to save
        $service = $this->get('My_Vehicles');
        $results = $service->save($data);

        return new View($results, Response::HTTP_OK);
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

        return new View($results, Response::HTTP_OK);
    }
}