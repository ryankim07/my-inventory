<?php

namespace AppBundle\Controller\Properties;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\JsonResponse;
use AppBundle\Entity\PropertyEntity;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

/**
 * @Security("is_granted(['ROLE_USER','ROLE_ADMIN'])")
 */
class AddressController extends FOSRestController
{
    /**
     * Get addresses
     *
     * @Rest\Get("/api/properties/addresses", name="get_all_addresses")
     * @return mixed|string
     */
    public function getListAction()
    {
        $service = $this->get('Address');
        $results = $service->findAll();

        return $results;
    }

    /**
     * Add new address
     *
     * @Rest\Post("/api/property/address", name="new_address")
     * @param Request $request
     * @return View
     */
    public function postAction(Request $request)
    {
        // Request param
        $data = json_decode(stripslashes($request->get('data')), true);

        // Call service to save
        $service = $this->get('Address');
        $results = $service->save($data);

        return new View($results, Response::HTTP_OK);
    }

    /**
     * Delete address
     *
     * @Rest\Delete("/api/properties/addresses{id}", name="delete_address")
     * @param $id
     * @return View
     */
    public function deleteAction($id)
    {
        $service = $this->get('Address');
        $results = $service->delete($id);

        return new View($results, Response::HTTP_OK);
    }
}