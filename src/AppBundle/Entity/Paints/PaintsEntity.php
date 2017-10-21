<?php

/**
 * Class PaintsEntity
 *
 * Entity class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Entity\Paints;

use AppBundle\Entity\Properties\AssetsEntity;
use AppBundle\Entity\Vendors\VendorsEntity;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="houses.paints")
 */
class PaintsEntity
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(type="integer", length=11)
     */
    private $vendorId;

    /**
     * @ORM\Column(type="string", length=100)
     * @Assert\NotBlank()
     */
    private $brand;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $name;

    /**
     * @ORM\Column(type="integer", length=10)
     */
    private $number;

    /**
     * @ORM\Column(type="string", length=100)
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
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Vendors\VendorsEntity", inversedBy="paints")
     * @ORM\JoinColumn(name="vendor_id", referencedColumnName="id")
     */
    private $vendor;

    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Properties\AssetsEntity", orphanRemoval=true, cascade={"persist", "remove"})
     * @ORM\JoinTable(
     *  name="houses.paint_assets",
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
    private $assets;

    /**
     * Constructor
     */
    public function __construct()
    {
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
     * Set vendorId
     *
     * @param integer $vendorId
     *
     * @return PaintsEntity
     */
    public function setVendorId($vendorId)
    {
        $this->vendorId = $vendorId;

        return $this;
    }

    /**
     * Get vendorId
     *
     * @return integer
     */
    public function getVendorId()
    {
        return $this->vendorId;
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
     * Set vendor
     *
     * @param VendorsEntity $vendor
     *
     * @return PaintsEntity
     */
    public function setVendor(VendorsEntity $vendor = null)
    {
        $this->vendor = $vendor;

        return $this;
    }

    /**
     * Get vendor
     *
     * @return VendorsEntity
     */
    public function getVendor()
    {
        return $this->vendor;
    }

    /**
     * Add asset
     *
     * @param AssetsEntity $asset
     * @return $this|void
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
