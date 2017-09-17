<?php

namespace AppBundle\Entity\Vehicles;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;
use AppBundle\Entity\Vehicles\VehicleEntity;

/**
 * @ORM\Entity
 * @ORM\Table(name="assets")
 */
class AssetsEntity
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotBlank()
     */
    private $vehicleId;
    
    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    public $path;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Vehicles\VehicleEntity", inversedBy="assets")
     * @ORM\JoinColumn(name="vehicle_id", referencedColumnName="id")
     */
    private $vehicles;

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
     * Get vehicle ID
     *
     * @return integer
     */
    public function getVehicleId()
    {
        return $this->vehicleId;
    }

    /**
     * Set vehicle ID
     *
     * @param $vehicleId
     * @return $this
     */
    public function setVehicleId($vehicleId)
    {
        $this->vehicleId = $vehicleId;

        return $this;
    }

    /**
     * Set name
     *
     * @param $name
     * @return $this
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
     * Set path
     *
     * @param $path
     * @return $this
     */
    public function setPath($path)
    {
        $this->path = $path;

        return $this;
    }

    /**
     * Get path
     *
     * @return string
     */
    public function getPath()
    {
        return $this->path;
    }

    /**
     * Set vehicles
     *
     * @param \AppBundle\Entity\Vehicles\VehicleEntity|null $vehicles
     * @return $this
     */
    public function setVehicles(VehicleEntity $vehicles = null)
    {
        $this->vehicles = $vehicles;

        return $this;
    }

    /**
     * Get vehicles
     *
     * @return mixed
     */
    public function getVehicles()
    {
        return $this->vehicles;
    }
}
