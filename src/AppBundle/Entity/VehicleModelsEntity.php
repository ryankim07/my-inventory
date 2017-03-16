<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="vehicle_models")
 */
class VehicleModelsEntity
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
     * Get manufacturer
     *
     * @return string
     */
    public function getModel()
    {
        return $this->model;
    }

    /**
     * Set manufacturer
     *
     * @param $model
     * @return $this
     */
    public function setModel($model)
    {
        $this->model = ucwords(strtolower($model));

        return $this;
    }
}