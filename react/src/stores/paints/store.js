import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
import _ from 'lodash';

let _paints = [];
let _paint = {};
let _vendors = [];
let _rightPanel = false;
let _storeMsg;

function setStoreFlashMessage(msg) {
	_storeMsg = msg;
}

function removeToken() {
	localStorage.removeItem('token');
}

let PaintsStore = assign({}, EventEmitter.prototype, {
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

	setPaintsAndVendors: function(paints, vendors) {
		if (paints.length !== 0) {
			_paints = paints;
		}

		if (vendors.length !== 0) {
			_vendors = vendors;
		}
	},

	getVendors: function () {
		return _vendors;
	},

	getPaints: function () {
		return _paints;
	},

	setPaints: function (results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			return false;
		} else {
			if (results.length !== 0) {
				_paints = results;
			}
		}
	},

	addPaint: function(results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			return false;
		}

		_paints.push(results.paint);
		_storeMsg = results.msg;
		_rightPanel = false;
	},

	updatePaint: function(results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			return false;
		}

		// Remove existing entry
		_.remove(_paints, (storePaint) => {
			return parseInt(results.paint.id) === storePaint.id;
		});

		// Add new entry
		_paints.push(results.paint);
		_paint = results.paint;
		_storeMsg = results.msg;
		_rightPanel = false;
	},

	removePaint: function(results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			return false;
		}

		_.remove(_paints, (storePaint) => {
			return parseInt(results.id) === storePaint.id;
		});

		_storeMsg = results.msg;
		_rightPanel = false;
	},

	isAuthenticated: function() {
		if (localStorage.getItem('token') === null) {
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
PaintsStore.dispatchToken = Dispatcher.register(function(payload) {
    let action  = payload.action;
	let results = action.results;

    switch(action.actionType) {
		case ActionConstants.ADD_PAINT:
			PaintsStore.addPaint(results);
		break;

		case ActionConstants.UPDATE_PAINT:
			PaintsStore.updatePaint(results);
		break;

		case ActionConstants.REMOVE_PAINT:
			PaintsStore.removePaint(results);
		break;

		case ActionConstants.RECEIVE_PAINTS_AND_VENDORS:
			PaintsStore.setPaintsAndVendors(action.paints, action.vendors);
		break;

        case ActionConstants.RECEIVE_PAINTS:
			PaintsStore.setPaints(results);
        break;

		case ActionConstants.PAINTS_ERROR:
			setStoreFlashMessage(results);
			removeToken();
		break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    PaintsStore.emitChange();

    return true;
});

export default PaintsStore;