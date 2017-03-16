<?php

namespace AppBundle\Factory;

use AppBundle\Service\Home\HomeRecord;

class RecordFactory
{
    static public function get($type)
    {
        $instance = null;

        switch ($type) {
            case 'home':
                $instance = new HomeRecord();
            break;

            case 'vehicle':
                $instance = new VehicleRecord();
            break;
        }

        return $instance;
    }
}