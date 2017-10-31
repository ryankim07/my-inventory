<?php

/**
 * Class Rooms
 *
 * Service class
 *
 * @author  Ryan Kim
 * @module  MyInventory
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

    public function getRoomsDiff($rooms)
    {
        $existingRooms = [];

        foreach ($rooms as $room) {
            $existingRooms[] = $room->getName();
        }

        // Get the differences of what a particular property already
        // has against all the available rooms
        $roomsDiff = array_diff($this->getRoomsList(), $existingRooms);

        $diff = [];
        foreach ($roomsDiff as $index => $value) {
            $diff[] = [
                'value' => $value,
                'title' => ucwords($value)
            ];
        }

        return $diff;
    }
}