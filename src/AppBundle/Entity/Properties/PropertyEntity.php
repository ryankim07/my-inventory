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
 * @ORM\Table(name="properties")
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
     * @Assert\NotBlank()
     */
    private $parcelNumber;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Properties\PropertyAssetsEntity", mappedBy="property", cascade={"persist"})
     * @ORM\OrderBy({"name" = "ASC"})
     */
    private $assets;

    /**
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Properties\AddressEntity", mappedBy="property", cascade={"persist"})
     */
    private $address;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Properties\RoomsEntity", mappedBy="property", cascade={"persist"})
     * @ORM\OrderBy({"name" = "ASC"})
     */
    private $rooms;

    /**
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Properties\ExteriorFeaturesEntity", mappedBy="property", cascade={"persist"})
     */
    private $exteriorFeatures;

    /**
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Properties\InteriorFeaturesEntity", mappedBy="property", cascade={"persist"})
     */
    private $interiorFeatures;

    /**
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Properties\FeaturesEntity", mappedBy="property", cascade={"persist"})
     */
    private $features;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->assets = new ArrayCollection();
        $this->rooms  = new ArrayCollection();
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
     * Add asset
     *
     * @param PropertyAssetsEntity $asset
     * @return $this
     */
    public function addAsset(PropertyAssetsEntity $asset)
    {
        $this->assets[] = $asset;
        $asset->setProperty($this);

        return $this;
    }

    /**
     * Remove asset
     *
     * @param PropertyAssetsEntity $asset
     */
    public function removeAsset(PropertyAssetsEntity $asset)
    {
        $this->assets->removeElement($asset);
    }

    /**
     * Get assets
     *
     * @return ArrayCollection
     */
    public function getAssets()
    {
        return $this->assets;
    }

    /**
     * Set address
     *
     * @param \AppBundle\Entity\Properties\AddressEntity $address
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
     * Add room
     *
     * @param \AppBundle\Entity\Properties\RoomsEntity $room
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
     * @param \AppBundle\Entity\Properties\RoomsEntity $room
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
     * Set address
     *
     * @param \AppBundle\Entity\Properties\AddressEntity $address
     *
     * @return PropertyEntity
     */
    public function setAddress(AddressEntity $address = null)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Set exteriorFeatures
     *
     * @param \AppBundle\Entity\Properties\ExteriorFeaturesEntity $exteriorFeatures
     *
     * @return PropertyEntity
     */
    public function setExteriorFeatures(ExteriorFeaturesEntity $exteriorFeatures = null)
    {
        $this->exteriorFeatures = $exteriorFeatures;

        return $this;
    }

    /**
     * Get exteriorFeatures
     *
     * @return \AppBundle\Entity\Properties\ExteriorFeaturesEntity
     */
    public function getExteriorFeatures()
    {
        return $this->exteriorFeatures;
    }

    /**
     * Set interiorFeatures
     *
     * @param \AppBundle\Entity\Properties\InteriorFeaturesEntity $interiorFeatures
     *
     * @return PropertyEntity
     */
    public function setInteriorFeatures(InteriorFeaturesEntity $interiorFeatures = null)
    {
        $this->interiorFeatures = $interiorFeatures;

        return $this;
    }

    /**
     * Get interiorFeatures
     *
     * @return \AppBundle\Entity\Properties\InteriorFeaturesEntity
     */
    public function getInteriorFeatures()
    {
        return $this->interiorFeatures;
    }

    /**
     * Set features
     *
     * @param \AppBundle\Entity\Properties\FeaturesEntity $features
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
     * @return \AppBundle\Entity\Properties\FeaturesEntity
     */
    public function getFeatures()
    {
        return $this->features;
    }
}
