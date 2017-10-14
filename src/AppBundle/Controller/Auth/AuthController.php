<?php

/**
 * Class AuthController
 *
 * Controller class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

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
use Symfony\Component\Security\Core\Exception\BadCredentialsException;

/**
 * @Security("is_granted(['ROLE_USER','ROLE_ADMIN'])")
 */
class AuthController extends FOSRestController
{
    /**
     * Login
     *
     * @Rest\Post("/auth/login", name="auth_login")
     * @param Request $request
     * @return JsonResponse
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
     * @Rest\Get("/auth/check", name="auth_check")
     */
    public function loginCheckAction()
    {
    }

    /**
     * Logout
     *
     * @Rest\Get("/auth/logout", name="auth_logout")
     */
    public function logoutAction()
    {
    }

    /**
     * New token generator
     *
     * @Rest\Post("/auth/token", name="auth_token")
     * @param Request $request
     * @return View
     */
    public function newTokenAction(Request $request)
    {
        $request = json_decode(stripslashes($request->get('data')), true);

        // Find username
        $user = $this->getDoctrine()
            ->getRepository('AppBundle\Entity\Auth\UsersEntity')
            ->findOneByUsername($request['username']);

        if (!$user) {
            throw $this->createNotFoundException();
        }

        // Validate password
        if (!$isValid = $this->get('security.password_encoder')->isPasswordValid($user, $request['password'])) {
            throw new BadCredentialsException();
        }

        // Create token
        $token = $this->get('lexik_jwt_authentication.encoder')->encode([
            'username' => $user->getUsername(),
            'exp'      => time() + $this->container->getParameter('lexik_jwt_authentication.token_ttl')
        ]);

        return new View(['token' => $token], Response::HTTP_OK);
    }
}