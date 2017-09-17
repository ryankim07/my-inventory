<?php

namespace AppBundle\Entity\Properties;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;
use AppBundle\Entity\Properties\PropertyEntity;

/**
 * @ORM\Entity
 * @ORM\Table(name="room_assets")
 */
class RoomAssetsEntity
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
    private $roomId;
    
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
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Properties\RoomsEntity", inversedBy="roomAssets")
     * @ORM\JoinColumn(name="property_id", referencedColumnName="id")
     */
    private $rooms;

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
     * Get property ID
     *
     * @return integer
     */
    public function getPropertyId()
    {
        return $this->propertyId;
    }

    /**
     * Set property ID
     *
     * @param $propertyId
     * @return $this
     */
    public function setPropertyId($propertyId)
    {
        $this->propertyId = $propertyId;

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
     * Set properties
     *
     * @param PropertyEntity|null $properties
     * @return $this\
     */
    public function setProperties(PropertyEntity $properties = null)
    {
        $this->properties = $properties;

        return $this;
    }

    /**
     * Get properties
     *
     * @return mixed
     */
    public function getProperties()
    {
        return $this->properties;
    }

    /**
     * Set roomId
     *
     * @param integer $roomId
     *
     * @return RoomAssetsEntity
     */
    public function setRoomId($roomId)
    {
        $this->roomId = $roomId;

        return $this;
    }

    /**
     * Get roomId
     *
     * @return integer
     */
    public function getRoomId()
    {
        return $this->roomId;
    }

    /**
     * Set rooms
     *
     * @param \AppBundle\Entity\Properties\RoomsEntity $rooms
     *
     * @return RoomAssetsEntity
     */
    public function setRooms(\AppBundle\Entity\Properties\RoomsEntity $rooms = null)
    {
        $this->rooms = $rooms;

        return $this;
    }

    /**
     * Get rooms
     *
     * @return \AppBundle\Entity\Properties\RoomsEntity
     */
    public function getRooms()
    {
        return $this->rooms;
    }
}
