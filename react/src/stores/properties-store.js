import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import _ from 'lodash';

let _properties = [];
let _property = {};
let _propertyAdded = false;
let _assets;
let _showPanel = false;
let _errStatus;
let _storeMsg;

function setAllProperties(properties) {
    _properties = properties ;
}

function setProperty(property) {
	_property = property ;
}

function flagNewProperty() {
    _propertyAdded = true;
}

function setAssets(assets) {
    _assets = assets;
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

let PropertiesStore = assign({}, EventEmitter.prototype, {
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

	addProperty: function (msg) {
		setStoreFlashMessage(msg);
		flagNewProperty();
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
			beds: property.beds,
			baths: property.baths,
			floors: property.floors,
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
PropertiesStore.dispatchToken = Dispatcher.register(function(payload) {

    let action = payload.action;

    switch(action.actionType) {
        case ActionConstants.RECEIVE_PROPERTIES:
			PropertiesStore.setProperties(action.properties);
        break;

        case ActionConstants.ADD_PROPERTY:
            PropertiesStore.addProperty(action.results.msg);
        break;

        case ActionConstants.EDIT_PROPERTY:
			PropertiesStore.editProperty(action.property, action.showRightPanel);
			openRightPanel(true);
        break;

        case ActionConstants.UPDATE_PROPERTY:
            PropertiesStore.updateProperty(action.results);
        break;

        case ActionConstants.REMOVE_PROPERTY:
            PropertiesStore.removeProperty(action.results);
        break;

		case ActionConstants.SET_ASSETS:
			setAssets(action.file);
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