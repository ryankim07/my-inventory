<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\View\View;
use AppBundle\Entity\VehicleEntity;


class VehicleController extends FOSRestController
{
    /**
     * Get my vehicles
     * 
     * @Rest\Get("/api/vehicles")
     */
    public function getAction()
    {
        $repo    = $this->getDoctrine()->getRepository('AppBundle:VehicleEntity');
        $results = $repo->findAll();

        if (is_null($results)) {
            return new View("Vehicles not found.", Response::HTTP_NOT_FOUND);
        }
        
        return $results;
    }

    /**
     * Show specific vehicle
     *
     * @Rest\Get("/api/vehicles/{id}")
     */
    /*public function showAction($id)
    {
        $repo   = $this->getDoctrine()->getRepository('AppBundle:VehicleEntity');
        $result = $repo->find($id);

        if ($result === null) {
            return new View("Vehicle not found", Response::HTTP_NOT_FOUND);
        }

        return $result;
    }*/

    /**
     * Post
     *
     * @Rest\Post("/api/vehicle")
     */
    /*public function postAction(Request $request)
    {
        $data = new User;
        $name = $request->get('name');
        $role = $request->get('role');

        if(empty($name) || empty($role))
        {
            return new View("Empty values are not allowed.", Response::HTTP_NOT_ACCEPTABLE);
        }

        $data->setName($name);
        $data->setRole($role);
        $this->getDoctrine()->getManager()->persist($data);
        $this->getDoctrine()->getManager()->flush();

        return new View("Vehicle added successfully.", Response::HTTP_OK);
    }*/

    /**
     * Delete
     *
     * @Rest\Delete("/api/vehicles/{id}")
     */
    public function deleteAction($id)
    {
        $repo    = $this->getDoctrine()->getRepository('AppBundle:VehicleEntity');
        $results = $repo->find($id);

        if (empty($results)) {
            return new View("Vehicle not found.", Response::HTTP_NOT_FOUND);
        } else {
            $this->getDoctrine()->getManager()->remove($results);
            $this->getDoctrine()->getManager()->flush();
        }

        return new View("Deleted successfully.", Response::HTTP_OK);
    }

    /**
     * Get all makes vehicles
     *
     * @Rest\Get("/api/vehicles/mfgs")
     */
    public function getMfgsAction()
    {
        $repo    = $this->getDoctrine()->getRepository('AppBundle:VehicleMfgsEntity');
        $results = $repo->findAll();

        if (is_null($results)) {
            return new View("Manufacturers not found.", Response::HTTP_NOT_FOUND);
        }

        return $results;
    }

    /**
     * Get all makes vehicles
     *
     * @Rest\Get("/api/vehicles/mfgs/{id}")
     * @param $id
     * @return View|null|object
     */
    public function getModelsByMfgIdAction($id)
    {
        $repo   = $this->getDoctrine()->getRepository('AppBundle:VehicleModelsEntity');
        $result = $repo->findByMfgId($id);

        if ($result === null) {
            return new View("Manufacturer models not found", Response::HTTP_NOT_FOUND);
        }

        return $result;
    }
}