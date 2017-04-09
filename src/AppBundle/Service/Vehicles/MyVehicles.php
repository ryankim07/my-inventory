<?php

namespace AppBundle\Service\Vehicles;

use Doctrine\ORM\EntityManager;
use AppBundle\Entity\MyVehicleEntity;
use AppBundle\Entity\AssetsEntity;
use AppBundle\Service\Vehicles\Api\SyncDb;
use AppBundle\Service\FileUploader;

class MyVehicles
{
    protected $em;
    protected $repo;
    protected $syncDb;
    protected $fileUploader;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     * @param SyncDb $syncDb
     * @param FileUploader $fileUploader
     */
    public function __construct(EntityManager $entityManager, SyncDb $syncDb, FileUploader $fileUploader)
    {
        $this->em           = $entityManager;
        $this->repo         = $this->em->getRepository('AppBundle:MyVehicleEntity');
        $this->syncDb       = $syncDb;
        $this->fileUploader = $fileUploader;
    }

    /**
     * Get all my vehicles
     *
     * @return mixed|string
     */
    public function findAll()
    {
        return $this->doSelect();
    }

    /**
     * Find my specific vehicle
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

        if (count($results) == 0) {
            return ['msg' => 'No vehicles found.'];
        }

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
     * Save or update  my new vehicle
     *
     * @param $vehicle
     * @return array
     */
    public function save($vehicle)
    {
        if (count($vehicle) == 0) {
            return ['msg' => 'Empty new vehicle information.'];
        }

        try {
            $paramId         = (int)$vehicle['id'];
            $paramMfgId      = (int)$vehicle['mfg_id'];
            $paramModelId    = (int)$vehicle['model_id'];
            $paramYear       = $vehicle['year'];
            $paramColor      = $vehicle['color'];
            $paramVin        = $vehicle['vin'];
            $paramPlate      = $vehicle['plate'];
            $assets           = $vehicle['assets'];
            $existingVehicle = $this->findByIdOrVin($paramId, $paramVin);

            $mfg    = $this->syncDb->find($paramMfgId);
            $models = $mfg->getModels();

            $modelInfo = [];
            foreach($models as $model) {
                $modelId = $model->getModelId();
                $modelName = $model->getModel();

                if ($modelId == $paramModelId) {
                    $modelInfo = [
                        'model_id' => $modelId,
                        'model' => $modelName
                    ];
                    break;
                } else {
                    continue;
                }
            }

            if (is_null($existingVehicle)) {
                // Save new my vehicle
                $newVehicle = new MyVehicleEntity();
                $newVehicle->setMfgId($paramMfgId);
                $newVehicle->setMfg($mfg->getMfg());
                $newVehicle->setModelId($modelInfo['model_id']);
                $newVehicle->setModel($modelInfo['model']);
                $newVehicle->setYear($paramYear);
                $newVehicle->setColor($paramColor);
                $newVehicle->setVin($paramVin);
                $newVehicle->setPlate($paramPlate);

                $this->em->persist($newVehicle);
                $this->em->flush();

                // Upload file and save new asset
                if (!is_null($assets)) {
                    $assetFullPath = $this->fileUploader->upload($assets);
                    $assetEntity = new AssetsEntity();
                    $assetEntity->setMyVehicles($newVehicle);
                    $assetEntity->setName($assets->getClientOriginalName());
                    $assetEntity->setPath($assetFullPath);

                    $this->em->persist($assetEntity);
                    $this->em->flush();
                }

                return [
                    'vehicle' => $newVehicle,
                    'msg'     => 'Vehicle successfully added.'
                ];
            } else {
                // Update existing my vehicle
                $existingVehicle->setMfgId($mfg->getId());
                $existingVehicle->setMfg($mfg->getMfg());
                $existingVehicle->setModelId($modelInfo['model_id']);
                $existingVehicle->setModel($modelInfo['model']);
                $existingVehicle->setYear($paramYear);
                $existingVehicle->setColor($paramColor);
                $existingVehicle->setVin($paramVin);
                $existingVehicle->setPlate($paramPlate);

                $this->em->flush();

                if (!is_null($assets)) {
                    // Upload file
                    $assetFullPath = $this->fileUploader->upload($assets);

                    // Insert or update existing path for updated image
                    $existingAsset = $this->em->getRepository('AppBundle:AssetsEntity')->findOneByMyVehicleId($existingVehicle->getId());

                    if (!$existingAsset) {
                        $assetEntity = new AssetsEntity();
                        $assetEntity->setMyVehicles($existingVehicle->getId());
                        $assetEntity->setName($assets->getClientOriginalName());
                        $assetEntity->setPath($assetFullPath);

                        $this->em->persist($assetEntity);
                        $this->em->flush();
                    } else {
                        // Remove existing upload
                        $this->fileUploader->removeUpload($existingAsset->getPath());

                        $existingAsset->setName($assets->getClientOriginalName());
                        $existingAsset->setPath($assetFullPath);
                        $this->em->flush();
                    }
                }

                return [
                    'msg'     => 'Vehicle successfully updated.',
                    'vehicle' => $existingVehicle
                ];
            }
        } catch(\Exception $e) {
            return ['msg' => $e->getMessage()];
        }
    }

    /**
     * Delete my vehicle
     *
     * @param $id
     * @return array
     */
    public function delete($id)
    {
        if (!isset($id)) {
            return ['msg' => 'Empty ID for vehicle removal.'];
        }

        try {
            $vehicle = $this->repo->find($id);
            $assets = $vehicle->getAssets();

            foreach($assets as $asset) {
                if ($asset->getMyVehicleId() == $id) {
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
                'msg'     => 'Vehicle successfully deleted.',
                'vehicle' => $id
            ];
        } catch(\Exception $e) {
            return ['msg' => $e->getMessage()];
        }
    }

    /**
     * Find either by ID or VIN
     *
     * @param $id
     * @param $vin
     * @return MyVehicleEntity|null|object
     */
    public function findByIdOrVin($id, $vin)
    {
        $results = $this->repo->find($id);

        if (is_null($results)) {
            return $this->repo->findOneByVin($vin);
        }

        return $results;
    }
}