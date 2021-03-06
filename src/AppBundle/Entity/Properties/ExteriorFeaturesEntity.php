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
use AppBundle\Entity\Properties\PropertyEntity;

/**
 * @ORM\Entity
 * @ORM\Table(name="exterior_features")
 */
class ExteriorFeaturesEntity
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
     * @ORM\Column(type="text")
     */
    private $exterior;

    /**
     * @ORM\Column(type="text")
     */
    private $foundation;

    /**
     * @ORM\Column(type="text")
     */
    private $others;

    /**
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Properties\PropertyEntity", inversedBy="exteriorFeatures")
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
     * @return PropertyExteriorFeatures
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
     * Set exterior
     *
     * @param string $exterior
     *
     * @return PropertyExteriorFeatures
     */
    public function setExterior($exterior)
    {
        $this->exterior = $exterior;

        return $this;
    }

    /**
     * Get exterior
     *
     * @return string
     */
    public function getExterior()
    {
        return $this->exterior;
    }

    /**
     * Set foundation
     *
     * @param string $foundation
     *
     * @return PropertyExteriorFeatures
     */
    public function setFoundation($foundation)
    {
        $this->foundation = $foundation;

        return $this;
    }

    /**
     * Get foundation
     *
     * @return string
     */
    public function getFoundation()
    {
        return $this->foundation;
    }

    /**
     * Set others
     *
     * @param string $others
     *
     * @return PropertyExteriorFeatures
     */
    public function setOthers($others)
    {
        $this->others = $others;

        return $this;
    }

    /**
     * Get others
     *
     * @return string
     */
    public function getOthers()
    {
        return $this->others;
    }

    /**
     * Set property
     *
     * @param \AppBundle\Entity\Properties\PropertyEntity $property
     *
     * @return PropertyExteriorFeatures
     */
    public function setProperty(PropertyEntity $property = null)
    {
        $this->property = $property;

        return $this;
    }

    /**
     * Get property
     *
     * @return \AppBundle\Entity\Properties\PropertyEntity
     */
    public function getProperty()
    {
        return $this->property;
    }
}