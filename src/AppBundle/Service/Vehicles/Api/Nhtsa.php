<?php

namespace AppBundle\Service\Vehicles\Api;

class Nhtsa extends SyncAbstract
{
    /**
     * Call NHTSA API
     *
     * @return array
     */
    public function getApiVehicles()
    {
        $blacklist = [
            992, 986, 972, 847, 667, 629, 606, 539, 519, 497, 470,
            5848, 5938, 6018, 5767, 5760, 5663, 5661, 5657, 5557, 5555, 5553, 5552, 5468, 5464, 5381,
            5367, 5208, 5042, 5015, 4859, 4764, 4744, 4644, 4634, 4554, 4451, 4410, 4220, 3803, 3766,
            3583, 3540, 3440, 3401, 3176, 3027, 2990, 2745, 2618, 2408, 2409, 2376, 2049, 1999, 1869,
            1824, 1755, 1683, 1532, 1498, 1393, 1288, 1151, 1146, 1142, 1104, 1034, 1075, 1292, 5122
        ];

        $mfgData = json_decode(file_get_contents("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"));
        $mfgs    = $mfgData->Results;

        $results = [];
        foreach($mfgs as $mfg) {
            $mfgId = $mfg->MakeId;

            if (in_array($mfgId, $blacklist)) {
                continue;
            }

            $modelData = $this->getApiModelsByMfg($mfgId);

            $results[] = [
                'mfg_id' => $mfgId,
                'mfg'    => $mfg->MakeName,
                'models' => $modelData
            ];
        }

        return $results;
    }

    /**
     * Get models by manufacturer ID from API
     *
     * @param $mfgId
     * @return array|bool
     */
    private function getApiModelsByMfg($mfgId)
    {
        if (!isset($mfgId)) {
            return false;
        }

        $modelData = json_decode(file_get_contents("https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/{$mfgId}?format=json"));
        $allModels = $modelData->Results;

        $results = [];
        foreach($allModels as $model) {
            $results[] = [
                'model_id' => $model->Model_ID,
                'model'    => $model->Model_Name
            ];
        }

        return $results;
    }
}