import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';

let _manufacturers = [];
let _rightPanel = false;
let _storeMsg;

function setStoreFlashMessage(msg) {
	_storeMsg = msg;
}

function removeToken() {
	localStorage.removeItem('id_token');
}

let ManufacturersStore = assign({}, EventEmitter.prototype, {
    // Emit Change event
    emitChange: function(){
        this.emit('change');
    },

    /**
     *
     * @param callback
     */
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

	setManufacturers: function(results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			return false;
		} else {
			if (results.length !== 0) {
				_manufacturers = results;
			}
		}
	},

    getManufacturers: function () {
		return _manufacturers;
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
ManufacturersStore.dispatchToken = Dispatcher.register(function(payload) {

    let action  = payload.action;
    let results = action.results;

    switch(action.actionType) {
        case ActionConstants.RECEIVE_MANUFACTURERS:
			ManufacturersStore.setManufacturers(results);
        break;

		case ActionConstants.MANUFACTURERS_ERROR:
			setStoreFlashMessage(msg);
			removeToken();
		break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    ManufacturersStore.emitChange();

    return true;

});

export default ManufacturersStore;