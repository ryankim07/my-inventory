<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class SyncController extends Controller
{
    /**
     * @Route("/sync/vehicles", name="vehicles_api")
     */
    public function vehiclesAction()
    {
        $service = $this->get('NhtsaApi');
        $mfgSynced = $service->syncMfgs();

        if ($mfgSynced) {
            $modelsSynced = $service->syncMfgModels();

            if ($modelsSynced) {
                $msg = 'Sync completed successfully.';
            } else {
                $msg = $modelsSynced;
            }
        } else {
            $msg = $mfgSynced;
        }

        return new Response($msg);
    }
}