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
    private $beds;

    /**
     * @ORM\Column(type="integer", length=2)
     * @Assert\NotBlank()
     */
    private $baths;

    /**
     * @ORM\Column(type="integer", length=2)
     * @Assert\NotBlank()
     */
    private $floors;

    /**
     * @ORM\Column(type="string", length=6)
     * @Assert\NotBlank()
     */
    private $finishedArea;

    /**
     * @ORM\Column(type="string", length=6)
     * @Assert\NotBlank()
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
}
