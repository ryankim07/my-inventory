<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="vehicles")
 */
class VehicleEntity
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     * @Assert\NotBlank()
     */
    private $mfg;

    /**
     * @ORM\Column(type="string", length=50)
     * @Assert\NotBlank()
     */
    private $model;

    /**
     * @ORM\Column(type="integer", length=4)
     * @Assert\NotBlank()
     * @Assert\Length(
     *      min = 4,
     *      max = 4,
     *      minMessage = "Year must be 4 digits long (e.g. 2017)",
     *      maxMessage = "Year must be 4 digits long (e.g. 2017)"
     * )
     */
    private $year;

    /**
     * @ORM\Column(type="string", length=15)
     * @Assert\NotBlank()
     */
    private $color;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $vin;

    /**
     * @ORM\Column(type="string", length=10)
     */
    private $plate;

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
     * Set mfg
     *
     * @param string $mfg
     *
     * @return Cars
     */
    public function setMfg($mfg)
    {
        $this->mfg = ucwords($mfg);

        return $this;
    }

    /**
     * Get mfg
     *
     * @return string
     */
    public function getMfg()
    {
        return $this->mfg;
    }

    /**
     * Set model
     *
     * @param string $model
     *
     * @return Cars
     */
    public function setModel($model)
    {
        $this->model = $model;

        return $this;
    }

    /**
     * Get model
     *
     * @return string
     */
    public function getModel()
    {
        return $this->model;
    }

    /**
     * Set year
     *
     * @param integer $year
     *
     * @return Cars
     */
    public function setYear($year)
    {
        $this->year = $year;

        return $this;
    }

    /**
     * Get year
     *
     * @return integer
     */
    public function getYear()
    {
        return $this->year;
    }

    /**
     * Set color
     *
     * @param string $color
     *
     * @return Cars
     */
    public function setColor($color)
    {
        $this->color = ucwords($color);

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
     * Set vin
     *
     * @param string $vin
     *
     * @return Cars
     */
    public function setVin($vin)
    {
        $this->vin = strtoupper($vin);

        return $this;
    }

    /**
     * Get vin
     *
     * @return string
     */
    public function getVin()
    {
        return $this->vin;
    }

    /**
     * Set plate
     *
     * @param string $plate
     *
     * @return Cars
     */
    public function setPlate($plate)
    {
        $this->plate = strtoupper($plate);

        return $this;
    }

    /**
     * Get plate
     *
     * @return string
     */
    public function getPlate()
    {
        return $this->plate;
    }
}