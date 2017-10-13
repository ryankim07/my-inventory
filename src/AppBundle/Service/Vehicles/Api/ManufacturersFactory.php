<?php

/**
 * Class ManufacturersFactory
 *
 * Factory service class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Service\Vehicles\Api;

use Doctrine\ORM\EntityManager;

class ManufacturersFactory
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