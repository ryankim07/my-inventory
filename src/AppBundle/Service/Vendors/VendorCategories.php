<?php

/**
 * Class VendorCategories
 *
 * Service class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Service\Vendors;

use Doctrine\ORM\EntityManager;
use AppBundle\Entity\VendorCategoriesEntity;

class VendorCategories
{
    private $em;
    private $repo;
    private $entity;
    private $existingCategory;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     */
    public function __construct(EntityManager $entityManager)
    {
        $this->em   = $entityManager;
        $this->repo = $this->em->getRepository(VendorCategoriesEntity::class);
    }

    /**
     * Get all rooms
     *
     * @return mixed|string
     */
    public function findAll()
    {
        return $this->doSelect();
    }

    /**
     * Find specific room
     *
     * @param $id
     * @return mixed|null|object|string
     */
    public function find($id = null)
    {
        return $this->doSelect($id);
    }

    /**
     * Query and add dependencies
     *
     * @param null $id
     * @return mixed|string
     */
    private function doSelect($id = null)
    {
        $results = !is_null($id) ? $this->repo->find($id) : $this->repo->findBy([], ['name' => 'DESC']);

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

    /**
     * Save
     *
     * @param $data
     * @return array
     */
    public function save($data)
    {
        if (count($data) == 0) {
            return ['msg' => 'Category information empty.'];
        }

        try {
            $this->existingCategory = $this->find($data['id']);

            $this->entity = $this->existingCategory ? $this->existingCategory : new VendorCategoriesEntity();

            $op = !$this->existingCategory ? 'added' : 'updated';
            $msg = "Category successfully {$op}.";

            // Save or update category
            $this->_save($data);

            // Save or update category
            if (!$this->_save($data)) {
                $msg = "Category could not be {$op}.";
            };

            return [
                'category' => $this->entity,
                'msg'      => $msg
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }

    /**
     * Save or update category
     *
     * @param $data
     * @return bool
     */
    private function _save($data)
    {
        $this->entity->setName($data['name']);

        if (!$this->existingCategory) {
            $this->em->persist($this->entity);
        }

        $this->em->flush();

        return true;
    }

    /**
     * Delete category
     *
     * @param $id
     * @return array
     */
    public function delete($id)
    {
        if (!isset($id)) {
            return ['msg' => 'Empty ID for deleting category.'];
        }

        try {
            $category = $this->repo->find($id);

            $this->em->remove($category);
            $this->em->flush();

            return [
                'msg' => 'Category successfully deleted.',
                'id'  => $id
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }
}