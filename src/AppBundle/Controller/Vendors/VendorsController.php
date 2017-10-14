<?php

/**
 * Class VendorsController
 *
 * Controller class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Controller\Vendors;

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
class VendorsController extends FOSRestController
{
    /**
     * Get vendor by ID
     *
     * @Rest\Get("/api/vendors/{id}", name="get_vendor")
     *
     * @param $id
     * @return View
     */
    public function getAction($id)
    {
        $service = $this->get('Vendors');
        $results = $service->find($id);

        if ($results === null) {
            return new View("Vendor not found", Response::HTTP_NOT_FOUND);
        }

        return $results;
    }

    /**
     * Get vendors
     *
     * @Rest\Get("/api/vendors", name="get_all_vendors")
     *
     * @return mixed|string
     */
    public function getListAction()
    {
        $service = $this->get('Vendors');
        $results = $service->findAll();

        if ($results === null) {
            return new View("Vendors not found", Response::HTTP_NOT_FOUND);
        }

        return $results;
    }

    /**
     * Add new or update vendor
     *
     * @Rest\Post("/api/vendor", name="new_vendor")
     *
     * @param Request $request
     * @return View
     */
    public function postAction(Request $request)
    {
        // Request param
        $data = json_decode(stripslashes($request->get('data')), true);

        // Call service to save
        $service = $this->get('Vendors');
        $results = $service->save($data);

        return new View($results, Response::HTTP_OK);
    }

    /**
     * Delete vendor
     *
     * @Rest\Delete("/api/vendors/{id}", name="delete_vendor")
     *
     * @param $id
     * @return View
     */
    public function deletePropertyAction($id)
    {
        $service = $this->get('Vendors');
        $results = $service->delete($id);

        return new View($results, Response::HTTP_OK);
    }
}