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

class Users
{
    protected $em;
    protected $repo;
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
            $this->existingUser = $this->findByUsernameOrEmail($data['username'], $data['email']);
            $this->entity       = $this->existingUser ? $this->existingUser : new UsersEntity();

            $op  = !$this->existingProperty ? 'added' : 'updated';
            $msg = "User successfully {$op}.";

            if (!$this->existingUser) {
                $groupsEntity = $this->em->getRepository('AppBundle\Entity\Auth\GroupsEntity')->findOneById($data['id']);
            }

            $this->entity->setFirstName($data['first_name']);
            $this->entity->setLastname($data['last_name']);
            $this->entity->setUsername($data['username']);
            $this->entity->setPassword($data['password']);
            $this->entity->setEmail($data['email']);
            $this->entity->setIsEnabled(0);

            if (is_null($data['groups'])) {
                $groupsEntity->setUsername($data['username']);
                $groupsEntity->setRole($data['role']);
                $this->entity->addGroup($newGroup);
            }

            if (!$this->existingUser) {
                $this->em->persist($this->entity);
            }

            $this->em->flush();

            // Save or update property
            if (!$this->entity) {
                $msg = "User could not be {$op}.";
            };
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }

        return [
            'user' => $this->entity,
            'msg'  => $msg
        ];
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