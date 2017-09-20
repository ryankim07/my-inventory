<?php
/**
 * Created by PhpStorm.
 * User: kimr234z
 * Date: 4/10/17
 * Time: 4:10 PM
 */

namespace AppBundle\Entity\Properties;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use AppBundle\Entity\Properties\PropertyEntity;

/**
 * @ORM\Entity
 * @ORM\Table(name="address")
 */
class AddressEntity
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(type="integer", length=11)
     * @Assert\NotBlank()
     */
    private $propertyId;

    /**
     * @ORM\Column(type="string", length=100)
     * @Assert\NotBlank()
     */
    private $street;

    /**
     * @ORM\Column(type="string", length=50)
     * @Assert\NotBlank()
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=2)
     * @Assert\NotBlank()
     */
    private $state;

    /**
     * @ORM\Column(type="integer", length=10)
     * @Assert\NotBlank()
     */
    private $zip;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $county;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $country;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $subdivision;

    /**
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Properties\PropertyEntity", inversedBy="address")
     * @ORM\JoinColumn(name="property_id", referencedColumnName="id")
     */
    private $property;

    /**
     * Get ID
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set property ID
     *
     * @param $propertyId
     * @return $this
     */
    public function setPropertyId($propertyId)
    {
        $this->propertyId = $propertyId;

        return $this;
    }

    /**
     * Get property ID
     *
     * @return integer
     */
    public function getPropertyId()
    {
        return $this->propertyId;
    }

    /**
     * Set street
     *
     * @param $street
     * @return $this
     */
    public function setStreet($street)
    {
        $this->street = $street;

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
     * @param $city
     * @return $this
     */
    public function setCity($city)
    {
        $this->city = $city;

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
     * @param $state
     * @return $this
     */
    public function setState($state)
    {
        $this->state = $state;

        return $this;
    }

    /**
     * Get state
     *
     * @return string
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * Set zip
     *
     * @param $zip
     * @return $this
     */
    public function setZip($zip)
    {
        $this->zip = $zip;

        return $this;
    }

    /**
     * Get zip
     *
     * @return integer
     */
    public function getZip()
    {
        return $this->zip;
    }

    /**
     * Set county
     *
     * @param $county
     * @return $this
     */
    public function setCounty($county)
    {
        $this->county = $county;

        return $this;
    }

    /**
     * Get county
     *
     * @return string
     */
    public function getCounty()
    {
        return $this->county;
    }

    /**
     * Set country
     *
     * @param $country
     * @return $this
     */
    public function setCountry($country)
    {
        $this->country = $country;

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
     * Set subdivision
     *
     * @param $subdivision
     * @return $this
     */
    public function setSubdivision($subdivision)
    {
        $this->subdivision = $subdivision;

        return $this;
    }

    /**
     * Get subdivision
     *
     * @return string
     */
    public function getSubdivision()
    {
        return $this->subdivision;
    }

    /**
     * Set property
     *
     * @param PropertyEntity $property
     * @return $this
     */
    public function setProperty(PropertyEntity $property)
    {
        $this->property = $property;

        return $this;
    }

    /**
     * Get property
     *
     * @return \AppBundle\Entity\Properties\PropertyEntity
     */
    public function getProperty()
    {
        return $this->property;
    }
}
