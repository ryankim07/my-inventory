import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import _ from 'lodash';

var _vehicles = [];
var _manufacturers = [];
var _models = [];

function setVehicles(vehicles) {
    _vehicles = vehicles ;
}

function setManufacturers(manufacturers) {
    _manufacturers = manufacturers ;
}

function setModels(models) {
    _models = models ;
}

var VehiclesStore = assign({}, EventEmitter.prototype, {
    getVehicles: function () {
        return _vehicles;
    },

    addVehicle: function(new_vehicle) {
        _vehicles.push(new_vehicle);
    },

    removeVehicle: function(vehicle_id) {
        let vehicles = _vehicles;

        _.remove(vehicles,(vehicle) => {
            return vehicle_id == vehicle.id;
        });

        _vehicles = vehicles;
    },

    getManufacturers: function () {
        return _manufacturers;
    },

    getModels: function () {
        return _models;
    },

    // Emit Change event
    emitChange: function(){
        this.emit('change');
    },

    /**
     *
     * @param callback
     */
    addChangeListener: function(callback){
        this.on('change', callback);
    },

    /**
     *
     * @param callback
     */
    removeChangeListener: function(callback){
        this.removeListener('change', callback);
    }
});

// Register callback with AppDispatcher
VehiclesStore.dispatchToken = Dispatcher.register(function(payload) {

    var action = payload.action;
    var new_vehicle = payload.new_vehicle;
    var id = action.id;

    switch(action.actionType) {
        case ActionConstants.RECEIVE_VEHICLES:
            setVehicles(action.vehicles);
        break;

        case ActionConstants.ADD_VEHICLE:
            VehiclesStore.addVehicle(new_vehicle);
        break;

        case ActionConstants.REMOVE_VEHICLE:
            VehiclesStore.removeVehicle(id);
        break;

        case ActionConstants.RECEIVE_MFGS:
            setManufacturers(action.manufacturers);
        break;

        case ActionConstants.RECEIVE_MFGS_MODELS:
            setModels(action.models);
        break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    VehiclesStore.emitChange();

    return true;

});

export default VehiclesStore;