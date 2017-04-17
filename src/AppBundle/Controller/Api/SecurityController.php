<?php

namespace AppBundle\Controller\Api;

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
 * @Security("is_granted('ROLE_USER')")
 */
class SecurityController extends FOSRestController
{
    public function newAction(Request $request)
    {
        //$this->denyAccessUnlessGranted('ROLE_USER');
    }

    /**
     * Login
     * 
     * @Rest\Post("/login", name="security_login")
     */
    public function loginAction(Request $request)
    {
        $token = $this->get('lexik_jwt_authentication.encoder')->encode([
            'username' => $this->getUser()->getUsername(),
            'exp'      => time() + $this->container->getParameter('lexik_jwt_authentication.token_ttl')
        ]);

        return new JsonResponse(['token' => $token]);
    }

    /**
     * @Rest\Get("/login/check", name="security_login_check")
     */
    public function loginCheckAction()
    {
    }

    /**
     * Logout
     *
     * @Rest\Get("/logout", name="security_logout")
     */
    public function logoutAction()
    {
    }
}