import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
import _ from 'lodash';

let _users = [];
let _user = {};
let _rightPanel = false;
let _storeMsg;

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

	setUsers: function (results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			return false;
		} else {
			if (results.length !== 0) {
				_users = results;
			}
		}
	},

	addUser: function (results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			return false;
		}

		_users.push(results.user);
		_storeMsg = results.msg;
		_rightPanel = false;
	},

	updateUser: function (results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			return false;
		}

		// Remove existing entry
		_.remove(_users, (storeUser) => {
			return parseInt(results.user.id) === storeUser.id;
		});

		// Add new entry
		_users.push(results.user);
		_user = results.user;
		_storeMsg = results.msg;
		_rightPanel = false;
	},

	removeUser: function(results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			return false;
		}

		_.remove(_users, (storeUser) => {
			return parseInt(results.id) == storeUser.id;
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
UsersStore.dispatchToken = Dispatcher.register(function(payload)
{
	let action  = payload.action;
	let results = action.results

	switch(action.actionType) {
        case ActionConstants.ADD_USER:
            UsersStore.addUser(results);
		break;

        case ActionConstants.UPDATE_USER:
            UsersStore.updateUser(results);
        break;

        case ActionConstants.REMOVE_USER:
            UsersStore.removeUser(results);
        break;

		case ActionConstants.RECEIVE_USERS:
			UsersStore.setUsers(results);
		break;

		case ActionConstants.USERS_ERROR:
			setStoreFlashMessage(results);
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