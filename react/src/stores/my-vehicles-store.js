import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import _ from 'lodash';

let _my_vehicles = [];
let _myVehicleAdded = false;

function setMyVehicles(vehicles) {
    _my_vehicles = vehicles ;
}

function flagNewVehicle() {
    _myVehicleAdded = true;
}

let MyVehiclesStore = assign({}, EventEmitter.prototype, {
    getMyVehicles: function () {
        return _my_vehicles;
    },

    isNewVehicleAdded: function () {
        return _myVehicleAdded;
    },

    unFlagNewVehicle: function() {
        return _myVehicleAdded = false;
    },

    updateMyVehicle: function(vehicle) {
        let index = _.indexOf(_my_vehicles, _.find(_my_vehicles, (record) => {
                return record.id == vehicle.id;
            })
        );

        _my_vehicles.splice(index, 1, {
            color: vehicle.color.charAt(0).toUpperCase() + vehicle.color.slice(1),
            id: vehicle.id,
            mfg: vehicle.mfg,
            mfg_id: vehicle.mfg_id,
            model: vehicle.model,
            model_id: vehicle.model_id,
            plate: vehicle.plate,
            vin: vehicle.vin,
            year: vehicle.year
        });
    },

    removeMyVehicle: function(vehicle_id) {
        let vehicles = _my_vehicles;

        _.remove(vehicles, (vehicle) => {
            return vehicle_id == vehicle.id;
        });

        _my_vehicles = vehicles;
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
MyVehiclesStore.dispatchToken = Dispatcher.register(function(payload) {

    let action = payload.action;

    switch(action.actionType) {
        case ActionConstants.RECEIVE_MY_VEHICLES:
            setMyVehicles(action.vehicles);
        break;

        case ActionConstants.ADD_MY_VEHICLE:
            flagNewVehicle();
        break;

        case ActionConstants.UPDATE_MY_VEHICLE:
            MyVehiclesStore.updateMyVehicle(action.vehicle)
        break;

        case ActionConstants.REMOVE_MY_VEHICLE:
            MyVehiclesStore.removeMyVehicle(action.id);
        break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    MyVehiclesStore.emitChange();

    return true;

});

export default MyVehiclesStore;