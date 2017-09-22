import AppDispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import Api from '../services/Api';

let VehiclesAction = {

	getVehiclesAndApiVehicles: function() {
		Api
			.getMultiple('http://mcs.dev/api/vehicles', 'http://mcs.dev/api/sync/list')
			.then(function ([vehicles, apiVehicles])  {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.RECEIVE_VEHICLES_AND_API_VEHICLES,
					vehicles: vehicles,
					apiVehicles: apiVehicles
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.VEHICLES_ERROR,
					status: resp.status,
					msg: resp.msg
				});
			});
	},

    getVehicles: function() {
        Api
            .get('http://mcs.dev/api/vehicles')
            .then(function (vehicles) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_VEHICLES,
                    results: vehicles
                });
            })
            .catch(function(resp) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.VEHICLES_ERROR,
                    status: resp.status,
					msg: resp.msg
                });
            });
    },

    addVehicle: function(data) {
        Api
            .post('http://mcs.dev/api/vehicle', data, data.assets)
            .then(function (vehicle) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.ADD_VEHICLE,
					results: vehicle
                });
            })
            .catch(function(resp) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.VEHICLES_ERROR,
					status: resp.status,
					msg: resp.msg
                });
            });
    },

	updateVehicle: function(data) {
		Api
			.post('http://mcs.dev/api/vehicle', data, data.assets)
			.then(function (vehicle) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.UPDATE_VEHICLE,
					results: vehicle
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.VEHICLES_ERROR,
					status: resp.status,
					msg: resp.msg
				});
			});
	},

    removeVehicle: function(id) {
        Api
            .delete('http://mcs.dev/api/vehicles/' + id)
            .then(function (vehicle) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.REMOVE_VEHICLE,
					results: vehicle
                });
            })
            .catch(function(resp) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.VEHICLES_ERROR,
					status: resp.status,
					msg: resp.msg
                });
            });
    }
};

export default VehiclesAction;