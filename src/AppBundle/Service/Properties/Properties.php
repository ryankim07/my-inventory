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
use AppBundle\Entity\Properties\AddressEntity;
use AppBundle\Entity\Properties\FeaturesEntity;
use AppBundle\Entity\Properties\ExteriorFeaturesEntity;
use AppBundle\Entity\Properties\InteriorFeaturesEntity;
use AppBundle\Entity\Properties\PropertyAssetsEntity;
use AppBundle\Service\FileUploader;

class Properties
{
    private $em;
    private $repo;
    private $fileUploader;
    private $built;
    private $style;
    private $beds;
    private $baths;
    private $floors;
    private $finishedArea;
    private $unfinishedArea;
    private $totalArea;
    private $parcelNumber;
    private $address;
    private $assets;
    private $features;
    private $exteriorFeatures;
    private $interiorFeatures;
    private $entity;
    private $existingProperty;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     * @param FileUploader $fileUploader
     */
    public function __construct(EntityManager $entityManager,
                                FileUploader $fileUploader)
    {
        $this->em           = $entityManager;
        $this->repo         = $this->em->getRepository('AppBundle\Entity\Properties\PropertyEntity');
        $this->fileUploader = $fileUploader;
    }

    /**
     * Get all properties
     *
     * @return mixed|string
     */
    public function findAll()
    {
        return $this->doSelect();
    }

