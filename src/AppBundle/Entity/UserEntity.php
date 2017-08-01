<?php
/**
 * Created by PhpStorm.
 * User: kimr234z
 * Date: 4/10/17
 * Time: 4:10 PM
 */

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\AdvancedUserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity
 * @ORM\Table(name="users")
 */
class UserEntity implements AdvancedUserInterface, \Serializable
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=25, unique=true)
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=64)
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=60, unique=true)
     */
    private $email;

    /**
     * @ORM\Column(name="is_active", type="boolean")
     */
    private $isActive;

    /**
     * @ORM\ManyToMany(targetEntity="GroupEntity", inversedBy="users")
     * @ORM\JoinTable(
     *  name="user_entity_group_entity",
     *  joinColumns={
     *      @ORM\JoinColumn(name="user_entity_id", referencedColumnName="id")
     *  },
     *  inverseJoinColumns={
     *      @ORM\JoinColumn(name="group_entity_id", referencedColumnName="id")
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
     * @param $active
     */
    public function setIsActive($active)
    {
        $this->isActive = $active;
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
     * Is enabled
     *
     * @return mixed
     */
    public function isEnabled()
    {
        return $this->isActive;
    }

    /**
     * Serialize
     *
     * @return string
     */
    public function serialize()
    {
        return serialize(array(
            $this->isActive
        ));
    }

    /**
     * Unserialize
     *
     * @param string $serialized
     */
    public function unserialize($serialized)
    {
        list($this->isActive) = unserialize($serialized);
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
     * @param GroupEntity $group
     */
    public function addGroup(GroupEntity $group)
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
     * @param GroupEntity $group
     */
    public function removeGroup(GroupEntity $group)
    {
        if (false === $this->groups->contains($group)) {
            return;
        }
        $this->groups->removeElement($group);
        $group->removeUser($this);
    }
}