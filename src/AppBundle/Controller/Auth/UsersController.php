<?php

namespace AppBundle\Controller\Auth;

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
 * @Security("is_granted(['ROLE_ADMIN'])")
 */
class UsersController extends FOSRestController
{
    /**
     * Add new user
     *
     * @Rest\Post("/api/user", name="new_user")
     * @param Request $request
     * @return View
     */
    public function postAction(Request $request)
    {
        // Request param
        $data = json_decode(stripslashes($request->get('data')), true);

        // Call service to save
        $service = $this->get('User');
        $results = $service->save($data);

        // Send email
        $results['token'] = $this->get('lexik_jwt_authentication.encoder')->encode([
            'username' => $this->getUser()->getUsername(),
            'exp'      => time() + $this->container->getParameter('lexik_jwt_authentication.token_ttl')
        ]);

        return new View($results, Response::HTTP_OK);
    }
}