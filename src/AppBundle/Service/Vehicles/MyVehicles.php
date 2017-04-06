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
            return false;
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
     * Save my new vehicle
     *
     * @param $vehicle
     * @return bool|string
     */
    public function save($vehicle)
    {
        if (count($vehicle) == 0) {
            return 'Empty new vehicle information.';
        }

        try {
            $paramId         = (int)$vehicle['id'];
            $paramMfgId      = (int)$vehicle['mfg_id'];
            $paramModelId    = (int)$vehicle['model_id'];
            $paramYear       = $vehicle['year'];
            $paramColor      = $vehicle['color'];
            $paramVin        = $vehicle['vin'];
            $paramPlate      = $vehicle['plate'];
            $image           = $vehicle['asset'];
            $existingVehicle = $this->findByIdOrVin($paramId, $paramVin);

            if (is_null($existingVehicle)) {
                // Save new my vehicle
                $mfg    = $this->syncDb->find($paramMfgId);
                $models = $mfg->getModels();

                foreach($models as $model) {
                    $modelId = $model->getModelId();

                    if ($modelId == $paramModelId) {
                        $modelName = $model->getModel();
                        $newVehicle = new MyVehicleEntity();
                        $newVehicle->setMfgId($paramMfgId);
                        $newVehicle->setMfg($mfg->getMfg());
                        $newVehicle->setModelId($modelId);
                        $newVehicle->setModel($modelName);
                        $newVehicle->setYear($paramYear);
                        $newVehicle->setColor($paramColor);
                        $newVehicle->setVin($paramVin);
                        $newVehicle->setPlate($paramPlate);
                        break;
                    } else {
                        continue;
                    }
                }

                $this->em->persist($newVehicle);
                $this->em->flush();

                // Upload file and save new asset
                if (!is_null($image)) {
                    $assetFullPath = $this->fileUploader->upload($image);
                    $assetEntity = new AssetsEntity();
                    $assetEntity->setMyVehicles($newVehicle);
                    $assetEntity->setName($image->getClientOriginalName());
                    $assetEntity->setPath($assetFullPath);

                    $this->em->persist($assetEntity);
                    $this->em->flush();
                }
            } else {
                // Update existing my vehicle
                $existingVehicle->setYear($paramYear);
                $existingVehicle->setColor($paramColor);
                $existingVehicle->setVin($paramVin);
                $existingVehicle->setPlate($paramPlate);

                $this->em->flush();

                if (!is_null($image)) {
                    // Upload file
                    $assetFullPath = $this->fileUploader->upload($image);

                    // Insert or update existing path for updated image
                    $existingAsset = $this->em->getRepository('AppBundle:AssetsEntity')->findOneByMyVehicleId($existingVehicle->getId());

                    if (!$existingAsset) {
                        $assetEntity = new AssetsEntity();
                        $assetEntity->setMyVehicles($existingVehicle->getId());
                        $assetEntity->setName($image->getClientOriginalName());
                        $assetEntity->setPath($assetFullPath);

                        $this->em->persist($assetEntity);
                        $this->em->flush();
                    } else {
                        //@TODO Remove existing image
                        $currentPath = $existingAsset->getPath();
                        // $this->fileUploader->removeCurrentAsset($currentPath);

                        $existingAsset->setPath($assetFullPath);
                        $this->em->flush();

                        return 'Vehicle already exists, and has been updated.';
                    }
                }
            }
        } catch(\Exception $e) {
            return 'Failed to save new vehicle information.';
        }

        return true;
    }

    /**
     * Delete my vehicle
     *
     * @param $id
     * @return bool|string
     */
    public function delete($id)
    {
        if (!isset($id)) {
            return 'Empty ID for vehicle removal.';
        }

        try {
            $results = $this->repo->find($id);
            $this->em->remove($results);
            $this->em->flush();
        } catch(\Exception $e) {
            return 'Vehicle not found.';
        }

        return true;
    }

    /**
     * Find either by ID or VIN
     *
     * @param $id
     * @param $vin
     * @return null|object
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