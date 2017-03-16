<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="vehicle_mfgs")
 */
class VehicleMfgsEntity
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
    private $mfgId;

    /**
     * @ORM\Column(type="string", length=30)
     * @Assert\NotBlank()
     */
    private $mfg;

    /**
     * Get ID
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get manufacturer ID
     *
     * @return integer
     */
    public function getMfgId()
    {
        return $this->mfgId;
    }

    /**
     * Set manufacturer ID
     *
     * @param $mfgId
     * @return $this
     */
    public function setMfgId($mfgId)
    {
        $this->mfgId = $mfgId;

        return $this;
    }

    /**
     * Get manufacturer
     *
     * @return string
     */
    public function getMfg()
    {
        return $this->mfg;
    }

    /**
     * Set manufacturer
     *
     * @param string $mfg
     *
     * @return Cars
     */
    public function setMfg($mfg)
    {
        $this->mfg = ucwords(strtolower($mfg));

        return $this;
    }
}