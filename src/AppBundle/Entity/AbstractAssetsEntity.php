<?php

/**
 * Class PaintsEntity
 *
 * Abstract class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Entity;

use AppBundle\Service\Helper\Utils;

class AbstractAssetsEntity
{
    protected $assets;

    /**
     * Remove all assets
     *
     * @param $modified
     */
    public function removeAllAssets($modified)
    {
        if ($this->assets->count() > 0) {
            foreach ($this->assets as $existingAsset) {
                if (!Utils::in_multiarray($existingAsset->getName(), $modified, 'name' ))
                    $this->removeAsset($existingAsset);
            }
        }
    }

    /**
     * Get assets
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getAssets()
    {
        return $this->assets;
    }
}