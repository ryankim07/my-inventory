import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
import _ from 'lodash';

let _properties = [];
let _property = {};
let _showPanel = false;
let _errStatus;
let _storeMsg;

function setProperty(property) {
	_property = property ;
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

	getProperties: function () {
		return _properties;
	},

	setProperties: function(results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			return false;
		} else {
			if (results.length !== 0) {
				_properties = (results)
			}
		}
	},

	addProperty: function (results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			return false;
		}

		_properties.push(results.property);
		_storeMsg = results.msg;
		_showPanel = false;
	},

	updateProperty: function(results) {
    	if (results.err_msg) {
			_storeMsg = results.err_msg;
			return false;
		}

		let property = results.property;
		let index = _.indexOf(_properties, _.find(_properties, (record) => {
				return record.id === property.id;
			})
		);

		_properties.splice(index, 1, {
			id: property.id,
			built: property.built,
			style: property.style,
			floors: property.floors,
			beds: property.beds,
			baths: property.baths,
			finished_area: property.finished_area,
			unfinished_area: property.unfinished_area,
			total_area: property.total_area,
			parcel_number: property.parcel_number,
			assets: property.assets,
			address: property.address
		});

		_storeMsg = results.msg;
		_showPanel = false;
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
PropertiesStore.dispatchToken = Dispatcher.register(function(payload) {

    let action  = payload.action;
	let results = action.results;

    switch(action.actionType) {
        case ActionConstants.ADD_PROPERTY:
            PropertiesStore.addProperty(results);
        break;

        case ActionConstants.EDIT_PROPERTY:
			setProperty(results);
			setStoreFlashMessage('');
			setRightPanel(true);
        break;

        case ActionConstants.UPDATE_PROPERTY:
            PropertiesStore.updateProperty(results);
        break;

        case ActionConstants.REMOVE_PROPERTY:
            PropertiesStore.removeProperty(results);
        break;

		case ActionConstants.RECEIVE_PROPERTIES:
			PropertiesStore.setProperties(results);
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
    PropertiesStore.emitChange();

    return true;
});

export default PropertiesStore;