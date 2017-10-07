import AppDispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import Api from '../services/Api';

let VehiclesAction = {
	getVehiclesAndManufacturers: function() {
		Api
			.getMultiple('http://mcs.dev/api/vehicles', 'http://mcs.dev/api/manufacturers')
			.then(function ([vehicles, manufacturers])  {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.RECEIVE_VEHICLES_AND_MANUFACTURERS,
					vehicles: vehicles,
					manufacturers: manufacturers
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
			.then(function (resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.ADD_VEHICLE,
					results: resp
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
			.then(function (resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.UPDATE_VEHICLE,
					results: resp
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
            .then(function (resp) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.REMOVE_VEHICLE,
					results: resp
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