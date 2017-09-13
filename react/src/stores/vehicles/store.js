import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
import _ from 'lodash';

let _my_vehicles = [];
let _my_vehicle = {};
let _myVehicleAdded = false;
let _showPanel = false;
let _errStatus;
let _storeMsg;

function setMyVehicle(vehicle) {
	_my_vehicle = vehicle ;
}

function getMyVehicles() {
	return _my_vehicles;
}

function setMyVehicles(vehicles) {
	_my_vehicles = vehicles ;
}

function flagNewVehicle() {
    _myVehicleAdded = true;
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

function clearPropertyObj() {
	return _my_vehicle = {
		id: '',
		mfg_id: '',
		mfg: '',
		model_id: '',
		model: '',
		year: '',
		color: '',
		vin: '',
		plate: '',
		assets: []
	};
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

	loadVehicleToUpdate: function () {
		return _my_vehicle;
	},

	isNewVehicleAdded: function () {
		return _myVehicleAdded;
	},

	unFlagNewVehicle: function() {
		return _myVehicleAdded = false;
	},

	openRightPanel: function() {
    	return _showPanel;
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
	}
});

// Register callback with AppDispatcher
MyVehiclesStore.dispatchToken = Dispatcher.register(function(payload) {

    let action = payload.action;
    let results = action.results;
	let vehicles = getMyVehicles();

    switch(action.actionType) {
        case ActionConstants.RECEIVE_MY_VEHICLES:
        	if (results.msg) {
				setStoreFlashMessage(results.msg)
			} else {
				setMyVehicles(results)
			}
        break;

        case ActionConstants.ADD_MY_VEHICLE:
			setMyVehicle(results);
			flagNewVehicle();
			setStoreFlashMessage(results.msg);
			setRightPanel(true);
        break;

        case ActionConstants.EDIT_MY_VEHICLE:
			setStoreFlashMessage('');
			setMyVehicle(results);
			setRightPanel(true);
        break;

        case ActionConstants.UPDATE_MY_VEHICLE:
			let index = _.indexOf(_my_vehicles, _.find(_my_vehicles, (record) => {
					return record.id == results.id;
				})
			);

			vehicles.splice(index, 1, {
				id: results.id,
				mfg: results.mfg,
				mfg_id: results.mfg_id,
				model_id: results.model_id,
				model: results.model,
				year: results.year,
				color: results.color.charAt(0).toUpperCase() + results.color.slice(1),
				vin: results.vin,
				plate: results.plate,
				assets: results.assets
			});

			setMyVehicles(vehicles);
			setRightPanel(false);
			setStoreFlashMessage(results.msg);
        break;

        case ActionConstants.REMOVE_MY_VEHICLE:
			_.remove(vehicles, (myVehicle) => {
				return results.id == myVehicle.id;
			});

			setMyVehicles(vehicles);
			setRightPanel(false);
			setStoreFlashMessage(vehicle.msg);
        break;

		case ActionConstants.SHOW_VEHICLE_ADD_PANEL:
			clearPropertyObj();
			setRightPanel(true);
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