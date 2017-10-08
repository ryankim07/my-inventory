import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
import _ from 'lodash';

let _properties = [];
let _property = {};
let _paints = [];
let _rightPanel = false;
let _storeMsg;

function setStoreFlashMessage(msg) {
	_storeMsg = msg;
}

function removeToken() {
	localStorage.removeItem('id_token');
}

let PropertiesStore = assign({}, EventEmitter.prototype, {
    // Emit Change event
    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
	},

	setPropertiesAndPaints: function(properties, paints) {
		if (properties.length !== 0) {
			_properties = properties;
		}

		if (paints.length !== 0) {
			_paints = paints;
		}
	},

	getPaints: function() {
		return _paints;
	},

	getProperties: function () {
		return _properties;
	},

	getProperty: function() {
    	return _property;
	},

	getPropertyById: function (id) {
		return _properties.find(obj => obj.id === id);
	},

	updateProperty: function(results) {
    	if (results.err_msg) {
			_storeMsg = results.err_msg;
			return false;
		}

		_property = results.property;
		_storeMsg = results.msg;
		_rightPanel = false;
	},

	removeProperty: function(results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			return false;
		}

		_.remove(_properties, (myProperty) => {
			return parseInt(results.id) == myProperty.id;
		});

		_storeMsg = results.msg;
		_rightPanel = false;
	},

	removeRoom: function(results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			return false;
		}

		_property = results.property;
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
PropertiesStore.dispatchToken = Dispatcher.register(function(payload) {

    let action  = payload.action;
	let results = action.results;

    switch(action.actionType) {
        case ActionConstants.MODIFY_PROPERTY:
            PropertiesStore.updateProperty(results);
        break;

        case ActionConstants.REMOVE_PROPERTY:
            PropertiesStore.removeProperty(results);
        break;

		case ActionConstants.RECEIVE_PROPERTIES_AND_PAINTS:
			PropertiesStore.setPropertiesAndPaints(action.properties, action.paints);
		break;

		case ActionConstants.REMOVE_PROPERTY_ROOM:
			PropertiesStore.removeRoom(results);
		break;

		case ActionConstants.PROPERTIES_ERROR:
			setStoreFlashMessage(msg);
			removeToken();
		break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    PropertiesStore.emitChange();

    return true;
});

export default PropertiesStore;