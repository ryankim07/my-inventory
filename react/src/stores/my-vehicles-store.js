import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import _ from 'lodash';

let _my_vehicles = [];
let _my_vehicle = {};
let _myVehicleAdded = false;
let _assets;
let _showPanel = false;
let _errStatus;
let _storeMsg;

function setAllMyVehicles(vehicles) {
    _my_vehicles = vehicles ;
}

function setMyVehicle(vehicle) {
	_my_vehicle = vehicle ;
}

function flagNewVehicle() {
    _myVehicleAdded = true;
}

function setAssets(assets) {
    _assets = assets;
}

function openRightPanel(show) {
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

let MyVehiclesStore = assign({}, EventEmitter.prototype, {
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

	getMyVehicles: function () {
		return _my_vehicles;
	},

	setMyVehicles: function (vehicles) {
		if (vehicles.msg) {
			setStoreFlashMessage(vehicles.msg)
		} else {
			setAllMyVehicles(vehicles)
		}
	},

	addMyVehicle: function (msg) {
		setStoreFlashMessage(msg);
		flagNewVehicle();
	},

	editMyVehicle: function (vehicle) {
		setStoreFlashMessage('');
		setMyVehicle(vehicle);
	},

	getVehicleToUpdate: function () {
		return _my_vehicle;
	},

	unsetVehicleToUpdate: function () {
		return _my_vehicle = {};
	},

	isNewVehicleAdded: function () {
		return _myVehicleAdded;
	},

	unFlagNewVehicle: function() {
		return _myVehicleAdded = false;
	},

	updateMyVehicle: function(data) {
		let vehicle = data.vehicle;
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
			year: vehicle.year,
			assets: vehicle.assets
		});

		openRightPanel(false);
		setStoreFlashMessage(data.msg);
	},

	removeMyVehicle: function(vehicle) {
		let vehicles = _my_vehicles;

		_.remove(vehicles, (myVehicle) => {
			return vehicle.id == myVehicle.id;
		});

		_my_vehicles = vehicles;

		openRightPanel(false);
		setStoreFlashMessage(vehicle.msg);
	},

	isAuthenticated: function() {
		if (localStorage.getItem('id_token') === null) {
			return false;
		}

		return true;
	},

	openRightPanel: function() {
    	return _showPanel;
	},

	getStoreFlashMessage: function() {
		return _storeMsg;
	},

	unsetStoreFlashMessage: function() {
		_storeMsg = '';
	}
});

// Register callback with AppDispatcher
MyVehiclesStore.dispatchToken = Dispatcher.register(function(payload) {

    let action = payload.action;

    switch(action.actionType) {
        case ActionConstants.RECEIVE_MY_VEHICLES:
			MyVehiclesStore.setMyVehicles(action.vehicles);
        break;

        case ActionConstants.ADD_MY_VEHICLE:
            MyVehiclesStore.addMyVehicle(action.results.msg);
        break;

        case ActionConstants.EDIT_MY_VEHICLE:
			MyVehiclesStore.editMyVehicle(action.vehicle, action.showRightPanel);
			openRightPanel(true);
        break;

        case ActionConstants.UPDATE_MY_VEHICLE:
            MyVehiclesStore.updateMyVehicle(action.results);
        break;

        case ActionConstants.REMOVE_MY_VEHICLE:
            MyVehiclesStore.removeMyVehicle(action.results);
        break;

		case ActionConstants.SET_ASSETS:
			setAssets(action.file);
        break;

		case ActionConstants.RECEIVE_ERROR:
			setStoreFlashMessage(action.msg);
			setErrorStatus(action.status);
			removeToken();
		break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    MyVehiclesStore.emitChange();

    return true;
});

export default MyVehiclesStore;