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
 * @ORM\Table(name="features")
 */
class FeaturesEntity
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
    private $parking;

    /**
     * @ORM\Column(type="text")
     */

    private $multiUnit;
    /**
     * @ORM\Column(type="text")
     */
    private $hoa;

    /**
     * @ORM\Column(type="text")
     */
    private $utilities;

    /**
     * @ORM\Column(type="text")
     */
    private $lot;

    /**
     * @ORM\Column(type="text")
     */
    private $commonWalls;

    /**
     * @ORM\Column(type="text")
     */
    private $facingDirection;

    /**
     * @ORM\Column(type="text")
     */
    private $others;

    /**
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Properties\PropertyEntity", inversedBy="features")
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
     * @return FeaturesEntity
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
     * Set parking
     *
     * @param string $parking
     *
     * @return FeaturesEntity
     */
    public function setParking($parking)
    {
        $this->parking = $parking;

        return $this;
    }

    /**
     * Get parking
     *
     * @return string
     */
    public function getParking()
    {
        return $this->parking;
    }

    /**
     * Set multiUnit
     *
     * @param string $multiUnit
     *
     * @return FeaturesEntity
     */
    public function setMultiUnit($multiUnit)
    {
        $this->multiUnit = $multiUnit;

        return $this;
    }

    /**
     * Get multiUnit
     *
     * @return string
     */
    public function getMultiUnit()
    {
        return $this->multiUnit;
    }

    /**
     * Set hoa
     *
     * @param string $hoa
     *
     * @return FeaturesEntity
     */
    public function setHoa($hoa)
    {
        $this->hoa = $hoa;

        return $this;
    }

    /**
     * Get hoa
     *
     * @return string
     */
    public function getHoa()
    {
        return $this->hoa;
    }

    /**
     * Set utilities
     *
     * @param string $utilities
     *
     * @return FeaturesEntity
     */
    public function setUtilities($utilities)
    {
        $this->utilities = $utilities;

        return $this;
    }

    /**
     * Get utilities
     *
     * @return string
     */
    public function getUtilities()
    {
        return $this->utilities;
    }

    /**
     * Set lot
     *
     * @param string $lot
     *
     * @return FeaturesEntity
     */
    public function setLot($lot)
    {
        $this->lot = $lot;

        return $this;
    }

    /**
     * Get lot
     *
     * @return string
     */
    public function getLot()
    {
        return $this->lot;
    }

    /**
     * Set commonWalls
     *
     * @param string $commonWalls
     *
     * @return FeaturesEntity
     */
    public function setCommonWalls($commonWalls)
    {
        $this->commonWalls = $commonWalls;

        return $this;
    }

    /**
     * Get commonWalls
     *
     * @return string
     */
    public function getCommonWalls()
    {
        return $this->commonWalls;
    }

    /**
     * Set facingDirection
     *
     * @param string $facingDirection
     *
     * @return FeaturesEntity
     */
    public function setFacingDirection($facingDirection)
    {
        $this->facingDirection = $facingDirection;

        return $this;
    }

    /**
     * Get facingDirection
     *
     * @return string
     */
    public function getFacingDirection()
    {
        return $this->facingDirection;
    }

    /**
     * Set others
     *
     * @param string $others
     *
     * @return FeaturesEntity
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
     * @return FeaturesEntity
     */
    public function setProperty(\AppBundle\Entity\Properties\PropertyEntity $property = null)
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
