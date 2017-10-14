<?php

/**
 * Class UsersController
 *
 * Controller class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Controller\Auth;

use AppBundle\AppBundle;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @Security("is_granted(['ROLE_ADMIN'])")
 */
class UsersController extends FOSRestController
{
    /**
     * Get users
     *
     * @Rest\Get("/api/users", name="get_all_users")
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
     * @Rest\Post("/api/user", name="new_user")
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

        // Send email
        $emailService = $this->get('Email');
        $emailService->send(
            'Welcome to My Inventory',
            'admin@my-inventory.com',
            'ryankim07@gmail.com',//$user->getEmail(),
            $user->getFirstName(),
            $user->getRegistration()->getCode()
        );

        return new View($results, Response::HTTP_OK);
    }

    /**
     * Activate new user
     *
     * @Rest\Get("/api/user/activate/{email}/{code}", name="activate_user")
     * @param $email
     * @param $code
     * @return Response
     */
    public function activateAction($email, $code)
    {
        $userService = $this->get('Users');
        $results = $userService->activate($email, $code);

        return $this->forward('AppBundle:Auth:login', ['msg' => $results]);
    }
}