    /**
     * Find specific property
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
        $results = !is_null($id) ? $this->repo->find($id) : $this->repo->findBy([], ['built' => 'DESC']);

        $results = $this->addDependencies($results);

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
            return ['msg' => 'Property information empty.'];
        }

        try {
            $id                     = (int)$data['id'];
            $this->built            = $data['built'];
            $this->style            = $data['style'];
            $this->floors           = (int)$data['floors'];
            $this->beds             = (int)$data['beds'];
            $this->baths            = $data['baths'];
            $this->finishedArea     = $data['finished_area'];
            $this->unfinishedArea   = $data['unfinished_area'];
            $this->totalArea        = $data['total_area'];
            $this->parcelNumber     = $data['parcel_number'];
            $this->address          = $data['address'];
            $this->assets           = $data['assets'];
            $this->features         = $data['features'];
            $this->exteriorFeatures = $data['exterior_features'];
            $this->interiorFeatures = $data['interior_features'];

            $this->existingProperty = $this->find($id);

            if ($this->existingProperty) {
                $this->entity = $this->existingProperty;
            }

            $op = !$this->existingProperty ? 'added' : 'updated';
            $msg = "Property successfully {$op}.";

            // Save or update property
            if (!$this->_saveProperty()) {
                $msg = "Property could not be {$op}.";
            };

            return [
                'property' => $this->entity,
                'msg'      => $msg
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
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
            return ['msg' => 'Empty ID for deleting property.'];
        }

        try {
            $property = $this->repo->find($id);
            //$address  = $property->getAddress();
            $assets   = $property->getAssets();

            foreach($assets as $asset) {
                if ($asset->getPropertyId() == $id) {
                    $this->fileUploader->removeUpload($asset->getPath());
                    $this->em->remove($asset);
                    break;
                } else {
                    continue;
                }
            }

            //$property->setAddress(null);
            $this->em->remove($property);
            $this->em->flush();

            return [
                'msg' => 'Property successfully deleted.',
                'id'  => $id
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }

    /**
     * Save or update property
     *
     * @return bool
     */
    private function _saveProperty()
    {
        // Upload asset
        $assetFullPath = !is_null($this->assets) ? $this->fileUploader->upload($this->assets) : null;

        if (!$this->existingProperty) {
            $this->entity           = new PropertyEntity();
            $addressEntity          = new AddressEntity();
            $assetEntity            = new PropertyAssetsEntity();
            $featuresEntity         = new FeaturesEntity();
            $exteriorFeaturesEntity = new ExteriorFeaturesEntity();
            $interiorFeaturesEntity = new InteriorFeaturesEntity();
        } else {
            $assetEntity            = $this->em->getRepository('AppBundle\Entity\Properties\PropertyAssetsEntity')->findByPropertyId($this->entity->getId());
            $addressEntity          = $this->em->getRepository('AppBundle\Entity\Properties\AddressEntity')->findOneByPropertyId($this->entity->getId());
            $exteriorFeaturesEntity = $this->em->getRepository('AppBundle\Entity\Properties\ExteriorFeaturesEntity')->findOneByPropertyId($this->entity->getId());
            $featuresEntity         = $this->em->getRepository('AppBundle\Entity\Properties\FeaturesEntity')->findOneByPropertyId($this->entity->getId());
            $interiorFeaturesEntity = $this->em->getRepository('AppBundle\Entity\Properties\InteriorFeaturesEntity')->findOneByPropertyId($this->entity->getId());
        }

        // Existing property but new features
        if (is_null($featuresEntity)) {
            $featuresEntity = new FeaturesEntity();
        }

        // Existing property but new exterior features
        if (is_null($exteriorFeaturesEntity)) {
            $exteriorFeaturesEntity = new ExteriorFeaturesEntity();
        }

        // Existing property but new interior features
        if (is_null($interiorFeaturesEntity)) {
            $interiorFeaturesEntity = new InteriorFeaturesEntity();
        }

        // Property entity
        $this->entity->setBuilt($this->built);
        $this->entity->setStyle($this->style);
        $this->entity->setFloors($this->floors);
        $this->entity->setBeds($this->beds);
        $this->entity->setBaths($this->baths);
        $this->entity->setFinishedArea($this->finishedArea);
        $this->entity->setUnfinishedArea($this->unfinishedArea);
        $this->entity->setTotalArea($this->totalArea);
        $this->entity->setParcelNumber($this->parcelNumber);

        // Address entity
        if (!is_null($this->address)) {
            $addressEntity->setPropertyId($this->entity->getId());
            $addressEntity->setStreet($this->address['street']);
            $addressEntity->setCity($this->address['city']);
            $addressEntity->setState($this->address['state']);
            $addressEntity->setZip($this->address['zip']);
            $addressEntity->setCounty($this->address['county']);
            $addressEntity->setCountry($this->address['country']);
            $addressEntity->setSubdivision($this->address['subdivision']);
            $this->entity->addAddress($addressEntity);
        }

        // Features entity
        if (!is_null($this->features)) {
            $featuresEntity->setPropertyId($this->entity->getId());
            $featuresEntity->setParking($this->features['parking']);
            $featuresEntity->setMultiUnit($this->features['multi_unit']);
            $featuresEntity->setHoa($this->features['hoa']);
            $featuresEntity->setUtilities($this->features['utilities']);
            $featuresEntity->setLot($this->features['lot']);
            $featuresEntity->setCommonWalls($this->features['common_walls']);
            $featuresEntity->setFacingDirection($this->features['facing_direction']);
            $featuresEntity->setOthers($this->features['others']);
            $this->entity->addFeatures($featuresEntity);
        }

        // Exterior features entity
        if (!is_null($this->exteriorFeatures)) {
            $exteriorFeaturesEntity->setPropertyId($this->entity->getId());
            $exteriorFeaturesEntity->setExterior($this->exteriorFeatures['exterior']);
            $exteriorFeaturesEntity->setFoundation($this->exteriorFeatures['foundation']);
            $exteriorFeaturesEntity->setOthers($this->exteriorFeatures['others']);
            $this->entity->addExteriorFeatures($exteriorFeaturesEntity);
        }

        // Interior features entity
        if (!is_null($this->interiorFeatures)) {
            $interiorFeaturesEntity->setPropertyId($this->entity->getId());
            $interiorFeaturesEntity->setKitchen($this->interiorFeatures['kitchen']);
            $interiorFeaturesEntity->setBathroom($this->interiorFeatures['bathroom']);
            $interiorFeaturesEntity->setLaundry($this->interiorFeatures['laundry']);
            $interiorFeaturesEntity->setCooling($this->interiorFeatures['cooling']);
            $interiorFeaturesEntity->setHeating($this->interiorFeatures['heating']);
            $interiorFeaturesEntity->setFireplace($this->interiorFeatures['fireplace']);
            $interiorFeaturesEntity->setFlooring($this->interiorFeatures['flooring']);
            $interiorFeaturesEntity->setOthers($this->interiorFeatures['others']);
            $this->entity->addInteriorFeatures($interiorFeaturesEntity);
        }

        // Assets entity
        if (!is_null($this->assets)) {
            if (!$this->existingProperty) {
                $assetEntity->setName($this->assets->getClientOriginalName());
                $assetEntity->setPath($assetFullPath);
                $this->entity->addAsset($assetEntity);
            } else {
                foreach($assetEntity as $asset) {
                    $asset->setName($this->assets->getClientOriginalName());
                    $asset->setPath($assetFullPath);
                    $this->entity->addAsset($asset);
                }
            }
        }

        if (!$this->existingProperty) {
            $this->em->persist($this->entity);
        }

        $this->em->flush();

        return true;
    }
}