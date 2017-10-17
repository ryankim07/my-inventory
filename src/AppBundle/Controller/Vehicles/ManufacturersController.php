<?php

/**
 * Class ManufacturersController
 *
 * Controller class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Controller\Vehicles;

use AppBundle\Entity\ManufacturersEntity;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;

class ManufacturersController extends FOSRestController
{
    /**
     * Get api vehicle by ID
     *
     * @Rest\Get("/api/manufacturers/{id}", name="manufacturers")
     *
     * @param $id
     * @return View
     */
    public function getAction($id)
    {
        $service = $this->get('Manufacturers');
        $results = $service->find($id);

        return $results;
    }

    /**
     * Get all api vehicles
     *
     * @Rest\Get("/api/manufacturers/{page}", name="manufacturers_list")
     *
     * @param $page
     * @return mixed
     */
    public function getListAction($page = 1)
    {
        /*$service = $this->get('Manufacturers');
        $results = $service->findAll();*/

        $results = $this->getDoctrine()
            ->getRepository(ManufacturersEntity::class)
            ->findAllManufacturers($page);

        return $results;
    }

    /**
     * Sync from external API to DB
     *
     * @Rest\Get("/api/manufacturers/sync", name="api_sync")
     */
    public function syncAction()
    {
        $services = $this->get('Manufacturers');
        $vehicles = $services->getManufacturers();
        $results  = $services->save($vehicles);

        $msg = !is_bool($results) && !empty($results) ? $results : 'Sync completed successfully.';

        return new Response($msg, Response::HTTP_OK);
    }
}