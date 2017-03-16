<?php
/**
 * Created by PhpStorm.
 * User: kimr234z
 * Date: 3/16/17
 * Time: 9:17 AM
 */

namespace AppBundle\Service\Vehicle\Api;

use Doctrine\ORM\EntityManager;
use AppBundle\Entity\VehicleMfgsEntity;
use AppBundle\Entity\VehicleModelsEntity;
use Symfony\Component\Config\Definition\Exception\Exception;

abstract class AbstractApi
{
    protected $em;
    public $mfgs;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     */
    public function __construct(EntityManager $entityManager)
    {
        $this->em   = $entityManager;
        $this->mfgs = $this->callApi();
    }

    /**
     * Get list of all manufacturers
     *
     * @return array
     */
    public function getMfgs()
    {
        return $this->mfgs;
    }

    /**
     * Sync manufacturers to DB
     *
     * @return bool
     */
    public function syncMfgs()
    {
        if (!isset($this->mfgs)) {
            return false;
        }

        try {
            foreach($this->mfgs as $mfg) {
                $mfgId       = $mfg['mfg_id'];
                $mfgName     = $mfg['mfg'];
                $existingMfg = $this->em->getRepository('AppBundle:VehicleMfgsEntity')->findOneByMfgId($mfgId);

                // Insert
                if (!$existingMfg) {
                    $mfgData = new VehicleMfgsEntity();
                    $mfgData->setMfgId($mfgId);
                    $mfgData->setMfg($mfgName);
                    $this->em->persist($mfgData);
                } else {
                    $existingMfg->setMfgId($mfgId);
                    $existingMfg->setMfg($mfgName);
                }

                $this->em->flush();
            }
        } catch (\Exception $e) {
            return 'Failed to sync vehicles manufacturers.';
        }

        return true;
    }

    /**
     * Sync models to DB
     *
     * @return bool
     */
    public function syncMfgModels()
    {
        if (!isset($this->mfgs)) {
            return false;
        }

        try {
            foreach ($this->mfgs as $mfg) {
                $mfgId = $mfg['mfg_id'];

                foreach ($mfg['models'] as $model) {
                    $modelId = $model['model_id'];
                    $modelName = $model['model'];
                    $existingModel = $this->em->getRepository('AppBundle:VehicleModelsEntity')->findOneBy(
                        array('modelId' => $modelId, 'model' => $modelName)
                    );

                    // Insert
                    if (!$existingModel) {
                        $modelData = new VehicleModelsEntity();
                        $modelData->setMfgId($mfgId);
                        $modelData->setModelId($modelId);
                        $modelData->setModel($modelName);
                        $this->em->persist($modelData);
                    } else {
                        $existingModel->setMfgId($mfgId);
                        $existingModel->setModelId($modelId);
                        $existingModel->setModel($modelName);
                    }

                    $this->em->flush();
                }
            }
        } catch (\Exception $e) {
            return 'Failed to sync vehicles models.';
        }

        return true;
    }
}