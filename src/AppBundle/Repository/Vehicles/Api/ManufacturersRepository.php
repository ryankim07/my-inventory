<?php

namespace AppBundle\Repository\Vehicles\Api;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\NoResultException;
use AppBundle\Entity\Vehicles\ManufacturersEntity;
use AppBundle\Entity\Vehicles\ManufacturerModelsEntity;

class ManufacturersRepository extends EntityRepository
{
    public function findAllManufacturers()
    {
        try {
            return $this->getEntityManager()
                ->createQuery(
                    "SELECT mfg.* FROM AppBundle/Entity/Vehicles/ManufacturersEntity mfg
                    LEFT JOIN AppBundle/Entity/Vehicles/ManufacturerModelsEntity models
                    ON mfg.id = models.mfg_id
                    ORDER BY mfg.mfg ASC")
                ->getResult();
        } catch (NoResultException $e) {
            return null;
        }
    }
}