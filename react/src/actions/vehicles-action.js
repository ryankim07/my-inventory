import AppDispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import Api from '../services/Api';

let VehiclesAction = {
    getMyVehicles: function() {
        Api
            .get('http://mcs.dev/api/vehicles')
            .then(function (vehicles) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_MY_VEHICLES,
                    vehicles: vehicles
                });
            })
            .catch(function(resp) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_ERROR,
                    status: resp.status,
					msg: resp.msg
                });
            });
    },

    addMyVehicle: function(data) {
        Api
            .post('http://mcs.dev/api/vehicle', data, data.assets)
            .then(function (results) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.ADD_MY_VEHICLE,
					results: results
                });
            })
            .catch(function(resp) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_ERROR,
					status: resp.status,
					msg: resp.msg
                });
            });
    },

	updateMyVehicle: function(data) {
		Api
			.post('http://mcs.dev/api/vehicle', data, data.assets)
			.then(function (results) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.UPDATE_MY_VEHICLE,
					results: results
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.RECEIVE_ERROR,
					status: resp.status,
					msg: resp.msg
				});
			});
	},

    removeMyVehicle: function(id) {
        Api
            .delete('http://mcs.dev/api/vehicles/' + id)
            .then(function (results) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.REMOVE_MY_VEHICLE,
					results: results
                });
            })
            .catch(function(resp) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_ERROR,
					status: resp.status,
					msg: resp.msg
                });
            });
    },

    getApiVehicles: function() {
        Api
            .get('http://mcs.dev/api/sync/list')
            .then(function(manufacturers) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_MFGS,
                    manufacturers: manufacturers
                });
            })
            .catch(function(resp) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_ERROR,
					status: resp.status,
					msg: resp.msg
                });
            });
    },

	setAssets: function(file) {
		Api
			.postImage('http://mcs.dev/api/asset', file)
			.then(function (msg) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.SET_ASSETS,
					file: file
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.RECEIVE_ERROR,
					status: resp.status,
					msg: resp.msg
				});
			});
	}
};

export default VehiclesAction;