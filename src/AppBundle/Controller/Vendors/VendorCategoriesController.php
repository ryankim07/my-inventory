<?php

/**
 * Class VendorCategoriesController
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
class VendorCategoriesController extends FOSRestController
{
    /**
     * Get vendor category by ID
     *
     * @Rest\Get("/api/vendor/categories/{id}", name="get_vendor_categories")
     * @param $id
     * @return View
     */
    public function getAction($id)
    {
        $service = $this->get('Vendor_Categories');
        $results = $service->find($id);

        if ($results === null) {
            return new View("Vendor category not found", Response::HTTP_NOT_FOUND);
        }

        return $results;
    }

    /**
     * Get vendor categories
     *
     * @Rest\Get("/api/vendor/categories", name="get_all_vendor_categories")
     * @return mixed|string
     */
    public function getListAction()
    {
        $service = $this->get('Vendor_Categories');
        $results = $service->findAll();

        if ($results === null) {
            return new View("Vendor categories not found", Response::HTTP_NOT_FOUND);
        }

        return $results;
    }

    /**
     * Add new or update vendor category
     *
     * @Rest\Post("/api/vendor/category", name="new_category")
     * @param Request $request
     * @return View
     */
    public function postAction(Request $request)
    {
        // Request param
        $data = json_decode(stripslashes($request->get('data')), true);

        // Call service to save
        $service = $this->get('Vendor_Categories');
        $results = $service->save($data);

        return new View($results, Response::HTTP_OK);
    }

    /**
     * Delete vendor category
     *
     * @Rest\Delete("/api/vendor/category/{id}", name="delete_vendor_category")
     * @param $id
     * @return View
     */
    public function deleteVendorCategoryAction($id)
    {
        $service = $this->get('Vendor_Categories');
        $results = $service->delete($id);

        return new View($results, Response::HTTP_OK);
    }
}