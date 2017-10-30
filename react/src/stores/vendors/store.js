import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
import _ from 'lodash';

let _vendors = [];
let _vendor = {};
let _rightPanel = false;
let _storeMsg;
let _alertType = 'success';

function setStoreFlashMessage(msg) {
	_storeMsg = msg;
}

function removeToken() {
	localStorage.removeItem('token');
}

let VendorsStore = assign({}, EventEmitter.prototype, {
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

	getVendors: function () {
		return _vendors;
	},

	setVendors: function (results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			_alertType = 'danger';
			return false;
		} else {
			if (results.length !== 0) {
				_vendors = results;
			}
		}
	},

	addVendor: function(results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			_alertType = 'danger';
			return false;
		}

		_vendors.push(results.vendor);
		_storeMsg = results.msg;
		_alertType = 'success';
		_rightPanel = false;
	},

	updateVendor: function(results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			_alertType = 'danger';
			return false;
		}

		// Remove existing entry
		_.remove(_vendors, (storeVendor) => {
			return parseInt(results.vendor.id) === storeVendor.id;
		});

		// Add new entry
		_vendors.push(results.vendor);
		_vendor = results.vendor;
		_storeMsg = results.msg;
		_alertType = 'success';
		_rightPanel = false;
	},

	removeVendor: function(results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			_alertType = 'danger';
			return false;
		}

		_.remove(_vendors, (storeVendor) => {
			return parseInt(results.id) === storeVendor.id;
		});

		_storeMsg = results.msg;
		_alertType = 'success';
		_rightPanel = false;
	},

	isAuthenticated: function() {
		if (localStorage.getItem('token') === null) {
			return false;
		}

		return true;
	},

	getStoreStatus: function() {
		return {
			msg: _storeMsg,
			type: _alertType
		};
	},

	removeStoreStatus: function() {
		_storeMsg = '';
	},

	showRightPanel: function() {
		return _rightPanel;
	}
});

// Register callback with AppDispatcher
VendorsStore.dispatchToken = Dispatcher.register(function(payload) {
    let action  = payload.action;
	let results = action.results;

    switch(action.actionType) {
		case ActionConstants.ADD_VENDOR:
			VendorsStore.addVendor(results);
		break;

		case ActionConstants.UPDATE_VENDOR:
			VendorsStore.updateVendor(results);
		break;

		case ActionConstants.REMOVE_VENDOR:
			VendorsStore.removeVendor(results);
		break;

        case ActionConstants.RECEIVE_VENDORS:
			VendorsStore.setVendors(results);
        break;

		case ActionConstants.VENDORS_ERROR:
			setStoreFlashMessage(results);
			removeToken();
		break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    VendorsStore.emitChange();

    return true;
});

export default VendorsStore;