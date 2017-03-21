<?php
/**
 * Created by PhpStorm.
 * User: kimr234z
 * Date: 3/16/17
 * Time: 9:17 AM
 */

namespace AppBundle\Service\Vehicles\Api;

use Doctrine\ORM\EntityManager;
use AppBundle\Entity\VehicleMfgsApiEntity;
use AppBundle\Entity\VehicleModelsApiEntity;

abstract class SyncAbstract implements SyncInterface
{
    protected $em;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     */
    public function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
    }

    /**
     * Sync API manufacturers to DB
     *
     * @param $mfgs
     * @return bool|string
     */
    public function save($mfgs)
    {
        if (!isset($mfgs)) {
            return false;
        }

        try {
            foreach($this->mfgs as $mfg) {
                $mfgId       = $mfg['mfg_id'];
                $mfgName     = $mfg['mfg'];
                $existingMfg = $this->em->getRepository('AppBundle:VehicleMfgsApiEntity')->findOneByMfgId($mfgId);

                // Insert
                if (is_null($existingMfg)) {
                    $mfgData = new VehicleMfgsApiEntity();
                    $mfgData->setMfgId($mfgId);
                    $mfgData->setMfg($mfgName);

                    $this->em->persist($mfgData);
                    $this->em->flush();
                } else {
                    $existingMfg->setMfgId($mfgId);
                    $existingMfg->setMfg($mfgName);

                    $this->em->flush();
                }

                foreach ($mfg['models'] as $model) {
                    $modelId       = $model['model_id'];
                    $modelName     = $model['model'];
                    $existingModel = $this->em->getRepository('AppBundle:VehicleModelsApiEntity')->findOneBy(
                        array('modelId' => $modelId, 'model' => $modelName)
                    );

                    // Insert
                    if (!$existingModel) {
                        $modelData = new VehicleModelsApiEntity();
                        $modelData->setModelId($modelId);
                        $modelData->setModel($modelName);
                        $modelData->setManufacturers($mfgData);
                        $this->em->persist($modelData);
                    } else {
                        $existingModel->setModelId($modelId);
                        $existingModel->setModel($modelName);
                    }

                    $this->em->flush();
                }
            }
        } catch (\Exception $e) {
            return 'Failed to save vehicles manufacturers from external API.';
        }

        return true;
    }
}