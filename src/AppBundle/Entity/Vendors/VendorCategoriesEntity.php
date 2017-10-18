<?php

namespace AppBundle\Entity\Vendors;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity
 * @ORM\Table(name="houses.vendors_categories")
 */
class VendorCategoriesEntity
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
    private $name;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Vendors\VendorsEntity", mappedBy="category", cascade={"persist"})
     */
    private $vendors;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->vendors = new ArrayCollection();
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
     * @return VendorCategoriesEntity
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
     * Add vendor
     *
     * @param VendorsEntity $vendors
     *
     * @return VendorsEntity
     */
    public function addVendor(VendorsEntity $vendors)
    {
        $this->vendors[] = $vendors;
        $vendors->setCategory($this);

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
}