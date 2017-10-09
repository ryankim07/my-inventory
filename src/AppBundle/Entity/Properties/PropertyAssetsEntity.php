<?php

namespace AppBundle\Entity\Properties;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="property_assets")
 */
class PropertyAssetsEntity
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotBlank()
     */
    private $propertyId;
    
    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\NotBlank
     */
    public $path;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Properties\PropertyEntity", inversedBy="assets")
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
     * @return PropertyAssetsEntity
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
     * Set name
     *
     * @param string $name
     *
     * @return PropertyAssetsEntity
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set path
     *
     * @param string $path
     *
     * @return PropertyAssetsEntity
     */
    public function setPath($path)
    {
        $this->path = $path;

        return $this;
    }

    /**
     * Get path
     *
     * @return string
     */
    public function getPath()
    {
        return $this->path;
    }

    /**
     * Set property
     *
     * @param PropertyEntity $property
     *
     * @return PropertyAssetsEntity
     */
    public function setProperty(PropertyEntity $property = null)
    {
        $this->property = $property;

        return $this;
    }

    /**
     * Get property
     *
     * @return PropertyEntity
     */
    public function getProperty()
    {
        return $this->property;
    }
}
