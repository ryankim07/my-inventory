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

use AppBundle\AppBundle;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\JsonResponse;
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
}