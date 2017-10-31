<?php

/**
 * Class ManufacturersInterface
 *
 * Interface class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Service\Vehicles\Api;

interface ManufacturersInterface
{
    /**
     * Contract API call method
     *
     * @return mixed
     */
    public function getManufacturers();
}