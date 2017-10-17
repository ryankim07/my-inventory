<?php

namespace AppBundle\Repository\Vehicles\Api;

use AppBundle\Repository\Helper\Pagination;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\NoResultException;

class ManufacturersRepository extends EntityRepository
{
    private $limit = 20;

    /**
     * Find all manufacturers
     *
     * @return bool|null
     */
    public function findAllManufacturers($page)
    {
        try {
            return $this->doSelect($page);
        } catch (NoResultException $e) {
            return null;
        }
    }

    /**
     * Query and add dependencies
     *
     * @param $page
     * @return bool|mixed
     */
    private function doSelect($page)
    {
        $paginator = new Pagination();

        $dql = $this->getEntityManager()
            ->createQuery(
                "SELECT mfg FROM AppBundle:ManufacturersEntity mfg
                    ORDER BY mfg.mfg"
            );

        $results = $paginator->paginate($dql, $page, $this->limit);

        if (count($results) == 0) {
            return false;
        }

        return $results;
    }
}