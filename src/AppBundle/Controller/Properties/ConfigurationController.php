<?php

/**
 * Class ConfigurationController
 *
 * Controller class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Controller\Properties;

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
class ConfigurationController extends FOSRestController
{
    /**
     * Get addresses
     *
     * @Rest\Get("/api/configuration/properties/rooms", name="get_all_configured_rooms")
     * @return mixed|string
     */
    public function getListAction()
    {
        $service = $this->get('Configured_Rooms');
        $results = $service->getConfiguredRooms();

        return $results;
    }
}