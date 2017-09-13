import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';

let _manufacturers = [];

function setApiManufacturers(manufacturers) {
    _manufacturers = manufacturers ;
}

let ApiVehiclesStore = assign({}, EventEmitter.prototype, {
    getApiVehicles: function () {
        return _manufacturers;
    },

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
    }
});

// Register callback with AppDispatcher
ApiVehiclesStore.dispatchToken = Dispatcher.register(function(payload) {

    let action = payload.action;

    switch(action.actionType) {
        case ActionConstants.RECEIVE_MFGS:
            setApiManufacturers(action.results);
        break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    ApiVehiclesStore.emitChange();

    return true;

});

export default ApiVehiclesStore;