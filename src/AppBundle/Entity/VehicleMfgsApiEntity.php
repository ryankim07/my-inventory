<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;;

/**
 * @ORM\Entity(repositoryClass="AppBundle\Repository\Vehicles\Api\VehiclesRepository")
 * @ORM\Table(name="vehicle_mfgs")
 */
class VehicleMfgsApiEntity
{
    /**
     * @ORM\OneToMany(targetEntity="VehicleModelsApiEntity", mappedBy="manufacturers")
     * @ORM\OrderBy({"model" = "ASC"})
     */
    private $models;

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
     * Constructor
     */
    public function __construct()
    {
        $this->models = new ArrayCollection();
    }

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

    /**
     * Add model
     *
     * @param \AppBundle\Entity\VehicleModelsApiEntity $model
     *
     * @return VehicleMfgsApiEntity
     */
    public function addModel(VehicleModelsApiEntity $model)
    {
        $this->models[] = $model;

        return $this;
    }

    /**
     * Remove model
     *
     * @param \AppBundle\Entity\VehicleModelsApiEntity $model
     */
    public function removeModel(VehicleModelsApiEntity $model)
    {
        $this->models->removeElement($model);
    }

    /**
     * Get models
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getModels()
    {
        return $this->models;
    }
}
