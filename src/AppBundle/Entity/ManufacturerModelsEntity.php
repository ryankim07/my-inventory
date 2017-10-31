<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="vehicles.manufacturer_models")
 */
class ManufacturerModelsEntity
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
     * @ORM\Column(type="integer")
     * @Assert\NotBlank()
     */
    private $modelId;

    /**
     * @ORM\Column(type="string", length=30)
     * @Assert\NotBlank()
     */
    private $model;

    /**
     * @ORM\ManyToOne(targetEntity="ManufacturersEntity", inversedBy="models")
     * @ORM\JoinColumn(name="mfg_id", referencedColumnName="id")
     */
    private $manufacturers;

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
     * Get model ID
     *
     * @return integer
     */
    public function getModelId()
    {
        return $this->modelId;
    }

    /**
     * Set model ID
     *
     * @param $modelId
     * @return $this
     */
    public function setModelId($modelId)
    {
        $this->modelId = $modelId;

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
     * Set model
     *
     * @param $model
     * @return $this
     */
    public function setModel($model)
    {
        $this->model = ucwords(strtolower($model));

        return $this;
    }

    /**
     * Get manufacturers
     *
     * @return mixed
     */
    public function getManufacturers()
    {
        return $this->manufacturers;
    }

    /**
     * Set manufacturers
     *
     * @param ManufacturersEntity|null $manufacturers
     * @return $this
     */
    public function setManufacturers(ManufacturersEntity $manufacturers = null)
    {
        $this->manufacturers = $manufacturers;

        return $this;
    }
}
