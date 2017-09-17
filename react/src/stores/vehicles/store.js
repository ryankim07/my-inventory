import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
import _ from 'lodash';

let _vehicles = [];
let _vehicle = {};
let _showPanel = false;
let _errStatus;
let _storeMsg;

function setVehicle(vehicle) {
	_vehicle = vehicle ;
}

function setRightPanel(show) {
	_showPanel = show;
}

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
    emitChange: function(){
        this.emit('change');
    },

    addChangeListener: function(callback){
        this.on('change', callback);
    },

    removeChangeListener: function(callback){
        this.removeListener('change', callback);
	},

	getVehicles: function () {
		return _vehicles;
	},

	setVehicles: function(results) {
		if (results.msg) {
			_storeMsg = results.msg;
		} else {
			if (results.length !== 0) {
				_vehicles = results;
			}
		}
	},

	addVehicle: function(results) {
		_vehicles.push(results.vehicle);
		_storeMsg = results.msg;
		_showPanel = false;
	},

	updateVehicle: function(results) {
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

		 _storeMsg = results.msg;
		_showPanel = false;
	},

	removeVehicle: function(results) {
		_.remove(_vehicles, (myVehicle) => {
			return parseInt(results.id) === myVehicle.id;
		});

		_storeMsg = results.msg;
		_showPanel = false;
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
    	return _showPanel;
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

        case ActionConstants.EDIT_VEHICLE:
			setVehicle(results);
			setStoreFlashMessage('');
			setRightPanel(true);
        break;

        case ActionConstants.UPDATE_VEHICLE:
			VehiclesStore.updateVehicle(results);
        break;

        case ActionConstants.REMOVE_VEHICLE:
			VehiclesStore.removeVehicle(results);
        break;

		case ActionConstants.RECEIVE_VEHICLES:
			VehiclesStore.setVehicles(results);
		break;

		case ActionConstants.RECEIVE_ERROR:
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