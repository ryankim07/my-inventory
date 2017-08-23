import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
import _ from 'lodash';

let _paints = [];
let _errStatus;
let _storeMsg;

function setPaints(paints) {
    _paints = paints ;
}

let PropertiesPaintsStore = assign({}, EventEmitter.prototype, {
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

	getPropertyPaints: function () {
		return _paints;
	},

	setPropertyPaints: function (paints) {
		if (paints.msg) {
			setStoreFlashMessage(paints.msg)
		} else {
			setPaints(paints)
		}
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
	}
});

// Register callback with AppDispatcher
PropertiesPaintsStore.dispatchToken = Dispatcher.register(function(payload) {

    let action = payload.action;

    switch(action.actionType) {
        case ActionConstants.RECEIVE_PROPERTY_PAINTS:
			PropertiesPaintsStore.setPropertyPaints(action.results);
        break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    PropertiesPaintsStore.emitChange();

    return true;
});

export default PropertiesPaintsStore;