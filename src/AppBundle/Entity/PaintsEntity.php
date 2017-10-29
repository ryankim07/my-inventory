<?php

/**
 * Class PaintsEntity
 *
 * Entity class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Entity;

use AppBundle\Entity\PropertyAssetsEntity;
use AppBundle\Entity\VendorsEntity;
use AppBundle\Entity\AbstractAssetsEntity;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="houses.paints")
 */
class PaintsEntity extends AbstractAssetsEntity
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
    private $brand;

    /**
     * @ORM\Column(type="string", length=100)
     * @Assert\NotBlank()
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=50)
     * @Assert\NotBlank()
     */
    private $number;

    /**
     * @ORM\Column(type="string", length=50)
     * @Assert\NotBlank()
     */
    private $color;

    /**
     * @ORM\Column(type="string", length=7)
     */
    private $hex;

    /**
     * @ORM\Column(type="string", length=11)
     */
    private $rgb;

    /**
     * @ORM\Column(type="text")
     */
    private $notes;

    /**
     * @ORM\ManyToMany(targetEntity="VendorsEntity", cascade={"persist"})
     * @ORM\JoinTable(
     *  name="houses.paints_vendors",
     *  joinColumns={
     *      @ORM\JoinColumn(name="paint_id", referencedColumnName="id")
     *  },
     *  inverseJoinColumns={
     *      @ORM\JoinColumn(name="vendor_id", referencedColumnName="id")
     *  }
     * )
     */
    private $vendors;

    /**
     * @ORM\ManyToMany(targetEntity="PropertyAssetsEntity", orphanRemoval=true, cascade={"persist", "remove"})
     * @ORM\JoinTable(
     *  name="houses.paints_assets",
     *  joinColumns={
     *      @ORM\JoinColumn(name="paint_id", referencedColumnName="id")
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
     * Non mapped properties
     *
     * @var $vendor
     */
    private $vendor;

    /**
     * Non mapped properties
     *
     * @var $vendorId
     */
    private $vendorId;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->vendors = new ArrayCollection();
        $this->assets  = new ArrayCollection();
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
     * Set brand
     *
     * @param string $brand
     *
     * @return PaintsEntity
     */
    public function setBrand($brand)
    {
        $this->brand = $brand;

        return $this;
    }

    /**
     * Get brand
     *
     * @return string
     */
    public function getBrand()
    {
        return $this->brand;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return PaintsEntity
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
     * Set number
     *
     * @param integer $number
     *
     * @return PaintsEntity
     */
    public function setNumber($number)
    {
        $this->number = $number;

        return $this;
    }

    /**
     * Get number
     *
     * @return integer
     */
    public function getNumber()
    {
        return $this->number;
    }

    /**
     * Set color
     *
     * @param string $color
     *
     * @return PaintsEntity
     */
    public function setColor($color)
    {
        $this->color = $color;

        return $this;
    }

    /**
     * Get color
     *
     * @return string
     */
    public function getColor()
    {
        return $this->color;
    }

    /**
     * Set hex
     *
     * @param string $hex
     *
     * @return PaintsEntity
     */
    public function setHex($hex)
    {
        $this->hex = $hex;

        return $this;
    }

    /**
     * Get hex
     *
     * @return string
     */
    public function getHex()
    {
        return $this->hex;
    }

    /**
     * Set rgb
     *
     * @param string $rgb
     *
     * @return PaintsEntity
     */
    public function setRgb($rgb)
    {
        $this->rgb = $rgb;

        return $this;
    }

    /**
     * Get rgb
     *
     * @return string
     */
    public function getRgb()
    {
        return $this->rgb;
    }

    /**
     * Set notes
     *
     * @param string $notes
     *
     * @return PaintsEntity
     */
    public function setNotes($notes)
    {
        $this->notes = $notes;

        return $this;
    }

    /**
     * Get notes
     *
     * @return string
     */
    public function getNotes()
    {
        return $this->notes;
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

    /**
     * Get all assets
     * 
     * @return ArrayCollection
     */
    public function getAssets()
    {
        return $this->assets;
    }

    /**
     * Add vendor
     *
     * @param VendorsEntity $vendor
     *
     * @return PaintsEntity
     */
    public function addVendor(VendorsEntity $vendor)
    {
        $this->vendors[] = $vendor;

        return $this;
    }

    /**
     * Remove vendor
     *
     * @param VendorsEntity $vendor
     */
    public function removeVendor(VendorsEntity $vendor)
    {
        $this->vendors->removeElement($vendor);
    }

    /**
     * Get vendors
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getVendors()
    {
        return $this->vendors;
    }

    /**
     * Set vendor
     *
     * @param $vendor
     * @return $this
     */
    public function setVendor($vendor)
    {
        $this->vendor = $vendor;

        return $this;
    }

    /**
     * Get vendor
     *
     * @return mixed
     */
    public function getVendor()
    {
        return $this->vendor;
    }

    /**
     * Set vendor
     *
     * @param $vendorId
     * @return $this
     */
    public function setVendorId($vendorId)
    {
        $this->vendorId = $vendorId;

        return $this;
    }

    /**
     * Get vendor ID
     *
     * @return mixed
     */
    public function getVendorId()
    {
        return $this->vendorId;
    }
}
