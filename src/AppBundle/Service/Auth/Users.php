<?php

/**
 * Class Users
 *
 * Service class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Service\Auth;

use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Auth\UsersEntity;
use AppBundle\Entity\Auth\GroupsEntity;
use AppBundle\Entity\Auth\UsersRegistrationEntity;

class Users
{
    private $em;
    private $repo;
    private $entity;
    private $existingUser;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     */
    public function __construct(EntityManager $entityManager)
    {
        $this->em   = $entityManager;
        $this->repo = $this->em->getRepository('AppBundle\Entity\Auth\UsersEntity');
    }

    /**
     * Get all users
     *
     * @return mixed|string
     */
    public function findAll()
    {
        return $this->doSelect();
    }

    /**
     * Find specific user
     *
     * @param $id
     * @return mixed|null|object|string
     */
    public function find($id = null)
    {
        return $this->doSelect($id);
    }

    /**
     * Query and add dependencies
     *
     * @param null $id
     * @return mixed|string
     */
    private function doSelect($id = null)
    {
        $results = !is_null($id) ? $this->repo->find($id) : $this->repo->findBy([], ['firstName' => 'ASC']);

        if (!is_null($id)) {
            $results = $this->addDependencies($results);
        }

        return $results;
    }

    /**
     * Add dependencies
     *
     * @param $results
     * @return mixed
     */
    private function addDependencies($results)
    {
        return $results;
    }

    /**
     * Save or update user
     *
     * @param $data
     * @return array
     */
    public function save($data)
    {
        if (count($data) == 0) {
            return ['msg' => 'New user information empty.'];
        }

        try {
            // Add user
            $this->existingUser = $this->findByUsernameOrEmail($data['username'], $data['email']);
            $this->entity       = $this->existingUser ? $this->existingUser : new UsersEntity();

            $op  = !$this->existingUser ? 'added' : 'updated';
            $msg = "User successfully {$op}.";

            // Save or update paint
            if (!$this->_save($data)) {
                $msg = "User could not be {$op}.";
            };

            return [
                'user' => $this->entity,
                'msg'  => $msg
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }

    /**
     * Save or update user
     *
     * @param $data
     * @return bool
     */
    private function _save($data)
    {
        $this->entity->setFirstName($data['first_name']);
        $this->entity->setLastname($data['last_name']);
        $this->entity->setUsername($data['username']);
        $this->entity->setPassword($data['password']);
        $this->entity->setEmail($data['email']);
        $this->entity->setIsActive(0);

        // Add groups
        $groupsEntity = $this->existingUser ?
            $this->em->getRepository('AppBundle\Entity\Auth\GroupsEntity')->findOneByUsername($this->entity->getUsername()) : new GroupsEntity();

        if (!is_null($data['groups'])) {
            foreach($data['groups'] as $group) {
                $groupsEntity->setUsername($group['username']);
                $groupsEntity->setRole($group['role']);
                $this->entity->addGroup($groupsEntity);
            }
        }

        // Add registration
        $registrationEntity = new UsersRegistrationEntity();
        $registrationEntity->setUserId($this->entity->getId());
        $registrationEntity->setEmail($this->entity->getEmail());
        $registrationEntity->setCode(substr(uniqid('', true), -30));
        $this->entity->addRegistration($registrationEntity);

        if (!$this->existingUser) {
            $this->em->persist($this->entity);
        }

        $this->em->flush();

        return true;
    }

    /**
     * Find either by username or email
     *
     * @param $username
     * @param $email
     * @return mixed
     */
    private function findByUsernameOrEmail($username, $email)
    {
        $results = $this->repo->findOneByUsername($username);

        if (is_null($results)) {
            return $this->repo->findOneByEmail($email);
        }

        return $results;
    }

    /**
     * Finish activating user
     *
     * @param $email
     * @param $code
     * @return array|string
     */
    public function activate($email, $code)
    {
        try {
            $registration = $this->em
                ->getRepository('AppBundle\Entity\Auth\UsersRegistrationEntity')
                ->findBy([
                    'email' => $email,
                    'code'  => $code
                ]);

            if (!$registration) {
                return 'Invalid email or code.';
            }

            $user = $this->find($registration->getUserId());

            if ($user->getIsActive() == 1) {
                return 'User already registered.';
            } else {
                $user->setIsActive(1);
            }

            $this->em->persist($user);
            $this->em->flush();

            return 'User successfully registered.';
        } catch (\Exception $e) {
            return ['err_msg' => 'Invalid email or code.'];
        }
    }
}