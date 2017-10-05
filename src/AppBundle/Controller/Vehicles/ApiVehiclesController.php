<?php

namespace AppBundle\Controller\Vehicles;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;

class ApiVehiclesController extends FOSRestController
{
    /**
     * Get api vehicle by ID
     *
     * @Rest\Get("/api/api-vehicles/{id}", name="api_vehicle")
     * @param $id
     * @return View
     */
    public function getAction($id)
    {
        $service = $this->get('Api_Vehicles');
        $results = $service->find($id);

        return $results;
    }

    /**
     * Get all api vehicles
     *
     * @Rest\Get("/api/api-vehicles", name="api_vehicles_list")
     */
    public function getListAction()
    {
        $service = $this->get('Api_Vehicles');
        $results = $service->findAll();

        return $results;
    }

    /**
     * Sync from external API to DB
     *
     * @Rest\Get("/api/api-vehicles/sync", name="api_sync")
     */
    public function syncAction()
    {
        $services = $this->get('Api_Vehicles');
        $vehicles = $services->getApiVehicles();
        $results  = $services->save($vehicles);

        $msg = !is_bool($results) && !empty($results) ? $results : 'Sync completed successfully.';

        return new Response($msg, Response::HTTP_OK);
    }
}