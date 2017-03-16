import AppDispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import Api from '../services/Api';

var ActionCreator = {
    getVehicles: function () {
        Api
            .get('http://mcs.dev/api/vehicles')
            .then(function (vehicles) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_VEHICLES,
                    vehicles: vehicles
                });
            })
            .catch(function () {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_ERROR,
                    error: 'There was a problem getting the vehicles'
                });
            });
    },

    removeVehicles: function (id) {
        Api
            .delete('http://mcs.dev/api/vehicles/' + id)
            .then(function (vehicles) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_VEHICLES,
                    vehicles: vehicles
                });
            })
            .catch(function () {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_ERROR,
                    error: 'There was a problem removing the vehicle'
                });
            });
    },

    getManufacturers: function () {
        Api
            .get('http://mcs.dev/api/vehicles/mfgs')
            .then(function (manufacturers) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_MFGS,
                    manufacturers: manufacturers
                });
            })
            .catch(function () {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_ERROR,
                    error: 'There was a problem getting the manufacturers'
                });
            });
    },
};

export default ActionCreator;