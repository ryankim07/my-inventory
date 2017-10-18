<?php

namespace AppBundle\Entity\Properties;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="houses.assets")
 */
class AssetsEntity
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;
    
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
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Properties\PropertyEntity", mappedBy="assets")
     */
    private $properties;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->properties = new ArrayCollection();
    }

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
     * Set name
     *
     * @param string $name
     *
     * @return AssetsEntity
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
     * @return AssetsEntity
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
     * Get properties
     *
     * @return ArrayCollection
     */
    public function getProperties()
    {
        return $this->properties;
    }

    /**
     * Add property
     *
     * @param PropertyEntity $property
     */
    public function addProperty(PropertyEntity $property)
    {
        if (true === $this->properties->contains($property)) {
            return;
        }

        $this->properties->add($property);
        $property->addAsset($this);
    }

    /**
     * Remove property
     *
     * @param PropertyEntity $property
     */
    public function removeProperty(PropertyEntity $property)
    {
        if (false === $this->properties->contains($property)) {
            return;
        }
        $this->properties->removeElement($property);
        $property->removeAsset($this);
    }
}
