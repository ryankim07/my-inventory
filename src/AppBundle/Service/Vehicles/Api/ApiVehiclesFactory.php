<?php

namespace AppBundle\Service\Vehicles\Api;

use Doctrine\ORM\EntityManager;

class ApiVehiclesFactory
{
    public static function get(EntityManager $entityManager, $type)
    {
        $instance = null;

        switch($type) {
            case 'Nhtsa':
                $instance = new Nhtsa($entityManager);
            break;

            case 'Edmunds':
                $instance = new Edmunds($entityManager);
            break;
        }

        return $instance;
    }
}