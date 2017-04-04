<?php

namespace AppBundle\Service;

use Doctrine\ORM\EntityManager;
use AppBundle\Entity\AssetsEntity;

class Assets
{
    private $uploadDir;
    protected $em;
    protected $repo;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     * @param $uploadDir
     */
    public function __construct(EntityManager $entityManager, $uploadDir)
    {
        $this->em        = $entityManager;
        $this->repo      = $this->em->getRepository('AppBundle:AssetsEntity');
        $this->uploadDir = $uploadDir;
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
                $asset->setPath($file->getPathName());
                $asset->setName($file->getClientOriginalName());
                $asset->setUploadDir($this->uploadDir);
                $asset->upload();

                $this->em->persist($asset);
                $this->em->flush();
            } else {
                $existingAsset->setFile($file);
                $existingAsset->setPath($file->getPathName());
                $existingAsset->setName($file->getClientOriginalName());
                $existingAsset->setUploadDir($this->uploadDir);
                $existingAsset->upload();

                $this->em->flush();
            }
        } catch(\Exception $e) {
            return 'Failed to save new asset.';
        }

        return true;
    }
}