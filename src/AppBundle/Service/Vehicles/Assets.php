<?php

/**
 * Class Assets
 *
 * Service class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Service\Vehicles;

use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Vehicles\AssetsEntity;
use AppBundle\Service\FileUploader;

class Assets
{
    protected $em;
    protected $repo;
    protected $fileUploader;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     * @param FileUploader $fileUploader
     */
    public function __construct(EntityManager $entityManager, FileUploader $fileUploader)
    {
        $this->em           = $entityManager;
        $this->repo         = $this->em->getRepository('AppBundle\Entity\Vehicles\AssetsEntity');
        $this->fileUploader = $fileUploader;
    }

    /**
     * Save asset
     *
     * @param $file
     * @return bool|string
     */
    public function save($file)
    {
        if (!isset($file)) {
            return false;
        }

        $existingAsset = $this->repo->findOneByName($file->getClientOriginalName());

        try {

            if (is_null($existingAsset)) {
                $asset = new AssetsEntity();
                $asset->setFile($file);
                $asset->setVehicleId(null);
                $asset->setPath($file->getPathName());
                $asset->setName($file->getClientOriginalName());
                //$asset->setUploadDir($this->fileUploader->uploadDir);
                $asset->upload();

                $this->em->persist($asset);
                $this->em->flush();
            } else {
                $existingAsset->setFile($file);
                $existingAsset->setPath($file->getPathName());
                $existingAsset->setName($file->getClientOriginalName());
                //$existingAsset->setUploadDir($this->fileUploader->uploadDir);
                $existingAsset->upload();

                $this->em->flush();
            }
        } catch(\Exception $e) {
            return 'Failed to save new asset.';
        }

        return true;
    }
}