import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';

let _apiVehicles = [];
let _storeMsg;

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

    getApiVehicles: function () {
		return _apiVehicles;
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

        default:
            return true;
    }

    // If action was responded to, emit change event
    ApiVehiclesStore.emitChange();

    return true;

});

export default ApiVehiclesStore;