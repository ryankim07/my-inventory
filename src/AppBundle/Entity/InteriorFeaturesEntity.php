<?php

/**
 * Class InteriorFeaturesEntity
 *
 * Entity class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="houses.interior_features")
 */
class InteriorFeaturesEntity
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
     * @ORM\Column(type="text")
     */

    private $kitchen;

    /**
     * @ORM\Column(type="text")
     */
    private $bathroom;

    /**
     * @ORM\Column(type="text")
     */
    private $laundry;

    /**
     * @ORM\Column(type="text")
     */
    private $cooling;

    /**
     * @ORM\Column(type="text")
     */
    private $heating;

    /**
     * @ORM\Column(type="text")
     */
    private $fireplace;

    /**
     * @ORM\Column(type="text")
     */
    private $flooring;

    /**
     * @ORM\Column(type="text")
     */
    private $others;

    /**
     * @ORM\OneToOne(targetEntity="PropertiesEntity", inversedBy="interiorFeatures")
     * @ORM\JoinColumn(name="property_id", referencedColumnName="id")
     */
    private $property;

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
     * Set propertyId
     *
     * @param integer $propertyId
     *
     * @return InteriorFeaturesEntity
     */
    public function setPropertyId($propertyId)
    {
        $this->propertyId = $propertyId;

        return $this;
    }

    /**
     * Get propertyId
     *
     * @return integer
     */
    public function getPropertyId()
    {
        return $this->propertyId;
    }

    /**
     * Set kitchen
     *
     * @param string $kitchen
     *
     * @return InteriorFeaturesEntity
     */
    public function setKitchen($kitchen)
    {
        $this->kitchen = $kitchen;

        return $this;
    }

    /**
     * Get kitchen
     *
     * @return string
     */
    public function getKitchen()
    {
        return $this->kitchen;
    }

    /**
     * Set bathroom
     *
     * @param string $bathroom
     *
     * @return InteriorFeaturesEntity
     */
    public function setBathroom($bathroom)
    {
        $this->bathroom = $bathroom;

        return $this;
    }

    /**
     * Get bathroom
     *
     * @return string
     */
    public function getBathroom()
    {
        return $this->bathroom;
    }

    /**
     * Set laundry
     *
     * @param string $laundry
     *
     * @return InteriorFeaturesEntity
     */
    public function setLaundry($laundry)
    {
        $this->laundry = $laundry;

        return $this;
    }

    /**
     * Get laundry
     *
     * @return string
     */
    public function getLaundry()
    {
        return $this->laundry;
    }

    /**
     * Set cooling
     *
     * @param string $cooling
     *
     * @return InteriorFeaturesEntity
     */
    public function setCooling($cooling)
    {
        $this->cooling = $cooling;

        return $this;
    }

    /**
     * Get cooling
     *
     * @return string
     */
    public function getCooling()
    {
        return $this->cooling;
    }

    /**
     * Set heating
     *
     * @param string $heating
     *
     * @return InteriorFeaturesEntity
     */
    public function setHeating($heating)
    {
        $this->heating = $heating;

        return $this;
    }

    /**
     * Get heating
     *
     * @return string
     */
    public function getHeating()
    {
        return $this->heating;
    }

    /**
     * Set fireplace
     *
     * @param string $fireplace
     *
     * @return InteriorFeaturesEntity
     */
    public function setFireplace($fireplace)
    {
        $this->fireplace = $fireplace;

        return $this;
    }

    /**
     * Get fireplace
     *
     * @return string
     */
    public function getFireplace()
    {
        return $this->fireplace;
    }

    /**
     * Set flooring
     *
     * @param string $flooring
     *
     * @return InteriorFeaturesEntity
     */
    public function setFlooring($flooring)
    {
        $this->flooring = $flooring;

        return $this;
    }

    /**
     * Get flooring
     *
     * @return string
     */
    public function getFlooring()
    {
        return $this->flooring;
    }

    /**
     * Set others
     *
     * @param string $others
     *
     * @return InteriorFeaturesEntity
     */
    public function setOthers($others)
    {
        $this->others = $others;

        return $this;
    }

    /**
     * Get others
     *
     * @return string
     */
    public function getOthers()
    {
        return $this->others;
    }

    /**
     * Set property
     *
     * @param PropertiesEntity $property
     *
     * @return InteriorFeaturesEntity
     */
    public function setProperty(PropertiesEntity $property = null)
    {
        $this->property = $property;

        return $this;
    }

    /**
     * Get property
     *
     * @return PropertiesEntity
     */
    public function getProperty()
    {
        return $this->property;
    }
}