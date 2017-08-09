import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
import _ from 'lodash';

let _rooms = [];
let _room = {};
let _roomAdded = false;
let _showPanel = false;
let _errStatus;
let _storeMsg;

function setAllRooms(rooms) {
    _rooms = rooms ;
}

function setRoom(room) {
	_room = room ;
}

function flagNewRoom() {
    _roomAdded = true;
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

	getRoom: function () {
		return _rooms;
	},

	setRoom: function (rooms) {
		if (rooms.msg) {
			setStoreFlashMessage(rooms.msg)
		} else {
			setAllRooms(rooms)
		}
	},

	addRoom: function (msg) {
		setStoreFlashMessage(msg);
		flagNewRoom();
	},

	editRoom: function (room) {
		setStoreFlashMessage('');
		setRoom(room);
	},

	getRoomToUpdate: function () {
		return _room;
	},

	unsetRoomToUpdate: function () {
		return _room = {};
	},

	isNewRoomAdded: function () {
		return _roomAdded;
	},

	unFlagNewRoom: function() {
		return _roomAdded = false;
	},

	updateRoom: function(data) {
		let room = data.room;
		let index = _.indexOf(_rooms, _.find(_rooms, (record) => {
				return record.id == room.id;
			})
		);

		_rooms.splice(index, 1, {
			id: room.id,
			property_id: room.property_id,
			name: room.name,
			total_area: room.total_area,
			description: room.description
		});

		openRightPanel(false);
		setStoreFlashMessage(data.msg);
	},

	removeRoom: function(room) {
		let rooms = _rooms;

		_.remove(rooms, (myRoom) => {
			return room.id == myRoom.id;
		});

		_rooms = rooms;

		openRightPanel(false);
		setStoreFlashMessage(room.msg);
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
PropertiesRoomsStore.dispatchToken = Dispatcher.register(function(payload) {

    let action = payload.action;

    switch(action.actionType) {
        case ActionConstants.RECEIVE_PROPERTIES_ROOMS:
			PropertiesRoomsStore.setRooms(action.rooms);
        break;

        case ActionConstants.ADD_PROPERTY_ROOM:
            PropertiesRoomsStore.addRoom(action.results.msg);
        break;

        case ActionConstants.EDIT_PROPERTY_ROOM:
			PropertiesRoomsStore.editRoom(action.room, action.showRightPanel);
			openRightPanel(true);
        break;

        case ActionConstants.UPDATE_PROPERTY_ROOM:
            PropertiesRoomsStore.updateRoom(action.results);
        break;

        case ActionConstants.REMOVE_PROPERTY_ROOM:
            PropertiesRoomsStore.removeRoom(action.results);
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