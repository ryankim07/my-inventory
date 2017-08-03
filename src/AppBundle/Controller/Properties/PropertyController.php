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
class PropertyController extends FOSRestController
{
    /**
     * Get properties
     *
     * @Rest\Get("/api/properties", name="get_all_properties")
     * @return mixed|string
     */
    public function getListAction()
    {
        $service = $this->get('Properties');
        $results = $service->findAll();

        return $results;
    }

    /**
     * Add new property
     *
     * @Rest\Post("/api/property", name="new_property")
     * @param Request $request
     * @return View
     */
    public function postAction(Request $request)
    {
        // Request param
        $data           = json_decode(stripslashes($request->get('data')), true);
        $data['assets'] = $request->files->get('file');

        // Call service to save
        $service = $this->get('Properties');
        $results = $service->save($data);

        return new View($results, Response::HTTP_OK);
    }

    /**
     * Delete property
     *
     * @Rest\Delete("/api/properties/{id}", name="delete_property")
     * @param $id
     * @return View
     */
    public function deleteAction($id)
    {
        $service = $this->get('Properties');
        $results = $service->delete($id);

        return new View($results, Response::HTTP_OK);
    }
}