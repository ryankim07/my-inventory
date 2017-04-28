<?php

namespace AppBundle\Controller\Api;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;

class TokenController extends FOSRestController
{
    /**
     * New token generator
     *
     * @Rest\Post("/api/tokens", name="api_tokens")
     *
     * @param Request $request
     * @return View
     */
    public function newTokenAction(Request $request)
    {
        $request = json_decode(stripslashes($request->get('data')), true);

        // Find username
        $user = $this->getDoctrine()
            ->getRepository('AppBundle:UserEntity')
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