<?php

namespace AppBundle\Service\Vehicles;

use Doctrine\ORM\EntityManager;
use AppBundle\Entity\MyVehicleEntity;
use AppBundle\Service\Vehicles\Api\SyncDb;

class MyVehicles
{
    protected $em;
    protected $repo;
    protected $syncDb;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     * @param SyncDb $syncDb
     */
    public function __construct(EntityManager $entityManager, SyncDb $syncDb)
    {
        $this->em     = $entityManager;
        $this->repo   = $this->em->getRepository('AppBundle:MyVehicleEntity');
        $this->syncDb = $syncDb;
    }

    /**
     * Get all my vehicles
     *
     * @return array
     */
    public function getMyVehicles()
    {
        return $this->repo->findAll();
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

        $mfgId = $vehicle['mfg_id'];
        $year  = $vehicle['year'];
        $color = $vehicle['color'];
        $vin   = $vehicle['vin'];
        $plate = $vehicle['plate'];
        $existingVehicle = $this->repo->findOneByVin($vin);

        try {
            if (is_null($existingVehicle)) {
                $mfg    = $this->syncDb->find($mfgId);
                $models = $mfg->getModels();

                $modelName = '';
                foreach($models as $model) {
                    if ($model->getModelId() == (int)$vehicle['model_id']) {
                        $modelName = $model->getModel();
                        break;
                    }
                }

                $newVehicle = new MyVehicleEntity();
                $newVehicle->setMfgId($mfgId);
                $newVehicle->setMfg($mfg->getMfg());
                $newVehicle->setModel($modelName);
                $newVehicle->setYear($year);
                $newVehicle->setColor($color);
                $newVehicle->setVin($vin);
                $newVehicle->setPlate($plate);
                $this->em->persist($newVehicle);
                $this->em->flush();
            } else {
                $existingVehicle->setYear($year);
                $existingVehicle->setColor($color);
                $existingVehicle->setVin($vin);
                $existingVehicle->setPlate($plate);
                $this->em->flush();
                return 'Vehicle already exists, and has been updated.';
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
}