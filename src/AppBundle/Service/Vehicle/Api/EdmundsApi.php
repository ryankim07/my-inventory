<?php

namespace AppBundle\Service\Vehicle\Api;

class EdmundsApi extends AbstractApi implements InterfaceApi
{
    const API_KEY = "8z5gs5zedbpdadhnzdqbmvdk";

    /**
     * Call Edmunds API
     *
     * @return array
     */
    public function callApi()
    {
        $mfgData = json_decode(file_get_contents('http://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=' . self::API_KEY));
        $results = [];

        foreach($mfgData as $mfg) {
            foreach($mfg as $details) {
                $models = [];
                foreach($details->models as $model) {
                    $models[] = [
                        'model_id' => $model->id,
                        'model'    => $model->name
                    ];
                }

                $results[] = [
                    'mfg_id' => $details->id,
                    'mfg'    => $details->name,
                    'models' => $models
                ];
            }
        }

        return $results;
    }
}