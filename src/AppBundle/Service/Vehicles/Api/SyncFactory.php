<?php

namespace AppBundle\Service\Vehicles\Api;

use Doctrine\ORM\EntityManager;

class SyncFactory
{
    public static function get($type, EntityManager $entityManager)
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