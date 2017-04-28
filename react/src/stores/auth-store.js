import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';

let _storeMsg;

function setUser(token) {
	if (!localStorage.getItem('id_token')) {
		localStorage.setItem('id_token', token);
	}
}

function removeUser() {
	localStorage.removeItem('id_token');
}

function setStoreFlashMessage(msg) {
	_storeMsg = msg;
}

let AuthStore = assign({}, EventEmitter.prototype, {
	// Emit Change event
	emitChange: function(){
		this.emit('change');
	},

	addChangeListener: function(callback){
		this.on('change', callback);
	},

	/**
	 *
	 * @param callback
	 */
	removeChangeListener: function(callback){
		this.removeListener('change', callback);
	},

	isAuthenticated: function() {
		if (localStorage.getItem('id_token') === null) {
			return false;
		}

		return true;
	},

	getUser: function() {
		return localStorage.getItem('profile');
	},

	removeUser: function(msg) {
		removeUser();
		setStoreFlashMessage(msg);
	},

	getJwt: function() {
		return localStorage.getItem('id_token');
	},

	getStoreFlashMessage: function() {
		return _storeMsg;
	},

	unsetStoreFlashMessage: function() {
		_storeMsg = '';
	}
});

// Register callback with AppDispatcher
AuthStore.dispatchToken = Dispatcher.register(function(payload)
{
	let action = payload.action;

	switch(action.actionType) {
		case ActionConstants.LOGIN_USER:
			setUser(action.token);
		break;

		case ActionConstants.LOGOUT_USER:
			removeUser();
		break;

		case ActionConstants.LOGIN_USER_ERROR:
			AuthStore.removeUser(action.msg);
		break;
	}

	// If action was responded to, emit change event
	AuthStore.emitChange();

	return true;
});

export default AuthStore;