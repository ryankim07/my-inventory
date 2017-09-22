<?php

namespace AppBundle\Controller\Paints;

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
class PaintController extends FOSRestController
{
    /**
     * Get paints
     *
     * @Rest\Get("/api/paints", name="get_all_paints")
     * @return mixed|string
     */
    public function getListAction()
    {
        $service = $this->get('Paints');
        $results = $service->findAll();

        if ($results === null) {
            return new View("Paints not found", Response::HTTP_NOT_FOUND);
        }

        return $results;
    }

    /**
     * Add new paint
     *
     * @Rest\Post("/api/paint", name="new_paint")
     * @param Request $request
     * @return View
     */
    public function postAction(Request $request)
    {
        // Request param
        $data = json_decode(stripslashes($request->get('data')), true);

        // Call service to save
        $service = $this->get('Paints');
        $results = $service->save($data);

        return new View($results, Response::HTTP_OK);
    }

    /**
     * Delete paint
     *
     * @Rest\Delete("/api/paints/{id}", name="delete_paint")
     * @param $id
     * @return View
     */
    public function deleteAction($id)
    {
        $service = $this->get('Paints');
        $results = $service->delete($id);

        return new View($results, Response::HTTP_OK);
    }
}