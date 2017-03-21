<?php

namespace AppBundle\Service\Vehicles\Api;

use Doctrine\ORM\EntityManager;

class SyncDb
{
    protected $em;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     */
    public function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
    }

    /**
     * Find all manufacturers and associated models
     *
     * @return mixed|string
     */
    public function findAll()
    {
        return $this->doSelect(null);
    }

    /**
     * Find specific manufacturer and models
     *
     * @param $mfgId
     * @return mixed|null|object|string
     */
    public function find($mfgId)
    {
        return $this->doSelect($mfgId);
    }

    /**
     * Query and add dependencies
     *
     * @param null $id
     * @return mixed|string
     */
    private function doSelect($id = null)
    {
        $results = !is_null($id) ?
            $this->em->getRepository('AppBundle:VehicleMfgsApiEntity')->find($id) :
            $this->em->getRepository('AppBundle:VehicleMfgsApiEntity')->findAll();

        if (count($results) == 0) {
            return false;
        }

        if (!is_null($id)) {
            $results = $this->addDependencies($results);
        }

        return $results;
    }

    /**
     * Add dependencies
     *
     * @param $results
     * @return mixed
     */
    private function addDependencies($results)
    {
        return $results;
    }
}