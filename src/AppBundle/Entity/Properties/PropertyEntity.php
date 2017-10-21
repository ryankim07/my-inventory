<?php

/**
 * Class PropertyEntity
 *
 * Entity class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Entity\Properties;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="houses.properties")
 */
class PropertyEntity
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(type="integer", length=4)
     * @Assert\NotBlank()
     */
    private $built;

    /**
     * @ORM\Column(type="string", length=20)
     * @Assert\NotBlank()
     */
    private $style;

    /**
     * @ORM\Column(type="integer", length=2)
     * @Assert\NotBlank()
     */
    private $floors;

    /**
     * @ORM\Column(type="integer", length=2)
     * @Assert\NotBlank()
     */
    private $beds;

    /**
     * @ORM\Column(type="string", length=3)
     * @Assert\NotBlank()
     */
    private $baths;

    /**
     * @ORM\Column(type="string", length=6)
     */
    private $finishedArea;

    /**
     * @ORM\Column(type="string", length=6)
     */
    private $unfinishedArea;

    /**
     * @ORM\Column(type="string", length=6)
     * @Assert\NotBlank()
     */
    private $totalArea;

    /**
     * @ORM\Column(type="string", length=20)
     */
    private $parcelNumber;

    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Properties\AssetsEntity", orphanRemoval=true, cascade={"persist", "remove"})
     * @ORM\JoinTable(
     *  name="houses.property_assets",
     *  joinColumns={
     *      @ORM\JoinColumn(name="property_id", referencedColumnName="id")
     *  },
     *  inverseJoinColumns={
     *      @ORM\JoinColumn(name="asset_id", referencedColumnName="id")
     *  }
     * )
     *
     * orphanRemoval - this is necessary to remove rows from the 2nd table besides the 3rd table
     */
    private $assets;

    /**
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Properties\AddressEntity", mappedBy="property", cascade={"persist", "remove"})
     */
    private $address;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Properties\RoomsEntity", mappedBy="property", cascade={"persist", "remove"})
     * @ORM\OrderBy({"name" = "ASC"})
     */
    private $rooms;

    /**
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Properties\ExteriorFeaturesEntity", mappedBy="property", cascade={"persist", "remove"})
     */
    private $exteriorFeatures;

    /**
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Properties\InteriorFeaturesEntity", mappedBy="property", cascade={"persist", "remove"})
     */
    private $interiorFeatures;

    /**
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Properties\FeaturesEntity", mappedBy="property", cascade={"persist", "remove"})
     */
    private $features;

    /**
     * Non mapped property
     *
     * @var ArrayCollection
     */
    private $nonAddedRooms;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->assets        = new ArrayCollection();
        $this->rooms         = new ArrayCollection();
        $this->nonAddedRooms = new ArrayCollection();
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
     * Set built
     *
     * @param integer $built
     *
     * @return PropertyEntity
     */
    public function setBuilt($built)
    {
        $this->built = $built;

        return $this;
    }

    /**
     * Get built
     *
     * @return integer
     */
    public function getBuilt()
    {
        return $this->built;
    }

    /**
     * Set style
     *
     * @param string $style
     *
     * @return PropertyEntity
     */
    public function setStyle($style)
    {
        $this->style = $style;

        return $this;
    }

    /**
     * Get style
     *
     * @return string
     */
    public function getStyle()
    {
        return $this->style;
    }

    /**
     * Set floors
     *
     * @param integer $floors
     *
     * @return PropertyEntity
     */
    public function setFloors($floors)
    {
        $this->floors = $floors;

        return $this;
    }

    /**
     * Get floors
     *
     * @return integer
     */
    public function getFloors()
    {
        return $this->floors;
    }

    /**
     * Set beds
     *
     * @param integer $beds
     *
     * @return PropertyEntity
     */
    public function setBeds($beds)
    {
        $this->beds = $beds;

        return $this;
    }

    /**
     * Get beds
     *
     * @return integer
     */
    public function getBeds()
    {
        return $this->beds;
    }

    /**
     * Set baths
     *
     * @param integer $baths
     *
     * @return PropertyEntity
     */
    public function setBaths($baths)
    {
        $this->baths = $baths;

        return $this;
    }

    /**
     * Get baths
     *
     * @return integer
     */
    public function getBaths()
    {
        return $this->baths;
    }

    /**
     * Set finished area
     *
     * @param string $finishedArea
     *
     * @return PropertyEntity
     */
    public function setFinishedArea($finishedArea)
    {
        $this->finishedArea = $finishedArea;

        return $this;
    }

    /**
     * Get finished area
     *
     * @return string
     */
    public function getFinishedArea()
    {
        return $this->finishedArea;
    }

    /**
     * Set unfinished area
     *
     * @param string $unfinishedArea
     *
     * @return PropertyEntity
     */
    public function setUnfinishedArea($unfinishedArea)
    {
        $this->unfinishedArea = $unfinishedArea;

        return $this;
    }

    /**
     * Get unfinished area
     *
     * @return string
     */
    public function getUnfinishedArea()
    {
        return $this->unfinishedArea;
    }

    /**
     * Set total area
     *
     * @param string $totalArea
     *
     * @return PropertyEntity
     */
    public function setTotalArea($totalArea)
    {
        $this->totalArea = $totalArea;

        return $this;
    }

    /**
     * Get total area
     *
     * @return string
     */
    public function getTotalArea()
    {
        return $this->totalArea;
    }

    /**
     * Set parcel number
     *
     * @param string $parcelNumber
     *
     * @return PropertyEntity
     */
    public function setParcelNumber($parcelNumber)
    {
        $this->parcelNumber = $parcelNumber;

        return $this;
    }

    /**
     * Get parcel number
     *
     * @return string
     */
    public function getParcelNumber()
    {
        return $this->parcelNumber;
    }

    /**
     * Set address
     *
     * @param AddressEntity $address
     *
     * @return PropertyEntity
     */
    public function addAddress(AddressEntity $address)
    {
        $this->address = $address;
        $address->setProperty($this);
    }

    /**
     * Get address
     *
     * @return mixed
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set address
     *
     * @param AddressEntity $address
     *
     * @return PropertyEntity
     */
    public function setAddress(AddressEntity $address = null)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Add room
     *
     * @param RoomsEntity $room
     *
     * @return PropertyEntity
     */
    public function addRoom(RoomsEntity $room)
    {
        $this->rooms[] = $room;
        $room->setProperty($this);

        return $this;
    }

    /**
     * Remove room
     *
     * @param RoomsEntity $room
     */
    public function removeRoom(RoomsEntity $room)
    {
        $this->rooms->removeElement($room);
    }

    /**
     * Get rooms
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getRooms()
    {
        return $this->rooms;
    }

    /**
     * Add features
     *
     * @param FeaturesEntity $features
     */
    public function addFeatures(FeaturesEntity $features)
    {
        $this->features = $features;
        $features->setProperty($this);
    }

    /**
     * Set features
     *
     * @param FeaturesEntity $features
     *
     * @return PropertyEntity
     */
    public function setFeatures(FeaturesEntity $features = null)
    {
        $this->features = $features;

        return $this;
    }

    /**
     * Get features
     *
     * @return FeaturesEntity
     */
    public function getFeatures()
    {
        return $this->features;
    }

    /**
     * Add exterior features
     * Need this functionality to return within the property object
     *
     * @param ExteriorFeaturesEntity $exteriorFeatures
     */
    public function addExteriorFeatures(ExteriorFeaturesEntity $exteriorFeatures)
    {
        $this->exteriorFeatures = $exteriorFeatures;
        $exteriorFeatures->setProperty($this);
    }

    /**
     * Set exterior features
     *
     * @param ExteriorFeaturesEntity $exteriorFeatures
     *
     * @return PropertyEntity
     */
    public function setExteriorFeatures(ExteriorFeaturesEntity $exteriorFeatures = null)
    {
        $this->exteriorFeatures = $exteriorFeatures;

        return $this;
    }

    /**
     * Get exterior features
     *
     * @return ExteriorFeaturesEntity
     */
    public function getExteriorFeatures()
    {
        return $this->exteriorFeatures;
    }

    /**
     * Add interior features
     *
     * @param InteriorFeaturesEntity $interiorFeatures
     */
    public function addInteriorFeatures(InteriorFeaturesEntity $interiorFeatures)
    {
        $this->interiorFeatures = $interiorFeatures;
        $interiorFeatures->setProperty($this);
    }

    /**
     * Set interior features
     *
     * @param InteriorFeaturesEntity $interiorFeatures
     *
     * @return PropertyEntity
     */
    public function setInteriorFeatures(InteriorFeaturesEntity $interiorFeatures = null)
    {
        $this->interiorFeatures = $interiorFeatures;

        return $this;
    }

    /**
     * Get interior features
     *
     * @return InteriorFeaturesEntity
     */
    public function getInteriorFeatures()
    {
        return $this->interiorFeatures;
    }

    /**
     * Difference generated from added rooms with configured rooms
     *
     * @param $rooms
     */
    public function addNonAddedRooms($rooms)
    {
        $this->nonAddedRooms = $rooms;
    }

    /**
     * Add asset
     *
     * @param AssetsEntity $asset
     */
    public function addAsset(AssetsEntity $asset)
    {
        if (true === $this->assets->contains($asset)) {
            return;
        }

        $this->assets[] = $asset;

        return $this;
    }

    /**
     * Remove all assets
     */
    public function removeAllAssets()
    {
        if ($this->assets->count() > 0) {
            foreach ($this->assets as $existingAsset) {
                $this->removeAsset($existingAsset);
            }
        }
    }

    /**
     * Remove asset
     *
     * @param AssetsEntity $asset
     */
    public function removeAsset(AssetsEntity $asset)
    {
        if (false === $this->assets->contains($asset)) {
            return;
        }

        $this->assets->removeElement($asset);
    }

    /**
     * Get assets
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getAssets()
    {
        return $this->assets;
    }
}
