<?php

namespace AppBundle\Entity\Vehicles;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity(repositoryClass="AppBundle\Repository\Vehicles\Api\VehiclesRepository")
 * @ORM\Table(name="api_vehicles")
 */
class ApiVehicleEntity
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
     * @ORM\OneToMany(targetEntity="ApiVehicleModelsEntity", mappedBy="apiVehicles", cascade={"persist", "remove"})
     * @ORM\OrderBy({"model" = "ASC"})
     */
    private $models;

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
     * @param ApiVehicleModelsEntity $model
     * @return $this
     */
    public function addModel(ApiVehicleModelsEntity $model)
    {
        $this->models = $model;
        $model->setApiVehicles($this);

        return $this;
    }

    /**
     * Remove model
     *
     * @param ApiVehicleModelsEntity $model
     */
    public function removeModel(ApiVehicleModelsEntity $model)
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
