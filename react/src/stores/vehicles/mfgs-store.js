import {EventEmitter} from 'events';
import assign from 'object-assign';
import Dispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';

let _manufacturers = [];
let _page = 1;
let _totalCount = 0;
let _totalPages = 0;
let _limit = 0;
let _rightPanel = false;
let _storeMsg;
let _alertType = 'success';

function setStoreFlashMessage(msg) {
	_storeMsg = msg;
}

function removeToken() {
	localStorage.removeItem('token');
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
			_alertType = 'danger';
			return false;
		} else {
			if (results.length !== 0) {
				_manufacturers = results.list;
				_page          = results.page;
				_totalCount    = results.total_count;
				_totalPages    = results.total_pages;
				_limit         = results.limit;
			}
		}
	},

    getManufacturers: function () {
		return _manufacturers;
	},

	getPage: function() {
		return _page;
	},

	getTotalCount: function() {
		return _totalCount;
	},

	getTotalPages: function() {
		return _totalPages;
	},

	getLimit: function() {
		return _limit;
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
ManufacturersStore.dispatchToken = Dispatcher.register(function(payload) {

    let action  = payload.action;
    let results = action.results;

    switch(action.actionType) {
        case ActionConstants.RECEIVE_MANUFACTURERS:
			ManufacturersStore.setManufacturers(results);
        break;

		case ActionConstants.MANUFACTURERS_ERROR:
			setStoreFlashMessage(results);
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