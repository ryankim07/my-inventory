<?php
/**
 * Created by PhpStorm.
 * User: kimr234z
 * Date: 2/21/17
 * Time: 10:28 AM
 */

namespace AppBundle\Service\Properties;

use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Properties\PropertyEntity;
use AppBundle\Entity\Properties\PropertyAssetsEntity;
use AppBundle\Service\FileUploader;

class Properties
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
        $this->repo         = $this->em->getRepository('AppBundle\Entity\Properties\PropertyEntity');
        $this->fileUploader = $fileUploader;
    }

    /**
     * Get all my properties
     *
     * @return mixed|string
     */
    public function findAll()
    {
        return $this->doSelect();
    }

    /**
     * Find my specific property
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
        $results = !is_null($id) ? $this->repo->find($id) : $this->repo->findBy([], ['built' => 'ASC']);

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
     * Save or update property
     *
     * @param $property
     * @return array
     */
    public function save($property)
    {
        if (count($property) == 0) {
            return ['msg' => 'New property information empty.'];
        }

        try {
            $id             = (int)$property['id'];
            $built          = $property['built'];
            $style          = $property['style'];
            $beds           = $property['beds'];
            $baths          = $property['baths'];
            $floors         = $property['floors'];
            $finishedArea   = $property['finished_area'];
            $unfinishedArea = $property['unfinished_area'];
            $totalArea      = $property['total_area'];
            $parcelNumber   = $property['parcel_number'];
            $assets         = $property['assets'];

            $existingProperty = $this->find($id);

            if (!$existingProperty) {
                // Save new property
                $newProperty = new PropertyEntity();
                $newProperty->setBuilt($built);
                $newProperty->setStyle($style);
                $newProperty->setBeds($beds);
                $newProperty->setBaths($baths);
                $newProperty->setFloors($floors);
                $newProperty->setFinishedArea($finishedArea);
                $newProperty->setUnfinishedArea($unfinishedArea);
                $newProperty->setTotalArea($totalArea);
                $newProperty->setParcelNumber($parcelNumber);

                $this->em->persist($newProperty);
                $this->em->flush();

                // Upload file and save new asset
                if (!is_null($assets)) {
                    $this->saveImage($assets, $newProperty, "new");
                }

                return [
                    'property' => $newProperty,
                    'msg'      => 'Property successfully added.'
                ];
            } else {
                // Update existing property
                $existingProperty->setBuilt($built);
                $existingProperty->setStyle($style);
                $existingProperty->setBeds($beds);
                $existingProperty->setBaths($baths);
                $existingProperty->setFloors($floors);
                $existingProperty->setFinishedArea($finishedArea);
                $existingProperty->setUnfinishedArea($unfinishedArea);
                $existingProperty->setTotalArea($totalArea);
                $existingProperty->setParcelNumber($parcelNumber);

                $this->em->flush();

                if (!is_null($assets)) {
                    $this->saveImage($assets, $existingProperty, "update");
                }

                return [
                    'property' => $existingProperty,
                    'msg'      => 'Property successfully updated.'
                ];
            }
        } catch(\Exception $e) {
            return ['msg' => $e->getMessage()];
        }
    }

    /**
     * Delete property
     *
     * @param $id
     * @return array
     */
    public function delete($id)
    {
        if (!isset($id)) {
            return ['msg' => 'Empty ID for property removal.'];
        }

        try {
            $property = $this->repo->find($id);
            $assets = $property->getAssets();

            foreach($assets as $asset) {
                if ($asset->getPropertyId() == $id) {
                    $this->fileUploader->removeUpload($asset->getPath());
                    $this->em->remove($asset);
                    break;
                } else {
                    continue;
                }
            }

            $this->em->remove($property);
            $this->em->flush();

            return [
                'msg' => 'Property successfully deleted.',
                'id'  => $id
            ];
        } catch(\Exception $e) {
            return ['msg' => $e->getMessage()];
        }
    }

    /**
     * Save Image
     *
     * @param $assets
     * @param $entity
     * @param $mode
     * @return bool
     */
    private function saveImage($assets, $entity, $mode)
    {
        // Upload file
        $assetFullPath = $this->fileUploader->upload($assets);

        $existingAsset = false;
        $assetEntity   = new PropertyAssetsEntity();

        if ($mode == "new") {
            $assetEntity->setProperties($entity);

        } else {
            // Insert or update existing path for updated image
            $existingAsset = $this->em->getRepository('AppBundle\Entity\Properties\PropertyAssetsEntity')->findOneByPropertyId($entity->getId());

            if (!$existingAsset) {
                $assetEntity->setProperties($entity->getId());
            } else {
                // Remove existing upload
                $this->fileUploader->removeUpload($existingAsset->getPath());
            }
        }

        $assetEntity->setName($assets->getClientOriginalName());
        $assetEntity->setPath($assetFullPath);

        if (!$existingAsset) {
            $this->em->persist($assetEntity);
        }

        $this->em->flush();

        return true;
    }
}