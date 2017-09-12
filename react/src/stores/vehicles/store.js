import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
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

function setMyVehicle(vehicles) {
	_my_vehicle = vehicles ;
}

function setNewMyVehicle(vehicle) {
	_my_vehicles.push(vehicle);
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

	addMyVehicle: function (results) {
		let vehicle = results.vehicle;

		setNewMyVehicle(vehicle);
		openRightPanel(false);
		flagNewVehicle();
		setStoreFlashMessage(results.msg);
	},

	editMyVehicle: function (vehicle) {
		setStoreFlashMessage('');
		setMyVehicle(vehicle);
		openRightPanel(true);
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
			id: vehicle.id,
			mfg: vehicle.mfg,
			mfg_id: vehicle.mfg_id,
			model_id: vehicle.model_id,
			model: vehicle.model,
			year: vehicle.year,
			color: vehicle.color.charAt(0).toUpperCase() + vehicle.color.slice(1),
			vin: vehicle.vin,
			plate: vehicle.plate,
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

	setAssets: function(assets) {
		setAssets(assets)
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

	setRightPanel: function(show) {
		openRightPanel(show)
	},

	getStoreFlashMessage: function() {
		return _storeMsg;
	},

	setStoreFlashMessage: function (msg) {
		setStoreFlashMessage()
	},

	unsetStoreFlashMessage: function() {
		_storeMsg = '';
	},

	setErrorStatus: function(status) {
		setErrorStatus(status);
	},

	removeToken: function () {
		removeToken();
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
            MyVehiclesStore.addMyVehicle(action.results);
        break;

        case ActionConstants.EDIT_MY_VEHICLE:
			MyVehiclesStore.editMyVehicle(action.vehicle);
        break;

        case ActionConstants.UPDATE_MY_VEHICLE:
            MyVehiclesStore.updateMyVehicle(action.results);
        break;

        case ActionConstants.REMOVE_MY_VEHICLE:
            MyVehiclesStore.removeMyVehicle(action.results);
        break;

		case ActionConstants.SET_ASSETS:
			MyVehiclesStore.setAssets(action.file);
        break;

		case ActionConstants.SHOW_VEHICLE_ADD_PANEL:
			MyVehiclesStore.setRightPanel(true);
		break;

		case ActionConstants.RECEIVE_ERROR:
			MyVehiclesStore.setStoreFlashMessage(action.msg);
			MyVehiclesStore.setErrorStatus(action.status);
			MyVehiclesStore.removeToken();
		break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    MyVehiclesStore.emitChange();

    return true;
});

export default MyVehiclesStore;