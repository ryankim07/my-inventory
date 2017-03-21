import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import _ from 'lodash';

let _my_vehicles = [];

function setMyVehicles(vehicles) {
    _my_vehicles = vehicles ;
}

let MyVehiclesStore = assign({}, EventEmitter.prototype, {
    getMyVehicles: function () {
        return _my_vehicles;
    },

    removeMyVehicle: function(vehicle_id) {
        let vehicles = _my_vehicles;

        _.remove(vehicles,(vehicle) => {
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
    let id = action.id;

    switch(action.actionType) {
        case ActionConstants.RECEIVE_MY_VEHICLES:
            setMyVehicles(action.vehicles);
        break;

        case ActionConstants.REMOVE_MY_VEHICLE:
            MyVehiclesStore.removeMyVehicle(id);
        break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    MyVehiclesStore.emitChange();

    return true;

});

export default MyVehiclesStore;