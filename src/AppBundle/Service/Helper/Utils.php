<?php

/**
 * Class Utils
 *
 * Service class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Service\Helper;

class Utils
{
    /**
     * Search by key and value in multi array
     * @param $elem
     * @param $array
     * @param null $field
     * @return bool
     */
    public static function in_multiarray($elem, $array, $field = null)
    {
        $top    = sizeof($array) - 1;
        $bottom = 0;

        while($bottom <= $top) {
            if ($array[$bottom][$field] == $elem) {
                return true;
            } else {
                if (is_array($array[$bottom][$field])) {
                    if (self::in_multiarray($elem, ($array[$bottom][$field]), $field)) {
                        return true;
                    }
                }

                $bottom++;
            }
        }

        return false;
    }
}