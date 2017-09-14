import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
import _ from 'lodash';

let _my_vehicles = [];
let _my_vehicle = {};
let _showPanel = false;
let _errStatus;
let _storeMsg;

function setMyVehicle(vehicle) {
	_my_vehicle = vehicle ;
}

function setMyVehicles(vehicles) {
	_my_vehicles = vehicles ;
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

	updateMyVehicle: function(results) {
    	let vehicle = results.vehicle;
		let index   = _.indexOf(_my_vehicles, _.find(_my_vehicles, (record) => {
				return record.id === vehicle.id;
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

		 _storeMsg = results.msg;
		_showPanel = false;
	},

	removeMyVehicle: function(results) {
    	let vehicle = results.vehicle;

		_.remove(_my_vehicles, (myVehicle) => {
			return vehicle.id === myVehicle.id;
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
MyVehiclesStore.dispatchToken = Dispatcher.register(function(payload) {

    let action  = payload.action;
    let results = action.results;

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
			setStoreFlashMessage(results.msg);
			setRightPanel(true);
        break;

        case ActionConstants.EDIT_MY_VEHICLE:
			setMyVehicle(results);
			setStoreFlashMessage('');
			setRightPanel(true);
        break;

        case ActionConstants.UPDATE_MY_VEHICLE:
			MyVehiclesStore.updateMyVehicle(action.results);
        break;

        case ActionConstants.REMOVE_MY_VEHICLE:
			MyVehiclesStore.removeMyVehicle(action.results);
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