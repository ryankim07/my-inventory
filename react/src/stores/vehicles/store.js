import {EventEmitter} from 'events';
import assign from 'object-assign';
import _ from 'lodash';
import Dispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';

let _vehicles = [];
let _vehicle = {};
let _manufacturers = [];
let _rightPanel = false;
let _storeMsg;

function setStoreFlashMessage(msg) {
	_storeMsg = msg;
}

function removeToken() {
	localStorage.removeItem('id_token');
}

let VehiclesStore = assign({}, EventEmitter.prototype, {
    // Emit Change event
    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback){
        this.on('change', callback);
    },

    removeChangeListener: function(callback){
        this.removeListener('change', callback);
	},

	setVehiclesAndMfgs: function(vehicles, manufacturers) {
		if (vehicles.length !== 0) {
			_vehicles = vehicles;
		}

		if (manufacturers.length !== 0) {
			_manufacturers = manufacturers;
		}
	},

	getManufacturers: function() {
		return _manufacturers;
	},

	getVehicles: function() {
		return _vehicles;
	},

	addVehicle: function(results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			return false;
		}

		_vehicles.push(results.vehicle);
		_storeMsg = results.msg;
		_rightPanel = false;
	},

	updateVehicle: function(results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			return false;
		}

		_vehicle = results.vehicle;
		_storeMsg = results.msg;
		_rightPanel = false;
	},

	removeVehicle: function(results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			return false;
		}

		_.remove(_vehicles, (myVehicle) => {
			return parseInt(results.id) === myVehicle.id;
		});

		_storeMsg = results.msg;
		_rightPanel = false;
	},

	isAuthenticated: function() {
		if (localStorage.getItem('id_token') === null) {
			return false;
		}

		return true;
	},

	getStoreFlashMessage: function() {
		return _storeMsg;
	},

	unsetStoreFlashMessage: function() {
		_storeMsg = '';
	},

	showRightPanel: function() {
    	return _rightPanel;
	}
});

// Register callback with AppDispatcher
VehiclesStore.dispatchToken = Dispatcher.register(function(payload) {

    let action  = payload.action;
    let results = action.results;

    switch(action.actionType) {
        case ActionConstants.ADD_VEHICLE:
        	VehiclesStore.addVehicle(results);
        break;

        case ActionConstants.UPDATE_VEHICLE:
			VehiclesStore.updateVehicle(results);
        break;

        case ActionConstants.REMOVE_VEHICLE:
			VehiclesStore.removeVehicle(results);
        break;

		case ActionConstants.RECEIVE_VEHICLES_AND_MANUFACTURERS:
			VehiclesStore.setVehiclesAndMfgs(action.vehicles, action.manufacturers);
		break;

		case ActionConstants.VEHICLES_ERROR:
			setStoreFlashMessage(msg);
			removeToken();
		break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    VehiclesStore.emitChange();

    return true;
});

export default VehiclesStore;