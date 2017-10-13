<?php

/**
 * Class UsernamePasswordAuthenticator
 *
 * Security class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Security;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;

class UsernamePasswordAuthenticator extends AbstractGuardAuthenticator
{
    private $passwordEncoder;

    /**
     * Constructor
     *
     * @param UserPasswordEncoderInterface $passwordEncoder
     */
    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    /**
     * Start
     *
     * @param Request $request
     * @param AuthenticationException|null $authException
     * @return JsonResponse
     */
    public function start(Request $request, AuthenticationException $authException = null)
    {
        return new JsonResponse('Auth header required', 401);
    }

    /**
     * Get user
     *
     * @param mixed $credentials
     * @param UserProviderInterface $userProvider
     * @return UserInterface
     */
    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        $user = $userProvider->loadUserByUsername($credentials['username']);

        if (!$user) {
            throw new AuthenticationException('Invalid username');
        }

        return $user;
    }

    /**
     * Get credentials
     *
     * @param Request $request
     * @return array
     */
    public function getCredentials(Request $request)
    {
        if (!$request->isMethod('POST')) {
            throw new MethodNotAllowedHttpException(['POST']);
        }

        return [
            'username' => $request->request->get('username'),
            'password' => $request->request->get('password'),
        ];
    }

    /**
     * Check credentials
     *
     * @param mixed $credentials
     * @param UserInterface $userInterface
     * @return bool
     */
    public function checkCredentials($credentials, UserInterface $userInterface)
    {
        $plainPassword = $credentials['password'];

        if (!$this->passwordEncoder->isPasswordValid($userInterface, $plainPassword)) {
            throw new AuthenticationException('Invalid credentials');
        }

        return true;
    }

    /**
     * Authentication success
     *
     * @param Request $request
     * @param TokenInterface $token
     * @param string $providerKey
     * @return null
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {
        return null;
    }

    /**
     * Authentication failure
     *
     * @param Request $request
     * @param AuthenticationException $exception
     * @return JsonResponse
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        return new JsonResponse(['msg' => $exception->getMessage()], 401);
    }

    /**
     * Remember me
     *
     * @return bool
     */
    public function supportsRememberMe()
    {
        return false;
    }

    /**
     * Encode password
     *
     * @param UserInterface $userInterface
     * @param $plainPassword
     * @return string
     */
    public function encodePassword(UserInterface $userInterface, $plainPassword)
    {
        $password = $this->passwordEncoder->encodePassword($userInterface, $plainPassword);

        return $password;
    }
}