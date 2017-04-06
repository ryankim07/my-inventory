import AppDispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import Api from '../services/Api';

let ActionCreator = {
    getMyVehicles: function () {
        Api
            .get('http://mcs.dev/api/vehicles')
            .then(function (vehicles) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_MY_VEHICLES,
                    vehicles: vehicles
                });
            })
            .catch(function () {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_ERROR,
                    msg: 'There was a problem getting the vehicles'
                });
            });
    },

    addMyVehicle: function (data, asset) {
        Api
            .post('http://mcs.dev/api/vehicle', data, asset)
            .then(function (msg) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.ADD_MY_VEHICLE,
                    msg: msg
                });
            })
            .catch(function () {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_ERROR,
                    msg: 'There was a problem adding new vehicle'
                });
            });
    },

	updateMyVehicle: function (data) {
		Api
			.post('http://mcs.dev/api/vehicle', data)
			.then(function (msg) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.UPDATE_MY_VEHICLE,
					msg: msg
				});
			})
			.catch(function () {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.RECEIVE_ERROR,
					msg: 'There was a problem updating vehicle'
				});
			});
	},

    removeMyVehicle: function (id) {
        Api
            .delete('http://mcs.dev/api/vehicles/' + id)
            .then(function (msg) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.REMOVE_MY_VEHICLE,
                    msg: msg
                });
            })
            .catch(function () {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_ERROR,
                    msg: 'There was a problem removing the vehicle'
                });
            });
    },

    getApiVehicles: function () {
        Api
            .get('http://mcs.dev/api/sync/list')
            .then(function (manufacturers) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_MFGS,
                    manufacturers: manufacturers
                });
            })
            .catch(function () {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_ERROR,
                    msg: 'There was a problem getting the manufacturers'
                });
            });
    },

	setAssets: function (file) {
		Api
			.postImage('http://mcs.dev/api/asset', file)
			.then(function (msg) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.SET_ASSETS,
					file: file
				});
			})
			.catch(function () {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.RECEIVE_ERROR,
					msg: 'There was a problem adding new assets'
				});
			});
	}
};

export default ActionCreator;