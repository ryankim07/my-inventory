<?php

namespace AppBundle\Service\Users;

use Doctrine\ORM\EntityManager;
use AppBundle\Entity\UserEntity;
use AppBundle\Entity\groupEntity;

class User
{
    protected $em;
    protected $repo;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     */
    public function __construct(EntityManager $entityManager)
    {
        $this->em   = $entityManager;
        $this->repo = $this->em->getRepository('AppBundle:UserEntity');
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
        $results = !is_null($id) ? $this->repo->find($id) : $this->repo->findBy([], ['users' => 'ASC']);

        if (count($results) == 0) {
            return ['msg' => 'No users found.'];
        }

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
     * @param $user
     * @return array|null
     */
    public function save($user)
    {
        if (count($user) == 0) {
            return ['msg' => 'New user information empty.'];
        }

        try {
            $username = $user['username'];
            $password = $user['password'];
            $email    = $user['email'];
            $role     = $user['role'];
            $response = null;

            $existingUser = $this->findByUsernameOrEmail($username, $email);

            if (is_null($existingUser)) {
                // Save new user
                $newUser = new UserEntity();
                $newUser->setUsername($username);
                $newUser->setPassword($password);
                $newUser->setEmail($email);
                $newUser->setIsActive(0);

                $this->em->persist($newUser);
                $this->em->flush();

                $response = [
                    'user' => $newUser,
                    'msg'  => 'User successfully added.'
                ];
            } else {
                // Update existing my vehicle
                $existingUser->setUsername($username);
                $existingUser->setPassword($password);
                $existingUser->setEmail($email);

                $this->em->flush();

                $response = [
                    'user' => $existingUser,
                    'msg'  => 'User successfully updated.'
                ];
            }

            $existingGroup = $this->em->getRepository('AppBundle:GroupEntity')->findOneByUsername($username);

            if (is_null($existingGroup)) {
                // Save new group for user
                $newGroup = new GroupEntity();
                $newGroup->setUsername($username);
                $newGroup->setRole($role);

                $this->em->persist($newGroup);
                $this->em->flush();

                $response = [
                    'group' => $newGroup,
                    'msg'   => "User's group successfully added."
                ];
            } else {
                // Update existing my vehicle
                $existingGroup->setUsername($username);
                $existingUser->setEmail($email);

                $this->em->flush();

                $response = [
                    'user' => $existingUser,
                    'msg'  => "User's group successfully updated."
                ];
            }

            return $response;
        } catch(\Exception $e) {
            return ['msg' => $e->getMessage()];
        }
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
}