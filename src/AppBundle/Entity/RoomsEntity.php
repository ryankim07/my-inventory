<?php

/**
 * Class RoomsEntity
 *
 * Entity class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Entity;

use AppBundle\Entity\AbstractAssetsEntity;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="houses.rooms")
 */
class RoomsEntity extends AbstractAssetsEntity
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
     */
    private $totalArea;

    /**
     * @ORM\Column(type="text")
     */
    private $description;

    /**
     * @ORM\ManyToOne(targetEntity="PropertiesEntity", inversedBy="rooms")
     * @ORM\JoinColumn(name="property_id", referencedColumnName="id")
     */
    private $property;

    /**
     * @ORM\OneToMany(targetEntity="RoomsWallsEntity", mappedBy="rooms", cascade={"persist", "remove"})
     * @ORM\OrderBy({"name" = "ASC"})
     */
    private $walls;

    /**
     * @ORM\ManyToMany(targetEntity="PropertyAssetsEntity", orphanRemoval=true, cascade={"persist", "remove"})
     * @ORM\JoinTable(
     *  name="houses.rooms_assets",
     *  joinColumns={
     *      @ORM\JoinColumn(name="room_id", referencedColumnName="id")
     *  },
     *  inverseJoinColumns={
     *      @ORM\JoinColumn(name="asset_id", referencedColumnName="id")
     *  }
     * )
     *
     * orphanRemoval - this is necessary to remove rows from the 2nd table besides the 3rd table
     */
    protected $assets;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->walls  = new ArrayCollection();
        $this->assets = new ArrayCollection();
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
     * Set property
     *
     * @param PropertiesEntity $property
     *
     * @return RoomsEntity
     */
    public function addProperty(PropertiesEntity $property = null)
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

    /**
     * Set property
     *
     * @param PropertiesEntity $property
     *
     * @return RoomsEntity
     */
    public function setProperty(PropertiesEntity $property = null)
    {
        $this->property = $property;

        return $this;
    }

    /**
     * Add wall
     *
     * @param RoomsWallsEntity $wall
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
     * @param RoomsWallsEntity $wall
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

    /**
     * Add asset
     *
     * @param PropertyAssetsEntity $asset
     * @return $this|void
     */
    public function addAsset(PropertyAssetsEntity $asset)
    {
        if (true === $this->assets->contains($asset)) {
            return;
        }

        $this->assets[] = $asset;

        return $this;
    }

    /**
     * Remove asset
     *
     * @param PropertyAssetsEntity $asset
     */
    public function removeAsset(PropertyAssetsEntity $asset)
    {
        if (false === $this->assets->contains($asset)) {
            return;
        }

        $this->assets->removeElement($asset);
    }
}
