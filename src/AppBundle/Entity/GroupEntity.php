<?php
/**
 * Created by PhpStorm.
 * User: kimr234z
 * Date: 4/18/17
 * Time: 3:22 PM
 */

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\Role\RoleInterface;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity()
 * @ORM\Table(name="groups")
 */
class GroupEntity implements RoleInterface
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(name="username", type="string", length=30)
     */
    private $username;

    /**
     * @ORM\Column(name="role", type="string", length=20, unique=true)
     */
    private $role;

    /**
     * @ORM\ManyToMany(targetEntity="UserEntity", mappedBy="groups")
     */
    private $users;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    /**
     * Set username
     *
     * @param $username
     * @return $this
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get username
     *
     * @return mixed
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set role
     *
     * @param $role
     */
    public function setRole($role)
    {
        $this->role = $role;
    }

    /**
     * Get role
     *
     * @return mixed
     */
    public function getRole()
    {
        return $this->role;
    }

    /**
     * Get groups
     *
     * @return ArrayCollection
     */
    public function getUsers()
    {
        return $this->users;
    }

    /**
     * Add user
     *
     * @param UserEntity $user
     */
    public function addUser(UserEntity $user)
    {
        if (true === $this->users->contains($user)) {
            return;
        }

        $this->users->add($user);
        $user->addGroup($this);
    }

    /**
     * Remove user
     *
     * @param UserEntity $user
     */
    public function removeUser(UserEntity $user)
    {
        if (false === $this->users->contains($user)) {
            return;
        }
        $this->users->removeElement($user);
        $user->removeGroup($this);
    }
}