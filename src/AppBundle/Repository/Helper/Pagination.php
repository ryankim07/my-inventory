<?php
/**
 * Created by PhpStorm.
 * User: kimr234z
 * Date: 10/17/17
 * Time: 8:44 AM
 */

namespace AppBundle\Repository\Helper;

use Doctrine\ORM\Tools\Pagination\Paginator;

class Pagination
{
    /**
     * Paginate
     *
     * @param $dql
     * @param $page
     * @param $limit
     * @return mixed
     */
    public function paginate($dql, $page = 1, $limit)
    {
        $paginator = new Paginator($dql);
        $paginator->getQuery()
            ->setFirstResult(($limit * ($page - 1)))
            ->setMaxResults($limit);

        $results = [
            'page'        => $page,
            'total_count' => count($paginator),
            'total_pages' => ceil(count($paginator) / $limit),
            'limit'       => $limit,
            'list'        => $dql->getResult()
        ];

        return $results;
    }
}