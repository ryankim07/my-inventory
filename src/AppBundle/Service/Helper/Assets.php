<?php

/**
 * Class Assets
 *
 * Service class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Service\Helper;

use AppBundle\Service\Utils\FileUploader;

class Assets
{
    private $fileUploader;

    /**
     * Constructor
     *
     * @param FileUploader $fileUploader
     */
    public function __construct(FileUploader $fileUploader)
    {
        $this->fileUploader = $fileUploader;
    }

    /**
     * Save or update entity
     *
     * @param $class - The class name of the asset object
     * @param $entity - the object where the asset is being saved
     * @param $data - the values of the asset object
     * @return array
     */
    public function save($class, $entity, $data)
    {
        try {
            if (!is_null($data)) {
                $entity->removeAllAssets();

                foreach ($data as $asset) {
                    // Upload asset
                    $assetFullPath = $this->fileUploader->upload($asset);

                    $assetsEntity = new $class();
                    $assetsEntity->setName($asset->getClientOriginalName());
                    $assetsEntity->setPath($assetFullPath);
                    $entity->addAsset($assetsEntity);
                }
            }

            return $entity;
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }
}