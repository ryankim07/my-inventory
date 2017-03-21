<?php

namespace AppBundle\Repository\Vehicles\Api;

use Doctrine\ORM\EntityRepository;

class VehiclesRepository extends EntityRepository
{
    public function getAllMyVehicles()
    {
        /*$query = $this->getEntityManager()
            ->createQuery(
                'SELECT mfg FROM AppBundle:Product p
            JOIN p.category c
            WHERE p.id = :id'
            )->setParameter('id', $productId);

        try {
            return $query->getSingleResult();
        } catch (\Doctrine\ORM\NoResultException $e) {
            return null;
        }*/
    }
}