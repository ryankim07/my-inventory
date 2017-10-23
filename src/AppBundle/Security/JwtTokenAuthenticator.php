<?php

/**
 * Class JwtTokenAuthenticator
 *
 * Security class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Security;

use Doctrine\ORM\EntityManager;
use AppBundle\Entity\UsersEntity;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\TokenExtractor\AuthorizationHeaderTokenExtractor;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;

class JwtTokenAuthenticator extends AbstractGuardAuthenticator
{
    private $em;
    private $jwtEncoder;

    /**
     * Constructor
     *
     * @param EntityManager $em
     * @param JWTEncoderInterface $jwtEncoder
     */
    public function __construct(EntityManager $em, JWTEncoderInterface $jwtEncoder)
    {
        $this->em         = $em;
        $this->jwtEncoder = $jwtEncoder;
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
     * @return null|object
     */
    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        try {
            $data     = $this->jwtEncoder->decode($credentials);
            $username = $data['username'];

            return $this->em
                ->getRepository(UsersEntity::class)
                ->findOneBy(['username' => $username]);

        } catch (JWTDecodeFailureException $e) {
            throw new AuthenticationException('Invalid Token');
        }
    }

    /**
     * Get credentials
     *
     * @param Request $request
     * @return array|bool|false|string|void
     */
    public function getCredentials(Request $request)
    {
        if (!$request->headers->has('Authorization')) {
            return;
        }

        $extractor = new AuthorizationHeaderTokenExtractor(
            'Bearer',
            'Authorization'
        );

        $token = $extractor->extract($request);

        if (!$token) {
            return;
        }

        return $token;
    }

    /**
     * Check credentials
     *
     * @param mixed $credentials
     * @param UserInterface $user
     * @return bool
     */
    public function checkCredentials($credentials, UserInterface $user)
    {
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
}