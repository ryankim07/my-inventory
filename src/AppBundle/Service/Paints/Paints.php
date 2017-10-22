<?php

/**
 * Class Paints
 *
 * Service class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Service\Paints;

use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Paints\PaintsEntity;
use AppBundle\Service\Helper\Assets;

class Paints
{
    private $em;
    private $repo;
    private $assetsService;
    private $entity;
    private $existingPaint;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     * @param Assets $assetsService
     */
    public function __construct(EntityManager $entityManager,
                                Assets $assetsService)
    {
        $this->em            = $entityManager;
        $this->repo          = $this->em->getRepository('AppBundle\Entity\Paints\PaintsEntity');
        $this->assetsService = $assetsService;
    }

    /**
     * Get all paints
     *
     * @return mixed|string
     */
    public function findAll()
    {
        return $this->doSelect();
    }

    /**
     * Find specific paint
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
        $results = !is_null($id) ? $this->repo->find($id) : $this->repo->findBy([], ['name' => 'DESC']);

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
            return ['msg' => 'Paint information empty.'];
        }

        try {
            $this->existingPaint = $this->find($data['id']);

            $this->entity = $this->existingPaint ? $this->existingPaint : new PaintsEntity();

            $op = !$this->existingPaint ? 'added' : 'updated';
            $msg = "Paint successfully {$op}.";

            // Save or update paint
            if (!$this->_save($data)) {
                $msg = "Paint could not be {$op}.";
            };

            return [
                'paint' => $this->entity,
                'msg'   => $msg
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }

    /**
     * Save or update paint
     *
     * @param $data
     * @return bool
     */
    private function _save($data)
    {
        // Paint entity
        $this->entity->setVendorId($data['vendor_id']);
        $this->entity->setBrand($data['brand']);
        $this->entity->setName($data['name']);
        $this->entity->setNumber($data['number']);
        $this->entity->setColor($data['color']);
        $this->entity->setHex($data['hex']);
        $this->entity->setRgb($data['rgb']);
        $this->entity->setNotes($data['notes']);

        // Assets entity
        $this->entity = $this->assetsService->save('AppBundle\Entity\Properties\PropertyAssetsEntity', $this->entity, $data['assets']);

        if (!$this->existingPaint) {
            $this->em->persist($this->entity);
        }

        $this->em->flush();

        return true;
    }

    /**
     * Delete paint
     *
     * @param $id
     * @return array
     */
    public function delete($id)
    {
        if (!isset($id)) {
            return ['msg' => 'Empty ID for deleting paint.'];
        }

        try {
            $paint  = $this->repo->find($id);
            $assets = $paint->getAssets();

            // Delete assets
            if ($assets->count() > 0) {
                foreach ($assets as $asset) {
                    $this->assetsService->remove($asset->getPath());
                    $paint->removeAsset($asset);
                }
            }

            // Remove paint
            $this->em->remove($paint);
            $this->em->flush();

            return [
                'msg' => 'Paint color successfully deleted.',
                'id'  => $id
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }
}