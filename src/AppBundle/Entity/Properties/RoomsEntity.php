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
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity
 * @ORM\Table(name="rooms")
 */
class RoomsEntity
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
     * @ORM\Column(type="string", length=50)
     * @Assert\NotBlank()
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=6)
     * @Assert\Blank()
     */
    private $totalArea;

    /**
     * @ORM\Column(type="text")
     * @Assert\Blank()
     */
    private $description;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Properties\PropertyEntity", inversedBy="rooms")
     * @ORM\JoinColumn(name="property_id", referencedColumnName="id")
     */
    private $properties;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Properties\RoomsWallsEntity", mappedBy="rooms", cascade={"persist"})
     * @ORM\OrderBy({"name" = "ASC"})
     */
    private $walls;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->paints = new ArrayCollection();
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
     * Set propertyId
     *
     * @param integer $propertyId
     *
     * @return RoomsEntity
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
     * @return RoomsEntity
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
     * Set totalArea
     *
     * @param string $totalArea
     *
     * @return RoomsEntity
     */
    public function setTotalArea($totalArea)
    {
        $this->totalArea = $totalArea;

        return $this;
    }

    /**
     * Get totalArea
     *
     * @return string
     */
    public function getTotalArea()
    {
        return $this->totalArea;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return RoomsEntity
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set properties
     *
     * @param \AppBundle\Entity\Properties\PropertyEntity $properties
     *
     * @return RoomsEntity
     */
    public function setProperties(PropertyEntity $properties = null)
    {
        $this->properties = $properties;

        return $this;
    }

    /**
     * Get properties
     *
     * @return \AppBundle\Entity\Properties\PropertyEntity
     */
    public function getProperties()
    {
        return $this->properties;
    }

    /**
     * Add wall
     *
     * @param \AppBundle\Entity\Properties\RoomsWallsEntity $wall
     *
     * @return RoomsEntity
     */
    public function addWall(RoomsWallsEntity $wall)
    {
        $this->walls[] = $wall;
        $wall->setRooms($this);

        return $this;
    }

    /**
     * Remove wall
     *
     * @param \AppBundle\Entity\Properties\RoomsWallsEntity $wall
     */
    public function removeWall(RoomsWallsEntity $wall)
    {
        $this->walls->removeElement($wall);
    }

    /**
     * Get walls
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getWalls()
    {
        return $this->walls;
    }
}