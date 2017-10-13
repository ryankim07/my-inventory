<?php

/**
 * Class UsersEntity
 *
 * Entity class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Entity\Auth;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\AdvancedUserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity
 * @ORM\Table(name="users")
 */
class UsersEntity implements AdvancedUserInterface, \Serializable
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     * @Assert\NotBlank()
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=100)
     * @Assert\NotBlank()
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=30, unique=true)
     * @Assert\NotBlank()
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=64)
     * @Assert\NotBlank()
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=60, unique=true)
     * @Assert\NotBlank()
     */
    private $email;

    /**
     * @ORM\Column(type="boolean")
     * @Assert\NotBlank()
     */
    private $isEnabled;

    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Auth\GroupsEntity", inversedBy="users")
     * @ORM\JoinTable(
     *  name="users_groups",
     *  joinColumns={
     *      @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     *  },
     *  inverseJoinColumns={
     *      @ORM\JoinColumn(name="group_id", referencedColumnName="id")
     *  }
     * )
     */
    private $groups;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->groups = new ArrayCollection();
    }

    /**
     * Get ID
     *
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set first name
     *
     * @param $firstName
     * @return $this
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * Get first name
     *
     * @return mixed
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Set last name
     *
     * @param $lastName
     * @return $this
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * Get last name
     *
     * @return mixed
     */
    public function getLastName()
    {
        return $this->lastName;
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
     * Get salt
     *
     * @return null
     */
    public function getSalt()
    {
        return null;
    }

    /**
     * Set password
     *
     * @param $password
     * @return $this
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get passord
     * @return mixed
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set email
     *
     * @param $email
     * @return $this
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set is active
     *
     * @param $isEnabled
     */
    public function setIsEnabled($isEnabled)
    {
        $this->isEnabled = $isEnabled;
    }

    /**
     * Is enabled
     *
     * @return mixed
     */
    public function isEnabled()
    {
        return $this->isEnabled;
    }

    /**
     * Get roles
     *
     * @return array
     */
    public function getRoles()
    {
        return $this->groups->toArray();
    }

    /**
     * Erase credentials
     */
    public function eraseCredentials()
    {
    }

    /**
     * Is account non expired
     *
     * @return bool
     */
    public function isAccountNonExpired()
    {
        return true;
    }

    /**
     * Is account non locked
     *
     * @return bool
     */
    public function isAccountNonLocked()
    {
        return true;
    }

    /**
     * Is credentials non expired
     *
     * @return bool
     */
    public function isCredentialsNonExpired()
    {
        return true;
    }

    /**
     * Serialize
     *
     * @return string
     */
    public function serialize()
    {
        return serialize(array(
            $this->isEnabled
        ));
    }

    /**
     * Unserialize
     *
     * @param string $serialized
     */
    public function unserialize($serialized)
    {
        list($this->isEnabled) = unserialize($serialized);
    }

    /**
     * Get groups
     *
     * @return ArrayCollection
     */
    public function getGroups()
    {
        return $this->groups;
    }

    /**
     * Add group
     *
     * @param GroupsEntity $group
     */
    public function addGroup(GroupsEntity $group)
    {
        if (true === $this->groups->contains($group)) {
            return;
        }

        $this->groups->add($group);
        $group->addUser($this);
    }

    /**
     * Remove group
     *
     * @param GroupsEntity $group
     */
    public function removeGroup(GroupsEntity $group)
    {
        if (false === $this->groups->contains($group)) {
            return;
        }
        $this->groups->removeElement($group);
        $group->removeUser($this);
    }
}
