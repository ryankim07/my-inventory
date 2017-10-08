import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
import _ from 'lodash';

let _users = [];
let _user = {};
let _userAdded = false;
let _showPanel = false;
let _storeMsg;

function setAllUsers(vehicles) {
	_users = vehicles ;
}

function setUser(vehicle) {
	_user = vehicle ;
}

function flagNewUser() {
	_userAdded = true;
}

function openRightPanel(show) {
	_showPanel = show;
}

function setStoreFlashMessage(msg) {
	_storeMsg = msg;
}

function removeToken() {
	localStorage.removeItem('id_token');
}

let UsersStore = assign({}, EventEmitter.prototype, {
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

	getUsers: function () {
		return _users;
	},

	setUsers: function (users) {
		if (users.msg) {
			setStoreFlashMessage(users.msg)
		} else {
			setAllUsers(users)
		}
	},

	addUser: function (msg) {
		setStoreFlashMessage(msg);
		flagNewUser();
	},

	editUser: function (user) {
		setStoreFlashMessage('');
		setUser(user);
	},

	getUserToUpdate: function () {
		return _user;
	},

	unsetUserToUpdate: function () {
		return _user = {};
	},

	isNewUserAdded: function () {
		return _userAdded;
	},

	unFlagNewUser: function() {
		return _userAdded = false;
	},

	updateUser: function(data) {
		let user = data.user;
		let index = _.indexOf(_users, _.find(_users, (record) => {
				return record.id == user.id;
			})
		);

		_users.splice(index, 1, {
			color: user.color.charAt(0).toUpperCase() + vehicle.color.slice(1),
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

	removeUser: function(user) {
		let users = _users;

		_.remove(users, (storeUser) => {
			return user.id == storeUser.id;
		});

		_users = users;

		openRightPanel(false);
		setStoreFlashMessage(user.msg);
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
UsersStore.dispatchToken = Dispatcher.register(function(payload)
{
	let action = payload.action;

	switch(action.actionType) {
        case ActionConstants.RECEIVE_USERS:
			UsersStore.setUsers(action.users);
		break;

        case ActionConstants.ADD_NEW_USER:
            UsersStore.addUser(action.results.msg);
		break;

        case ActionConstants.EDIT_USER:
			UsersStore.editUser(action.user, action.showRightPanel);
			openRightPanel(true);
		break;

        case ActionConstants.UPDATE_USER:
            UsersStore.updateUser(action.results);
        break;

        case ActionConstants.RECEIVE_USERS:
            UsersStore.removeUser(action.results);
        break;

		case ActionConstants.RECEIVE_ERROR:
			setStoreFlashMessage(msg);
			removeToken();
		break;

        default:
            return true;
	}

	// If action was responded to, emit change event
	UsersStore.emitChange();

	return true;
});

export default UsersStore;