<?php
/**
 * Created by PhpStorm.
 * User: kimr234z
 * Date: 2/21/17
 * Time: 10:28 AM
 */

namespace AppBundle\Service\Configuration\Properties;

class Rooms
{
    public function getRoomsList()
    {
        $rooms = [
            'powder',
            'living',
            'family',
            'laundry',
            'kitchen',
            'dining',
            'home office',
            'bonus',
            'study',
            'game',
            'sun',
            'mud'
        ];

        // Add bedrooms
        $nextRoom = count($rooms);
        $rooms[$nextRoom] = "master bedroom";
        $nextRoom++;

        for ($i = 2; $i <= 10; $i++) {
            $rooms[$nextRoom] = "bedroom {$i}";
            $nextRoom++;
        }

        // Add bathrooms
        $rooms[$nextRoom] = "master bathroom";
        $nextRoom++;

        for ($j = 2; $j <= 10; $j++) {
            $rooms[$nextRoom] = "bathroom {$j}";
            $nextRoom++;
        }

        // Return all rooms
        return $rooms;
    }
}