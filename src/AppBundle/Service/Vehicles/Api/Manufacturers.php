<?php

/**
 * Class Manufacturers
 *
 * Service class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Service\Vehicles\Api;

use Doctrine\ORM\EntityManager;
use AppBundle\Entity\ManufacturersEntity;
use AppBundle\Entity\ManufacturerModelsEntity;

class Manufacturers
{
    protected $em;
    protected $repo;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     */
    public function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
        $this->repo = $this->em->getRepository('AppBundle\Entity\Vehicles\ManufacturersEntity');
    }

    /**
     * Find all manufacturers and associated models
     *
     * @return mixed|string
     */
    public function findAll()
    {
        return $this->doSelect();
    }

    /**
     * Find specific manufacturer and models
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
     * Save synced API vehicles to DB
     *
     * @param $mfgs
     * @return array
     */
    public function save($mfgs)
    {
        try {
            if (count($mfgs) == 0) {
                return ['msg' => 'Api vehicles information empty.'];
            }

            $entity = '';
            $msg    = '';

            foreach($mfgs as $mfg) {
                $nhtsaId      = $mfg['nhtsa_id'];
                $mfgName      = $mfg['mfg'];
                $existingMfgs = $this->repo->findOneByNhtsaId($nhtsaId);
                $entity       = $existingMfgs ? $existingMfgs : new ManufacturersEntity();

                $op   = !$existingMfgs ? 'added' : 'updated';
                $msg .= "Api vehicle successfully {$op}.";

                // Set api manufacturers
                $entity->setNhtsaId($nhtsaId);
                $entity->setMfg($mfgName);

                // Set each manufacturer's models
                foreach ($mfg['models'] as $model) {
                    $modelId       = $model['model_id'];
                    $modelName     = $model['model'];
                    $existingModel = $this->em->getRepository('AppBundle\Entity\Vehicles\ManufacturerModelsEntity')->findOneBy(
                        array('modelId' => $modelId, 'model' => $modelName)
                    );

                    $modelEntity = $existingModel ? $existingModel : new ManufacturerModelsEntity();
                    $modelEntity->setApiVehicleId($entity->getId());
                    $modelEntity->setModelId($modelId);
                    $modelEntity->setModel($modelName);
                    $entity->addModel($modelEntity);
                }

                if (!$existingMfgs) {
                    $this->em->persist($entity);
                }

                $this->em->flush();

                // Save or update property
                if (!$entity) {
                    $msg .= "{$mfgName} could not be {$op}.";
                };
            }
        } catch (\Exception $e) {
            return ['err_msg' => 'Failed to save manufacturers from external API.'];
        }

        return [
            'manufacturers' => $entity,
            'msg'           => $msg
        ];
    }
}