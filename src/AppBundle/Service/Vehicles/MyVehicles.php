<?php

namespace AppBundle\Service\Vehicles;

use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Vehicles\MyVehicleEntity;
use AppBundle\Entity\Vehicles\AssetsEntity;
use AppBundle\Service\Vehicles\Api\SyncDb;
use AppBundle\Service\FileUploader;

class MyVehicles
{
    protected $em;
    protected $repo;
    protected $syncDb;
    protected $fileUploader;
    private $modelInfo = [];
    private $mfgId ;
    private $modelId;
    private $year;
    private $color;
    private $vin;
    private $plate;
    private $assets;
    private $mfg;
    private $vehicle;
    private $existingVehicle;

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
        $this->repo         = $this->em->getRepository('AppBundle\Entity\Vehicles\MyVehicleEntity');
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
            $id            = (int)$data['id'];
            $this->mfgId   = (int)$data['mfg_id'];
            $this->modelId = (int)$data['model_id'];
            $this->year    = $data['year'];
            $this->color   = $data['color'];
            $this->vin     = $data['vin'];
            $this->plate   = $data['plate'];
            $this->assets  = $data['assets'];

            $this->existingVehicle = $this->findByIdOrVin($id, $this->vin);

            $this->mfg = $this->syncDb->find($this->mfgId);
            $models    = $this->mfg->getModels();

            foreach($models as $model) {
                $modelId   = $model->getModelId();
                $modelName = $model->getModel();

                if ($modelId == $this->modelId) {
                    $this->modelInfo = [
                        'model_id' => $modelId,
                        'model'    => $modelName
                    ];
                    break;
                } else {
                    continue;
                }
            }

            if ($this->existingVehicle) {
                $this->mfgId = $this->mfg->getId();
            }

            // Save or update vehicle
            $this->_saveVehicle();

            // Save or update image
            if (!is_null($this->assets)) {
                $this->_saveImage();
            }

            $msg = !$this->existingVehicle ? 'added' : 'updated';

            return [
                'vehicle' => $this->vehicle,
                'msg'     => "Vehicle successfully {$msg}."
            ];
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
            $assets  = $vehicle->getAssets();

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
                'msg' => 'Vehicle successfully deleted.',
                'id'  => $id
            ];
        } catch(\Exception $e) {
            return ['msg' => $e->getMessage()];
        }
    }

    /**
     * Save or update vehicle
     *
     * @return bool
     */
    private function _saveVehicle()
    {
        if (!$this->existingVehicle) {
            $this->vehicle = new MyVehicleEntity();
        }

        $this->vehicle->setMfgId($this->mfgId);
        $this->vehicle->setMfg($this->mfg->getMfg());
        $this->vehicle->setModelId($this->modelInfo['model_id']);
        $this->vehicle->setModel($this->modelInfo['model']);
        $this->vehicle->setYear($this->year);
        $this->vehicle->setColor($this->color);
        $this->vehicle->setVin($this->vin);
        $this->vehicle->setPlate($this->plate);

        if (!$this->existingVehicle) {
            $this->em->persist($this->vehicle);
        }

        $this->em->flush();

        return true;
    }

    /**
     * Save or update image
     *
     * @return bool
     */
    private function _saveImage()
    {
        // Upload file
        $assetFullPath = $this->fileUploader->upload($this->assets);

        $existingAsset = false;
        $assetEntity   = new AssetsEntity();

        if (!$this->existingVehicle) {
            $assetEntity->setMyVehicles($this->vehicle);

        } else {
            // Insert or update existing path for updated image
            $existingAsset = $this->em->getRepository('AppBundle\Entity\Vehicles\AssetsEntity')->findOneByMyVehicleId($this->vehicle->getId());

            if (!$existingAsset) {
                $assetEntity->setMyVehicles($this->vehicle->getId());
            } else {
                // Remove existing upload
                $this->fileUploader->removeUpload($existingAsset->getPath());
            }
        }

        $assetEntity->setName($$this->assets->getClientOriginalName());
        $assetEntity->setPath($assetFullPath);

        if (!$existingAsset) {
            $this->em->persist($assetEntity);
        }

        $this->em->flush();

        return true;
    }

    /**
     * Find either by ID or VIN
     *
     * @param $id
     * @param $vin
     * @return MyVehicleEntity|null|object
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