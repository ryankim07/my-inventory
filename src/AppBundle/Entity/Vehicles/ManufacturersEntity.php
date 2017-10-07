<?php

namespace AppBundle\Entity\Vehicles;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity(repositoryClass="AppBundle\Repository\Vehicles\Api\VehiclesRepository")
 * @ORM\Table(name="manufacturers")
 */
class ManufacturersEntity
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
    private $nhtsaId;

    /**
     * @ORM\Column(type="string", length=30)
     * @Assert\NotBlank()
     */
    private $mfg;

    /**
     * @ORM\OneToMany(targetEntity="ManufacturerModelsEntity", mappedBy="manufacturers", cascade={"persist", "remove"})
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
     * Get nhtsa ID
     *
     * @return integer
     */
    public function getNhtsaId()
    {
        return $this->nhtsaId;
    }

    /**
     * Set nhtsa ID
     *
     * @param $nhtsaId
     * @return $this
     */
    public function setNhtsaId($nhtsaId)
    {
        $this->nhtsaId = $nhtsaId;

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
     * @param ManufacturerModelsEntity $model
     * @return $this
     */
    public function addModel(ManufacturerModelsEntity $model)
    {
        $this->models = $model;
        $model->setManufacturers($this);

        return $this;
    }

    /**
     * Remove model
     *
     * @param ManufacturerModelsEntity $model
     */
    public function removeModel(ManufacturerModelsEntity $model)
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
