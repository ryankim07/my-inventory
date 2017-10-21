<?php

/**
 * Class Vehicles
 *
 * Service class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Service\Vehicles;

use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Vehicles\VehicleEntity;
use AppBundle\Service\Vehicles\Api\Manufacturers;
use AppBundle\Service\Helper\Assets;

class Vehicles
{
    private $em;
    private $repo;
    private $assetsService;
    private $mfgsService;
    private $fileUploader;
    private $mfg;
    private $entity;
    private $existingVehicle;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     * @param Manufacturers $mfgsService
     * @param Assets $assetsService
     */
    public function __construct(EntityManager $entityManager,
                                Manufacturers $mfgsService,
                                Assets $assetsService)
    {
        $this->em            = $entityManager;
        $this->repo          = $this->em->getRepository('AppBundle\Entity\Vehicles\VehicleEntity');
        $this->mfgsService   = $mfgsService;
        $this->assetsService = $assetsService;
    }

    /**
     * Get all vehicles
     *
     * @return mixed|string
     */
    public function findAll()
    {
        return $this->doSelect();
    }

    /**
     * Find specific vehicle
     *
     * @param $id
     * @return mixed|null|object|string
     */
    public function find($id = null)
    {
        return $this->doSelect($id);
    }

    /**
     * Query and add dependencies
     *
     * @param null $id
     * @return mixed|string
     */
    private function doSelect($id = null)
    {
        $results = !is_null($id) ? $this->repo->find($id) : $this->repo->findBy([], ['mfg' => 'ASC']);

        if (!is_null($id)) {
            $results = $this->addDependencies($results);
        }

        return $results;
    }

    /**
     * Add dependencies
     *
     * @param $results
     * @return mixed
     */
    private function addDependencies($results)
    {
        return $results;
    }

    /**
     * Save
     *
     * @param $data
     * @return array
     */
    public function save($data)
    {
        if (count($data) == 0) {
            return ['msg' => 'Vehicle information empty.'];
        }

        try {
            $this->existingVehicle = $this->findByIdOrVin($data['id'], $data['vin']);
            $this->entity          = $this->existingVehicle ? $this->existingVehicle : new VehicleEntity();

            $this->mfg = $this->mfgsService->find($data['mfg_id']);
            $models    = $this->mfg->getModels();

            foreach($models as $model) {
                $modelId   = $model->getModelId();
                $modelName = $model->getModel();

                if ($modelId == $data['model_id']) {
                    $data['model_info'] = [
                        'model_id' => $modelId,
                        'model'    => $modelName
                    ];
                    break;
                } else {
                    continue;
                }
            }

            if ($this->existingVehicle) {
                $data['mfg_id'] = $this->mfg->getId();
            }

            $op = !$this->existingVehicle ? 'added' : 'updated';
            $msg = "Vehicle successfully {$op}.";

            // Save or update vehicle
            if (!$this->_save($data)) {
                $msg = "Vehicle could not be {$op}.";
            };

            return [
                'vehicle' => $this->entity,
                'msg'     => $msg
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }

    /**
     * Save or update vehicle
     *
     * @param $data
     * @return bool
     */
    private function _save($data)
    {
        // Upload asset
        $assets        = $data['assets'];
        $assetFullPath = !is_null($assets) ? $this->fileUploader->upload($assets) : null;
        $assetsEntity  = $this->existingVehicle ?
            $this->em->getRepository('AppBundle\Entity\Vehicles\AssetsEntity')->findOneByVehicleId($this->entity->getId()) : new AssetsEntity();

        // Vehicle entity
        $this->entity->setMfgId($data['mfg_id']);
        $this->entity->setMfg($this->mfg->getMfg());
        $this->entity->setModelId($data['model_info']['model_id']);
        $this->entity->setModel($data['model_info']['model']);
        $this->entity->setYear($data['year']);
        $this->entity->setColor($data['color']);
        $this->entity->setVin($data['vin']);
        $this->entity->setPlate($data['plate']);

        // Assets entity
        $this->entity = $this->assetsService->save('AppBundle\Entity\Vehicles\AssetsEntity', $this->entity, $data['assets']);

        if (!$this->existingVehicle) {
            $this->em->persist($this->entity);
        }

        $this->em->flush();

        return true;
    }

    /**
     * Delete vehicle
     *
     * @param $id
     * @return array
     */
    public function delete($id)
    {
        if (!isset($id)) {
            return ['msg' => 'Empty ID for deleting vehicle.'];
        }

        try {
            $vehicle = $this->repo->find($id);
            $assets  = $vehicle->getAssets();

            foreach($assets as $asset) {
                if ($asset->getVehicleId() == $id) {
                    $this->fileUploader->removeUpload($asset->getPath());
                    $this->em->remove($asset);
                    break;
                } else {
                    continue;
                }
            }

            $this->em->remove($vehicle);
            $this->em->flush();

            return [
                'msg' => 'Vehicle successfully deleted.',
                'id'  => $id
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }

    /**
     * Find either by ID or VIN
     *
     * @param $id
     * @param $vin
     * @return VehicleEntity|null|object
     */
    private function findByIdOrVin($id, $vin)
    {
        $results = $this->repo->find($id);

        if (is_null($results)) {
            return $this->repo->findOneByVin($vin);
        }

        return $results;
    }
}