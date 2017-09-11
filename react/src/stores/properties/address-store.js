import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
import _ from 'lodash';

let _addresses = [];
let _address = {};
let _addressAdded = false;
let _showPanel = false;
let _errStatus;
let _storeMsg;

function setAllAddresses(addresses) {
    _addresses = addresses ;
}

function setAddress(address) {
	_address = address ;
}

function flagNewProperty() {
    _addressAdded = true;
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

let PropertiesAddressStore = assign({}, EventEmitter.prototype, {
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

	getAddresses: function () {
		return _addresses;
	},

	setAddresses: function (addresses) {
		if (addresses.msg) {
			setStoreFlashMessage(addresses.msg)
		} else {
			setAllAddresses(addresses)
		}
	},

	addAddress: function (msg) {
		setStoreFlashMessage(msg);
		flagNewProperty();
	},

	editAddress: function (address) {
		setStoreFlashMessage('');
		setAddress(address);
	},

	getAddressToUpdate: function () {
		return _address;
	},

	unsetAddressToUpdate: function () {
		return _address = {};
	},

	isNewAddressAdded: function () {
		return _addressAdded;
	},

	unFlagNewAddress: function() {
		return _addressAdded = false;
	},

	updateAddress: function(data) {
		let address = data.address;
		let index = _.indexOf(_addresses, _.find(_addresses, (record) => {
				return record.id == address.id;
			})
		);

		_addresses.splice(index, 1, {
			id: address.id,
			property_id: address.property_id,
			street: address.street,
			city: address.city,
			state: address.state,
			zip: address.zip,
			county: address.county,
			country: address.country,
			subdivision: address.subdivision
		});

		openRightPanel(false);
		setStoreFlashMessage(data.msg);
	},

	removeAddress: function(address) {
		let addresses = _addresses;

		_.remove(addresses, (myAddress) => {
			return address.id == myAddress.id;
		});

		_addresses = addresses;

		openRightPanel(false);
		setStoreFlashMessage(address.msg);
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
PropertiesAddressStore.dispatchToken = Dispatcher.register(function(payload) {

    let action = payload.action;

    switch(action.actionType) {
        case ActionConstants.RECEIVE_PROPERTIES_ADDRESSES:
			PropertiesAddressStore.setAddresses(action.addresses);
        break;

        case ActionConstants.ADD_PROPERTY_ADDRESS:
            PropertiesAddressStore.addAddress(action.results.msg);
        break;

        case ActionConstants.EDIT_PROPERTY_ADDRESS:
			PropertiesAddressStore.editAddress(action.address, action.showRightPanel);
			openRightPanel(true);
        break;

        case ActionConstants.UPDATE_PROPERTY_ADDRESS:
            PropertiesAddressStore.updateAddress(action.results);
        break;

        case ActionConstants.REMOVE_PROPERTY_ADDRESS:
            PropertiesAddressStore.removeAddress(action.results);
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
    PropertiesAddressStore.emitChange();

    return true;
});

export default PropertiesAddressStore;