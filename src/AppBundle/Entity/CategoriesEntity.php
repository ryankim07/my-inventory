<?php

namespace AppBundle\Entity;

use AppBundle\Entity\VendorsEntity;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity
 * @ORM\Table(name="houses.categories")
 */
class CategoriesEntity
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
     * @ORM\OneToMany(targetEntity="VendorsEntity", mappedBy="category", cascade={"persist", "remove"})
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
     * @return CategoriesEntity
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
     * @param VendorsEntity $vendor
     *
     * @return CategoriesEntity
     */
    public function addVendor(VendorsEntity $vendor)
    {
        if (true === $this->vendors->contains($vendor)) {
            return;
        }

        $this->vendors[] = $vendor;
        $vendor->setCategory($this);

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
