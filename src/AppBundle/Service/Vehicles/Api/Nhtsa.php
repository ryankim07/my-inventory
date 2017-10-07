<?php

namespace AppBundle\Service\Vehicles\Api;

class Nhtsa implements ManufacturersInterface
{
    /**
     * Call NHTSA API
     *
     * @return array
     */
    public function getManufacturers()
    {
        $blacklist = [
            992, 986, 972, 847, 667, 629, 606, 539, 519, 497, 470,
            5848, 5938, 6018, 5767, 5760, 5663, 5661, 5657, 5557, 5555, 5553, 5552, 5468, 5464, 5381,
            5367, 5208, 5042, 5015, 4859, 4764, 4744, 4644, 4634, 4554, 4451, 4410, 4220, 3803, 3766,
            3583, 3540, 3440, 3401, 3176, 3027, 2990, 2745, 2618, 2408, 2409, 2376, 2049, 1999, 1869,
            1824, 1755, 1683, 1532, 1498, 1393, 1288, 1151, 1146, 1142, 1104, 1034, 1075, 1292, 5122
        ];

        $apiData = json_decode(file_get_contents("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"));
        $vehicles    = $apiData->Results;

        $results = [];
        foreach($vehicles as $vehicle) {
            $vehicleId = $vehicle->MakeId;

            if (in_array($vehicleId, $blacklist)) {
                continue;
            }

            $modelData = $this->getApiModelsByMfg($vehicleId);

            $results[] = [
                'nhtsa_id' => $vehicleId,
                'mfg'      => $vehicle->MakeName,
                'models'   => $modelData
            ];
        }

        return $results;
    }

    /**
     * Get models by manufacturer ID from API
     *
     * @param $nhtsaId
     * @return array|bool
     */
    private function getApiModelsByMfg($nhtsaId)
    {
        if (!isset($nhtsaId)) {
            return false;
        }

        $modelData = json_decode(file_get_contents("https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/{$nhtsaId}?format=json"));
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