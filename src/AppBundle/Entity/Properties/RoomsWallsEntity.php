<?php

/**
 * Class RoomsWallsEntity
 *
 * Entity class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Entity\Properties;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="houses.rooms_walls")
 */
class RoomsWallsEntity
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(type="integer", length=11)
     * @Assert\NotBlank()
     */
    private $roomId;

    /**
     * @ORM\Column(type="integer", length=11)
     * @Assert\NotBlank()
     */
    private $paintId;

    /**
     * @ORM\Column(type="string", length=50)
     * @Assert\NotBlank()
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Properties\RoomsEntity", inversedBy="rooms_walls")
     * @ORM\JoinColumn(name="room_id", referencedColumnName="id")
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
     * Set roomId
     *
     * @param integer $roomId
     *
     * @return RoomsWallsEntity
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
     * Set paintId
     *
     * @param integer $paintId
     *
     * @return RoomsWallsEntity
     */
    public function setPaintId($paintId)
    {
        $this->paintId = $paintId;

        return $this;
    }

    /**
     * Get paintId
     *
     * @return integer
     */
    public function getPaintId()
    {
        return $this->paintId;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return RoomsWallsEntity
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
     * Set rooms
     *
     * @param \AppBundle\Entity\Properties\RoomsEntity $rooms
     *
     * @return RoomsWallsEntity
     */
    public function setRooms(RoomsEntity $rooms = null)
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