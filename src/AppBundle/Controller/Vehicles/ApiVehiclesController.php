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
     * Sync from external API to DB
     *
     * @Rest\Get("/api/sync", name="api_sync")
     */
    public function syncAction()
    {
        $services = $this->get('Sync_Api');
        $mfgs     = $services->getApiVehicles();
        $results  = $services->save($mfgs);

        $msg = !is_bool($results) && !empty($results) ? $results : 'Sync completed successfully.';

        return new Response($msg, Response::HTTP_OK);
    }

    /**
     * Get all manufacturers vehicles
     *
     * @Rest\Get("/api/sync/list", name="api_sync_list")
     */
    public function getListAction()
    {
        $service = $this->get('Sync_Db');
        $results = $service->findAll();

        if (is_null($results)) {
            return new View("Manufacturers not found.", Response::HTTP_NOT_FOUND);
        }

        return $results;
    }

    /**
     * Get manufacturers vehicle by ID
     *
     * @Rest\Get("/api/sync/list/{id}", name="api_vehicle")
     * @param $id
     * @return View
     */
    public function getAction($id)
    {
        $service = $this->get('Sync_Db');
        $results = $service->find($id);

        if ($results === null) {
            return new View("Manufacturer models not found", Response::HTTP_NOT_FOUND);
        }

        return $results;
    }
}