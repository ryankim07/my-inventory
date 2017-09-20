import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
import _ from 'lodash';

let _rooms = [];

let _room = {};
let _showPanel = false;
let _errStatus;
let _storeMsg;

function setRoom(room) {
	_room = room ;
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

let PropertiesRoomsStore = assign({}, EventEmitter.prototype, {
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

	getRooms: function () {
		return _rooms;
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
PropertiesRoomsStore.dispatchToken = Dispatcher.register(function(payload) {

    let action  = payload.action;
	let results = action.results;

    switch(action.actionType) {


		case ActionConstants.RECEIVE_PROPERTY_ROOMS:
			PropertiesRoomsStore.setRooms($results);
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
    PropertiesRoomsStore.emitChange();

    return true;
});

export default PropertiesRoomsStore;