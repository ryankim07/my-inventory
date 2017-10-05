<?php

namespace AppBundle\Entity\Vehicles;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="api_vehicles_models")
 */
class ApiVehicleModelsEntity
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
    private $apiVehicleId;

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
     * @ORM\ManyToOne(targetEntity="ApiVehicleEntity", inversedBy="models")
     * @ORM\JoinColumn(name="api_vehicle_id", referencedColumnName="id")
     */
    private $apiVehicles;

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
     * Get API vehicle ID
     *
     * @return integer
     */
    public function getApiVehicleId()
    {
        return $this->apiVehicleId;
    }

    /**
     * Set API vehicle ID
     *
     * @param $apiVehicleId
     * @return $this
     */
    public function setApiVehicleId($apiVehicleId)
    {
        $this->apiVehicleId = $apiVehicleId;

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
     * Get apiVehicles
     *
     * @return mixed
     */
    public function getApiVehicles()
    {
        return $this->apiVehicles;
    }

    /**
     * Set apiVehicles
     *
     * @param ApiVehicleEntity|null $apiVehicles
     * @return $this
     */
    public function setApiVehicles(ApiVehicleEntity $apiVehicles = null)
    {
        $this->apiVehicles = $apiVehicles;

        return $this;
    }
}
