import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
import _ from 'lodash';

let _properties = [];
let _property = {};
let _savedProperty = {};
let _assets;
let _mainPanel;
let _propertyAdded = false;
let _showRightPanel = false;
let _errStatus;
let _storeMsg;

function setAllProperties(properties) {
    _properties = properties ;
}

function setProperty(property) {
	_property = property ;
}

function setSavedProperty(property) {
	_savedProperty = property ;
}

function flagNewProperty() {
    _propertyAdded = true;
}

function setAssets(assets) {
    _assets = assets;
}

function setMainPanel(name) {
	_mainPanel = name;
}

function openRightPanel(show) {
	_showRightPanel = show;
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

	setProperties: function (properties) {
		if (properties.msg) {
			setStoreFlashMessage(properties.msg)
		} else {
			setAllProperties(properties)
		}
	},

	getProperty: function () {
		return _property;
	},

	setProperty: function (property) {
		if (property.msg) {
			setStoreFlashMessage(property.msg)
		} else {
			setProperty(property)
		}
	},

	getSavedProperty: function () {
		return _savedProperty;
	},

	addProperty: function (results) {
    	let property = results.property;

		setSavedProperty(property);
		openRightPanel(false);
		flagNewProperty();
		setStoreFlashMessage(results.msg);
	},

	editProperty: function (property) {
		setStoreFlashMessage('');
		setProperty(property);
	},

	getPropertyToUpdate: function () {
		return _property;
	},

	unsetPropertyToUpdate: function () {
		return _property = {};
	},

	isNewPropertyAdded: function () {
		return _propertyAdded;
	},

	unFlagNewProperty: function() {
		return _propertyAdded = false;
	},

	updateProperty: function(data) {
		let property = data.property;
		let index = _.indexOf(_properties, _.find(_properties, (record) => {
				return record.id == property.id;
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
			assets: property.assets
		});

		openRightPanel(false);
		setStoreFlashMessage(data.msg);
	},

	removeProperty: function(property) {
		let properties = _properties;

		_.remove(properties, (myProperty) => {
			return property.id == myProperty.id;
		});

		_properties = properties;

		openRightPanel(false);
		setStoreFlashMessage(property.msg);
	},

	setAssets: function(assets) {
		setAssets(assets)
	},

	isAuthenticated: function() {
		if (localStorage.getItem('id_token') === null) {
			return false;
		}

		return true;
	},

	setMainPanel: function(name) {
    	setMainPanel(name);
	},

	getMainPanel: function() {
		return _mainPanel;
	},

	openRightPanel: function() {
    	return _showRightPanel;
	},

	setRightPanel: function(show) {
		openRightPanel(show)
	},

	getStoreFlashMessage: function() {
		return _storeMsg;
	},

	setStoreFlashMessage: function (msg) {
		setStoreFlashMessage()
	},

	unsetStoreFlashMessage: function() {
		_storeMsg = '';
	},

	setErrorStatus: function(status) {
    	setErrorStatus(status);
	},

	removeToken: function () {
		removeToken();
	}
});

// Register callback with AppDispatcher
PropertiesStore.dispatchToken = Dispatcher.register(function(payload) {

    let action = payload.action;

    switch(action.actionType) {
        case ActionConstants.RECEIVE_PROPERTIES:
			PropertiesStore.setProperties(action.properties);
        break;

        case ActionConstants.ADD_PROPERTY:
            PropertiesStore.addProperty(action.results);
        break;

        case ActionConstants.EDIT_PROPERTY:
			PropertiesStore.editProperty(action.property);
			PropertiesStore.setRightPanel(true);
        break;

        case ActionConstants.UPDATE_PROPERTY:
            PropertiesStore.updateProperty(action.results);
        break;

        case ActionConstants.REMOVE_PROPERTY:
            PropertiesStore.removeProperty(action.results);
        break;

		case ActionConstants.GET_PROPERTY:
			PropertiesStore.setProperty(action.results);
		break;

		case ActionConstants.SET_ASSETS:
			PropertiesStore.setAssets(action.file);
        break;

		case ActionConstants.SHOW_PROPERTY_ADD_PANEL:
			PropertiesStore.setRightPanel(true);
		break;

		case ActionConstants.SHOW_PROPERTY_VIEW_PANEL:
			PropertiesStore.setMainPanel(action.name);
			PropertiesStore.setProperty(action.data);
			PropertiesStore.setRightPanel(false);
		break;

		case ActionConstants.RECEIVE_ERROR:
			PropertiesStore.setStoreFlashMessage(action.msg);
			PropertiesStore.setErrorStatus(action.status);
			PropertiesStore.removeToken();
		break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    PropertiesStore.emitChange();

    return true;
});

export default PropertiesStore;