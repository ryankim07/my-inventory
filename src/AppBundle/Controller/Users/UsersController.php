<?php

/**
 * Class UsersController
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

class UsersController extends FOSRestController
{
    /**
     * Get users
     *
     * @Security("is_granted(['ROLE_ADMIN'])")
     * @Rest\Get("/api/users", name="get_all_users")
     *
     * @return mixed
     */
    public function getListAction()
    {
        $service = $this->get('Users');
        $results = $service->findAll();

        return $results;
    }

    /**
     * Add new user
     *
     * @Security("is_granted(['ROLE_ADMIN'])")
     * @Rest\Post("/api/user", name="new_user")
     *
     * @param Request $request
     * @param UserInterface $user
     * @return View
     */
    public function postAction(Request $request, UserInterface $user)
    {
        // Request param
        $data = json_decode(stripslashes($request->get('data')), true);

        // Hash password
        $authenticationService = $this->get('Username_Password_Authenticator');
        $data['password']      = $authenticationService->encodePassword($user, $data['password']);

        // Save user
        $userService = $this->get('Users');
        $results     = $userService->save($data);
        $user        = $results['user'];

        // Send email only to new registration
        if (!$user->getIsActive) {
            $emailService = $this->get('Email');
            $emailService->send(
                'Welcome to My Inventory',
                'admin@my-inventory.com',
                'ryankim07@gmail.com',//$user->getEmail(),
                $user->getFirstName(),
                $user->getRegistration()->getCode()
            );
        }

        return new View($results, Response::HTTP_OK);
    }

    /**
     * Activate new user
     *
     * @Rest\Get("/api/registration/activate/{email}/{code}", name="activate_user")
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