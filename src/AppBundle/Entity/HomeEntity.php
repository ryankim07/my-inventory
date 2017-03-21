<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="homes")
 */
class HomeEntity
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
    private $street;

    /**
     * @ORM\Column(type="string", length=30)
     * @Assert\NotBlank()
     */
    private $city;

    /**
     * @ORM\Column(type="integer", length=2)
     * @Assert\NotBlank()
     */
    private $state;

    /**
     * @ORM\Column(type="string", length=10)
     * @Assert\NotBlank()
     */
    private $zip;

    /**
     * @ORM\Column(type="string", length=3)
     */
    private $country;

    /**
     * @ORM\Column(type="integer", length=5)
     */
    private $sqfootage;

    /**
     * @ORM\Column(type="string", length=30)
     */
    private $community;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set street
     *
     * @param string $street
     *
     * @return HomeEntity
     */
    public function setStreet($street)
    {
        $this->street = ucwords($street);

        return $this;
    }

    /**
     * Get street
     *
     * @return string
     */
    public function getStreet()
    {
        return $this->street;
    }

    /**
     * Set city
     *
     * @param string $city
     *
     * @return HomeEntity
     */
    public function setCity($city)
    {
        $this->city = ucwords($city);

        return $this;
    }

    /**
     * Get city
     *
     * @return string
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * Set state
     *
     * @param integer $state
     *
     * @return HomeEntity
     */
    public function setState($state)
    {
        $this->state = strtoupper($state);

        return $this;
    }

    /**
     * Get state
     *
     * @return integer
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * Set zip
     *
     * @param string $zip
     *
     * @return HomeEntity
     */
    public function setZip($zip)
    {
        $this->zip = $zip;

        return $this;
    }

    /**
     * Get zip
     *
     * @return string
     */
    public function getZip()
    {
        return $this->zip;
    }

    /**
     * Set country
     *
     * @param string $country
     *
     * @return HomeEntity
     */
    public function setCountry($country)
    {
        $this->country = strtoupper($country);

        return $this;
    }

    /**
     * Get country
     *
     * @return string
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * Set sqfootage
     *
     * @param integer $sqfootage
     *
     * @return HomeEntity
     */
    public function setSqfootage($sqfootage)
    {
        $this->sqfootage = $sqfootage;

        return $this;
    }

    /**
     * Get sqfootage
     *
     * @return integer
     */
    public function getSqfootage()
    {
        return $this->sqfootage;
    }

    /**
     * Set community
     *
     * @param string $community
     *
     * @return HomeEntity
     */
    public function setCommunity($community)
    {
        $this->community = ucwords($community);

        return $this;
    }

    /**
     * Get community
     *
     * @return string
     */
    public function getCommunity()
    {
        return $this->community;
    }
}
