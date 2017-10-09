import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
import _ from 'lodash';

let _vendors = [];
let _vendor = {};
let _rightPanel = false;
let _storeMsg;

function setStoreFlashMessage(msg) {
	_storeMsg = msg;
}

function removeToken() {
	localStorage.removeItem('id_token');
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

	getVendorss: function () {
		return _vendors;
	},

	setVendorss: function (results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			return false;
		} else {
			if (results.length !== 0) {
				_vendors = results;
			}
		}
	},

	addVendors: function(results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			return false;
		}

		_vendors.push(results.vendor);
		_storeMsg = results.msg;
		_rightPanel = false;
	},

	updateVendors: function(results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			return false;
		}

		_vendor = results.vendor;
		_storeMsg = results.msg;
		_rightPanel = false;
	},

	removeVendors: function(results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			return false;
		}

		_.remove(_vendors, (storeVendors) => {
			return parseInt(results.id) == storeVendors.id;
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
VendorsStore.dispatchToken = Dispatcher.register(function(payload) {
    let action  = payload.action;
	let results = action.results;

    switch(action.actionType) {
		case ActionConstants.ADD_VENDOR:
			VendorsStore.addVendors(results);
		break;

		case ActionConstants.UPDATE_VENDOR:
			VendorsStore.updateVendors(results);
		break;

		case ActionConstants.REMOVE_VENDOR:
			VendorsStore.removeVendors(results);
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