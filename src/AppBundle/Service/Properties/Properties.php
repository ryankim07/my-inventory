<?php

/**
 * Class Properties
 *
 * Service class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Service\Properties;

use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Properties\PropertyEntity;
use AppBundle\Entity\Properties\AddressEntity;
use AppBundle\Entity\Properties\RoomsEntity;
use AppBundle\Entity\Properties\RoomsWallsEntity;
use AppBundle\Entity\Properties\FeaturesEntity;
use AppBundle\Entity\Properties\ExteriorFeaturesEntity;
use AppBundle\Entity\Properties\InteriorFeaturesEntity;
use AppBundle\Service\Configuration\Properties\Rooms as ConfiguredRooms;
use AppBundle\Service\Helper\Assets;

class Properties
{
    private $em;
    private $repo;
    private $configuredRoomsService;
    private $assetsService;
    private $entity;
    private $existingProperty;
    private $existingRoom;
    private $existingFeatures;
    private $existingExteriorFeatures;
    private $existingInteriorFeatures;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     * @param ConfiguredRooms $configuredRoomsService
     * @param Assets $assetsService
     */
    public function __construct(EntityManager $entityManager,
                                ConfiguredRooms $configuredRoomsService,
                                Assets $assetsService)
    {
        $this->em                     = $entityManager;
        $this->repo                   = $this->em->getRepository('AppBundle\Entity\Properties\PropertyEntity');
        $this->configuredRoomsService = $configuredRoomsService;
        $this->assetsService           = $assetsService;
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

        if ($results) {
            $results = $this->addDependencies($results);
        }

        return $results;
    }

    /**
     * Add dependencies
     *
     * @param $results
     * @return array
     */
    private function addDependencies($results)
    {
        $dependencies = [];

        if (is_array($results)) {
            foreach ($results as $property) {
                $rooms = $property->getRooms();
                $diff = $this->configuredRoomsService->getRoomsDiff($rooms);
                $property->addNonAddedRooms($diff);
                $dependencies[] = $property;
            }
        } else {
            $rooms = $results->getRooms();
            $diff = $this->configuredRoomsService->getRoomsDiff($rooms);
            $results->addNonAddedRooms($diff);
            $dependencies = $results;
        }

        return $dependencies;
    }

    /**
     * Save
     *
     * @param $data
     * @return array
     */
    public function saveProperty($data)
    {
        if (count($data) == 0) {
            return ['msg' => 'Property information empty.'];
        }

        try {
            $this->existingProperty = $this->find($data['id']);
            $this->entity           = $this->existingProperty ? $this->existingProperty : new PropertyEntity();

            $op  = !$this->existingProperty ? 'added' : 'updated';
            $msg = "Property successfully {$op}.";

            $addressEntity = $this->existingProperty ?
                $this->em->getRepository('AppBundle\Entity\Properties\AddressEntity')->findOneByPropertyId($this->entity->getId()) : new AddressEntity();

            // Property entity
            $this->entity->setBuilt($data['built']);
            $this->entity->setStyle($data['style']);
            $this->entity->setFloors($data['floors']);
            $this->entity->setBeds($data['beds']);
            $this->entity->setBaths($data['baths']);
            $this->entity->setFinishedArea($data['finished_area']);
            $this->entity->setUnfinishedArea($data['unfinished_area']);
            $this->entity->setTotalArea($data['total_area']);
            $this->entity->setParcelNumber($data['parcel_number']);

            // Address entity
            if (!is_null($data['address'])) {
                $addressEntity->setPropertyId($this->entity->getId());
                $addressEntity->setStreet($data['address']['street']);
                $addressEntity->setCity($data['address']['city']);
                $addressEntity->setState($data['address']['state']);
                $addressEntity->setZip($data['address']['zip']);
                $addressEntity->setCounty($data['address']['county']);
                $addressEntity->setCountry($data['address']['country']);
                $addressEntity->setSubdivision($data['address']['subdivision']);
                $this->entity->addAddress($addressEntity);
            }

            // Assets entity
            $this->entity = $this->assetsService->save('AppBundle\Entity\Properties\AssetsEntity', $this->entity, $data['assets']);

            // Save
            if (!$this->existingProperty) {
                $this->em->persist($this->entity);
            }

            $this->em->flush();

            // Save or update property
            if (!$this->entity) {
                $msg = "Property could not be {$op}.";
            };
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }

        return [
            'property' => $this->entity,
            'msg'      => $msg
        ];
    }

    /**
     * Delete property
     *
     * @param $id
     * @return array
     */
    public function deleteProperty($id)
    {
        if (!isset($id)) {
            return ['msg' => 'Empty ID for deleting property.'];
        }

        try {
            $property = $this->repo->find($id);
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

            $this->em->remove($property);
            $this->em->flush();

            return [
                'id'  => $id,
                'msg' => 'Property successfully deleted.'
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }

    /**
     * Save
     *
     * @param $data
     * @return array
     */
    public function saveRoom($data)
    {
        if (count($data) == 0) {
            return ['msg' => 'Room information empty.'];
        }

        try {
            $this->existingRoom = $this->em->getRepository('AppBundle\Entity\Properties\RoomsEntity')->find($data['id']);
            $this->entity       = $this->existingRoom ? $this->existingRoom : new RoomsEntity();

            $op  = !$this->existingRoom ? 'added' : 'updated';
            $msg = "Room successfully {$op}.";

            // Save or update room
            $property      = $this->find($data['property_id']);
            $existingWalls = $this->entity->getWalls();

            foreach($data["walls"] as $wall) {
                if (empty($wall["paint_id"]) && empty($wall["name"])) {
                    continue;
                }

                foreach($existingWalls as $existingWall) {
                    if ($existingWall->getId() != $wall['id']) {
                        $this->em->remove($existingWall);
                    }
                }

                $wallsEntity = !empty($wall["id"]) ?
                    $this->em->getRepository('AppBundle\Entity\Properties\RoomsWallsEntity')->find($wall["id"]) : new RoomsWallsEntity();

                $wallsEntity->setRoomId($this->entity->getId());
                $wallsEntity->setPaintId((int) $wall['paint_id']);
                $wallsEntity->setName($wall['name']);
                $this->entity->addWall($wallsEntity);
            }

            $this->entity->setPropertyId($data['property_id']);
            $this->entity->setName($data["name"]);
            $this->entity->setTotalArea($data["total_area"]);
            $this->entity->setDescription($data["description"]);
            $property->addRoom($this->entity);

            if (!$this->existingRoom) {
                $this->em->persist($property);
            }

            $this->em->flush();

            // Include non added rooms object
            $property = $this->addDependencies($property);

            if (!$property) {
                $msg = "Room could not be {$op}.";
            };

            return [
                'property' => $property,
                'msg'      => $msg
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }

    /**
     * Delete property room
     *
     * @param $propertyId
     * @param $roomId
     * @return array
     */
    public function deleteRoom($propertyId, $roomId)
    {
        try {
            $property = $this->repo->find($propertyId);
            $rooms    = $property->getRooms();

            foreach($rooms as $room) {
                if ($room->getId() == $roomId) {
                    $this->em->remove($room);
                }
            }

            $this->em->flush();

            // Include non added rooms object
            $property = $this->addDependencies($property);

            return [
                'property' => $property,
                'msg'      => 'Room successfully deleted.'
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }

    /**
     * Save
     *
     * @param $data
     * @return array
     */
    public function saveFeatures($data)
    {
        if (count($data) == 0) {
            return ['msg' => 'Features information empty.'];
        }

        try {
            $this->existingFeatures = $this->em->getRepository('AppBundle\Entity\Properties\FeaturesEntity')->find($data['id']);
            $this->entity           = $this->existingFeatures ? $this->existingFeatures : new FeaturesEntity();

            $op  = !$this->existingFeatures ? 'added' : 'updated';
            $msg = "Property features successfully {$op}.";

            // Save or update property
            $property = $this->find($data['property_id']);

            $this->entity->setPropertyId($data['property_id']);
            $this->entity->setParking($data['parking']);
            $this->entity->setMultiUnit($data['multi_unit']);
            $this->entity->setHoa($data['hoa']);
            $this->entity->setUtilities($data['utilities']);
            $this->entity->setLot($data['lot']);
            $this->entity->setCommonWalls($data['common_walls']);
            $this->entity->setFacingDirection($data['facing_direction']);
            $this->entity->setOthers($data['others']);
            $property->addFeatures($this->entity);

            if (!$this->existingFeatures) {
                $this->em->persist($property);
            }

            $this->em->flush();

            if (!$property) {
                $msg = "Property features could not be {$op}.";
            };

            return [
                'property' => $property,
                'msg'      => $msg
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }

    /**
     * Delete property features
     *
     * @param $propertyId
     * @return array
     */
    public function deleteFeatures($propertyId)
    {
        if (!isset($id)) {
            return ['msg' => 'Empty ID for deleting property features.'];
        }

        try {
            $property = $this->repo->find($propertyId);
            $this->em->remove($property->getFeatures());
            $this->em->flush();

            return [
                'msg' => 'Property features successfully deleted.',
                'id'  => $id
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }

    /**
     * Save
     *
     * @param $data
     * @return array
     */
    public function saveExteriorFeatures($data)
    {
        if (count($data) == 0) {
            return ['msg' => 'Exterior features information empty.'];
        }

        try {
            $this->existingExteriorFeatures = $this->em->getRepository('AppBundle\Entity\Properties\ExteriorFeaturesEntity')->find($data['id']);
            $this->entity                   = $this->existingExteriorFeatures ? $this->existingExteriorFeatures : new ExteriorFeaturesEntity();

            $op  = !$this->existingExteriorFeatures ? 'added' : 'updated';
            $msg = "Property exterior features successfully {$op}.";

            // Save or update property
            $property = $this->find($data['property_id']);

            $this->entity->setPropertyId($data['property_id']);
            $this->entity->setExterior($data['exterior']);
            $this->entity->setFoundation($data['foundation']);
            $this->entity->setOthers($data['others']);
            $property->addExteriorFeatures($this->entity);

            if (!$this->existingExteriorFeatures) {
                $this->em->persist($property);
            }

            $this->em->flush();

            if (!$property) {
                $msg = "Property exterior features could not be {$op}.";
            };

            return [
                'property' => $property,
                'msg'      => $msg
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }

    /**
     * Delete property exterior features
     *
     * @param $propertyId
     * @return array
     */
    public function deleteExteriorFeatures($propertyId)
    {
        if (!isset($id)) {
            return ['msg' => 'Empty ID for deleting property exterior features.'];
        }

        try {
            $property = $this->repo->find($propertyId);
            $this->em->remove($property->getExteriorFeatures());
            $this->em->flush();

            return [
                'property' => $property,
                'msg'      => 'Property exterior features successfully deleted.'
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }

    /**
     * Save
     *
     * @param $data
     * @return array
     */
    public function saveInteriorFeatures($data)
    {
        if (count($data) == 0) {
            return ['msg' => 'Interior features information empty.'];
        }

        try {
            $this->existingInteriorFeatures = $this->em->getRepository('AppBundle\Entity\Properties\InteriorFeaturesEntity')->find($data['id']);
            $this->entity                   = $this->existingInteriorFeatures ? $this->existingInteriorFeatures : new InteriorFeaturesEntity();

            $op  = !$this->existingInteriorFeatures ? 'added' : 'updated';
            $msg = "Property interior features successfully {$op}.";

            // Save or update property
            $property = $this->find($data['property_id']);

            $this->entity->setPropertyId($data['property_id']);
            $this->entity->setKitchen($data['kitchen']);
            $this->entity->setBathroom($data['bathroom']);
            $this->entity->setLaundry($data['laundry']);
            $this->entity->setCooling($data['cooling']);
            $this->entity->setHeating($data['heating']);
            $this->entity->setFireplace($data['fireplace']);
            $this->entity->setFlooring($data['flooring']);
            $this->entity->setOthers($data['others']);
            $property->addInteriorFeatures($this->entity);

            if (!$this->existingInteriorFeatures) {
                $this->em->persist($property);
            }

            $this->em->flush();

            if (!$property) {
                $msg = "Property interior features could not be {$op}.";
            };

            return [
                'property' => $property,
                'msg'      => $msg
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }

    /**
     * Delete property interior features
     *
     * @param $propertyId
     * @return array
     */
    public function deleteInteriorFeatures($propertyId)
    {
        if (!isset($id)) {
            return ['msg' => 'Empty ID for deleting property interior features.'];
        }

        try {
            $property = $this->repo->find($propertyId);
            $this->em->remove($property->getInteriorFeatures());
            $this->em->flush();

            return [
                'property' => $property,
                'msg'      => 'Property interior features successfully deleted.'
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }
}