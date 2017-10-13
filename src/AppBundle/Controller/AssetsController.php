<?php

/**
 * Class AssetsController
 *
 * Controller class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;


class AssetsController extends FOSRestController
{
    /**
     * Add media
     *
     * @Rest\Post("/api/asset", name="new_asset")
     * @param Request $request
     * @return View
     */
    public function postAction(Request $request)
    {
        // Request param
        $asset = $request->files->get('file');

        $service = $this->get('Assets');
        $results = $service->save($asset);

        $results = !is_bool($results) && !empty($results) ? $results : 'New asset added successfully.';

        return new View($results, Response::HTTP_OK);
    }
}