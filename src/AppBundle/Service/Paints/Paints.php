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

use AppBundle\Entity\VendorsEntity;
use Doctrine\ORM\EntityManager;
use AppBundle\Entity\PaintsEntity;
use AppBundle\Entity\PropertyAssetsEntity;
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
        $this->repo          = $this->em->getRepository(PaintsEntity::class);
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

        if ($results) {
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
        $dependencies = [];

        if (is_array($results)) {
            foreach ($results as $paint) {
                $vendors = $paint->getVendors();

                foreach($vendors as $vendor) {
                    $paint->setVendor($vendor->getCompany());
                    $paint->setVendorId($vendor->getId());
                }

                $dependencies[] = $paint;
            }

            return $dependencies;
        } else {
            return $results;
        }
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
            return ['msg' => 'Empty Paint color information.'];
        }

        try {
            $this->existingPaint = $this->find($data['id']);

            $this->entity = $this->existingPaint ? $this->existingPaint : new PaintsEntity();

            $op = !$this->existingPaint ? 'added' : 'updated';
            $msg = "Paint color successfully {$op}.";

            // Save or update paint
            if (!$this->_save($data)) {
                $msg = "Paint color could not be {$op}.";
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
        $this->entity->setBrand($data['brand']);
        $this->entity->setName($data['name']);
        $this->entity->setNumber($data['number']);
        $this->entity->setColor($data['color']);
        $this->entity->setHex($data['hex']);
        $this->entity->setRgb($data['rgb']);
        $this->entity->setNotes($data['notes']);

        // Vendor entity
        if (!is_null($data['vendor'])) {
            $vendorEntity = !empty($data['vendor_id']) ?
                $this->em->getRepository(VendorsEntity::class)->find($data['vendor_id']) : new VendorsEntity();
            $vendorEntity->setCompany($data['vendor']);
            $this->entity->addVendor($vendorEntity);
        }

        // Assets entity
        $this->entity = $this->assetsService->save(PropertyAssetsEntity::class, $this->entity, $data);

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