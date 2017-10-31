import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';

let _storeMsg;

function setToken(token) {
	if (!localStorage.getItem('token')) {
		localStorage.setItem('token', token);
	}
}

function removeToken() {
	localStorage.removeItem('token');
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

	getUser: function() {
		return localStorage.getItem('profile');
	},

	getJwt: function() {
		return localStorage.getItem('token');
	},

	isAuthenticated: function() {
		if (localStorage.getItem('token') === null) {
			return false;
		}

		return true;
	},

	getToken: function() {
		return localStorage.getItem('token');
	},

	getStoreStatus: function() {
		return _storeMsg;
	},

	removeStoreStatus: function() {
		_storeMsg = '';
	}
});

// Register callback with AppDispatcher
AuthStore.dispatchToken = Dispatcher.register(function(payload)
{
	let action  = payload.action;
	let results = action.results;

	switch(action.actionType) {
		case ActionConstants.LOGIN_USER:
			setToken(action.token);
		break;

		case ActionConstants.LOGOUT_USER:
			removeToken();
		break;

		case ActionConstants.LOGIN_USER_ERROR:
			setStoreFlashMessage(results);
			removeToken();
		break;
	}

	// If action was responded to, emit change event
	AuthStore.emitChange();

	return true;
});

export default AuthStore;