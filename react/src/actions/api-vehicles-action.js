import AppDispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import Api from '../services/Api';

let ApiVehiclesAction = {
    getApiVehicles: function() {
        Api
            .get('http://mcs.dev/api/sync/list')
            .then(function(manufacturers) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_API_VEHICLES,
                    results: manufacturers
                });
            })
            .catch(function(resp) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.API_VEHICLES_ERROR,
					status: resp.status,
					msg: resp.msg
                });
            });
    }
};

export default ApiVehiclesAction;