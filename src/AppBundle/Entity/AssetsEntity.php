<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="assets")
 */
class AssetsEntity
{
    /**
     * @ORM\ManyToOne(targetEntity="MyVehicleEntity", inversedBy="assets")
     * @ORM\JoinColumn(name="my_vehicle_id", referencedColumnName="id")
     */
    private $myVehicles;

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
    private $myVehicleId;
    
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
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get my vehicle ID
     *
     * @return integer
     */
    public function getMyVehicleId()
    {
        return $this->myVehicleId;
    }

    /**
     * Set my vehicle ID
     *
     * @param $myVehicleId
     * @return $this
     */
    public function setMyVehicleId($myVehicleId)
    {
        $this->myVehicleId = $myVehicleId;

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
     * Set myVehicles
     *
     * @param MyVehicleEntity $myVehicles
     *
     * @return AssetsEntity
     */
    public function setMyVehicles(MyVehicleEntity $myVehicles = null)
    {
        $this->myVehicles = $myVehicles;

        return $this;
    }

    /**
     * Get myVehicles
     *
     * @return MyVehicleEntity
     */
    public function getMyVehicles()
    {
        return $this->myVehicles;
    }
}
