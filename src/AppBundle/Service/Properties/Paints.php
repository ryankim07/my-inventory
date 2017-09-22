<?php
/**
 * Created by PhpStorm.
 * User: kimr234z
 * Date: 2/21/17
 * Time: 10:28 AM
 */

namespace AppBundle\Service\Properties;

use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Properties\PaintsEntity;

class Paints
{
    private $em;
    private $repo;
    private $vendorId;
    private $name;
    private $number;
    private $color;
    private $hex;
    private $rgb;
    private $notes;
    private $entity;
    private $existingPaint;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     */
    public function __construct(EntityManager $entityManager)
    {
        $this->em   = $entityManager;
        $this->repo = $this->em->getRepository('AppBundle\Entity\Properties\PaintsEntity');
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

    public function findByVendorId($id)
    {
        return $this->repo->findByVendorId($id);
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
            return ['msg' => 'Paint information empty.'];
        }

        try {
            $id             = (int)$data['id'];
            $this->vendorId = (int)$data['vendor_id'];
            $this->name     = $data["name"];
            $this->number   = $data["total_area"];
            $this->color    = $data["description"];
            $this->hex      = $data["hex"];
            $this->rgb      =  $data["rgb"];
            $this->notes    = $data["notes"];

            $this->existingPaint = $this->find($id);

            if (!$this->existingPaint) {
                $this->entity = $this->existingPaint;
            }

            // Save or update room
            $this->_savePaint();

            $msg = !$this->existingPaint ? 'added' : 'updated';

            return [
                'property' => $this->entity,
                'msg'      => "Paint color successfully {$msg}."
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }

    /**
     * Delete room
     *
     * @param $id
     * @return array
     */
    public function delete($id)
    {
        if (!isset($id)) {
            return ['msg' => 'Empty ID for deleting paint.'];
        }

        try {
            $paint = $this->repo->find($id);

            $this->em->remove($paint);
            $this->em->flush();

            return [
                'msg' => 'Paint color successfully deleted.',
                'id'  => $id
            ];
        } catch(\Exception $e) {
            return ['err_msg' => $e->getMessage()];
        }
    }

    /**
     * Save or update paint
     *
     * @return bool
     */
    private function _savePaint()
    {
        if (!$this->existingPaint) {
            $this->entity = new PaintsEntity();
        }

        $property = $this->em->getRepository('AppBundle\Entity\Properties\PropertyEntity')->find($this->propertyId);

        $this->entity->setPropertyId($this->propertyId);
        $this->entity->setName($this->name);
        $this->entity->setTotalArea($this->totalArea);
        $this->entity->setDescription($this->description);

        $property->addRoom($this->entity);

        if (!$this->existingPaint) {
            $this->em->persist($property);
        }

        $this->em->flush();

        return true;
    }
}