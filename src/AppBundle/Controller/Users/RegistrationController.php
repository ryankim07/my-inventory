<?php

/**
 * Class RegistrationController
 *
 * Controller class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Controller\Users;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class RegistrationController extends FOSRestController
{
    /**
     * Activate new user
     *
     * @Rest\Get("/registration/activate/{email}/{code}", name="registration")
     *
     * @param $email
     * @param $code
     * @return Response
     */
    public function activateAction($email, $code)
    {
        try {
            $userService = $this->get('Users');
            $results     = $userService->activate($email, $code);

            $token = $this->container->get('lexik_jwt_authentication.jwt_manager')->create($results['user']);

            // Use below to skip login
            /*$authenticationSuccessHandler->handleAuthenticationSuccess($results['user'], $token);
            $authenticationSuccessHandler = $this->container->get('lexik_jwt_authentication.handler.authentication_success');*/

            return $this->redirectToRoute('homepage', array('token' => $token));
        } catch (\Exception $e) {
            return ['err_msg' => $e];
        }
    }

    /**
     * Send user link with instructions to reset password
     *
     * @Rest\Post("/registration/password/reset", name="password_reset")
     *
     * @param Request $request
     * @return array|View
     */
    public function resetAction(Request $request)
    {
        try {
            $email = json_decode(stripslashes($request->get('data')), true);

            $userService  = $this->get('Users');
            $user = $userService->getUserDetails($email);

            // Send email only to new registration
            if ($user) {
                $emailService = $this->get('Email');
                $templateParams = [
                    'name'  => $user->getUsername(),
                    'email' => $email,
                    'code'  => $user->getRegistration()->getCode()
                ];

                $emailService->send(
                    'Welcome to My Inventory',
                    'admin@my-inventory.com',
                    'ryankim07@gmail.com',//$email,
                    'password_reset_link.html.twig',
                    $templateParams
                );
            }

            return $this->redirectToRoute('login', []);
        } catch (\Exception $e) {
            return ['err_msg' => $e];
        }
    }
}