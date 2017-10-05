import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';

let _apiVehicles = [];
let _rightPanel = false;
let _errStatus;
let _storeMsg;

function setStoreFlashMessage(msg) {
	_storeMsg = msg;
}

function setErrorStatus(status) {
	_errStatus = status;
}

function removeToken() {
	localStorage.removeItem('id_token');
}

let ApiVehiclesStore = assign({}, EventEmitter.prototype, {
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

	setApiVehicles: function(results) {
		if (results.err_msg) {
			_storeMsg = results.err_msg;
			return false;
		} else {
			if (results.length !== 0) {
				_apiVehicles = results;
			}
		}
	},

    getApiVehicles: function () {
		return _apiVehicles;
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
ApiVehiclesStore.dispatchToken = Dispatcher.register(function(payload) {

    let action  = payload.action;
    let results = action.results;

    switch(action.actionType) {
        case ActionConstants.RECEIVE_API_VEHICLES:
			ApiVehiclesStore.setApiVehicles(results);
        break;

		case ActionConstants.API_VEHICLES_ERROR:
			setStoreFlashMessage(msg);
			setErrorStatus(status);
			removeToken();
		break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    ApiVehiclesStore.emitChange();

    return true;

});

export default ApiVehiclesStore;