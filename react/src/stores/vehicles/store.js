import {EventEmitter} from 'events';
import assign from 'object-assign';
import _ from 'lodash';
import Dispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';

let _vehicles = [];
let _apiVehicles = [];
let _vehicle = {};
let _rightPanel = false;
let _errStatus;
let _storeMsg;

function setStoreFlashMessage(msg) {
	_storeMsg = msg;
}

function setErrorStatus(status) {
	_errStatus = status;
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

	setVehiclesAndApiVehicles: function(vehicles, apiVehicles) {
		if (vehicles.length !== 0) {
			_vehicles = vehicles;
		}

		if (apiVehicles.length !== 0) {
			_apiVehicles = apiVehicles;
		}
	},

	getApiVehicles: function() {
		return _apiVehicles;
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

		let vehicle = results.vehicle;
		let index   = _.indexOf(_vehicles, _.find(_vehicles, (record) => {
				return record.id === vehicle.id;
			})
		);

		_vehicles.splice(index, 1, {
			id: vehicle.id,
			mfg: vehicle.mfg,
			mfg_id: vehicle.mfg_id,
			model_id: vehicle.model_id,
			model: vehicle.model,
			year: vehicle.year,
			color: vehicle.color,
			vin: vehicle.vin,
			plate: vehicle.plate,
			assets: vehicle.assets
		});

		_vehicle   = vehicle;
		_storeMsg  = results.msg;
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

		case ActionConstants.RECEIVE_VEHICLES_AND_API_VEHICLES:
			VehiclesStore.setVehiclesAndApiVehicles(action.vehicles, action.apiVehicles);
		break;

		case ActionConstants.VEHICLES_ERROR:
			setStoreFlashMessage(msg);
			setErrorStatus(status);
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