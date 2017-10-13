<?php

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
     * Get vehicles
     *
     * @Rest\Get("/api/users", name="get_all_users")
     * @return mixed|string
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
     * @return View
     */
    public function postAction(Request $request, UserInterface $user)
    {
        // Request param
        $data = json_decode(stripslashes($request->get('data')), true);

        // Call service to save
        $userService           = $this->get('Users');
        $authenticationService = $this->get('Username_Password_Authenticator');
        $data['password']      = $authenticationService->encodePassword($user, $data['password']);
        $results               = $userService->save($data);

        // Send email
        $results['token'] = $this->get('lexik_jwt_authentication.encoder')->encode([
            'username' => $this->getUser()->getUsername(),
            'exp'      => time() + $this->container->getParameter('lexik_jwt_authentication.token_ttl')
        ]);

        $message = \Swift_Message::newInstance()
            ->setSubject('Hello Email')
            ->setFrom('admin@my-inventory.com')
            ->setTo('rkim07@hotmail.com')
            ->setBody(
                $this->renderView(
                // app/Resources/views/Emails/registration.html.twig
                    'Emails/registration.html.twig',
                    array('name' => 'Ryan Kim')
                ),
                'text/html'
            );

        $this->get('mailer')->send($message);

        return new View($results, Response::HTTP_OK);
    }
}