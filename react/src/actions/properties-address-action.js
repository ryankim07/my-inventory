import AppDispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import Api from '../services/Api';

let PropertiesAddressAction = {
    getAddresses: function() {
        Api
            .get('http://mcs.dev/api/properties/addresses')
            .then(function (addresses) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_PROPERTIES_ADDRESSES,
					addresses: addresses
                });
            })
            .catch(function(resp) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_ERROR,
                    status: resp.status,
					msg: resp.msg
                });
            });
    },

    addAddress: function(data) {
        Api
            .post('http://mcs.dev/api/property/address', data)
            .then(function (results) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.ADD_PROPERTY_ADDRESS,
					results: results
                });
            })
            .catch(function(resp) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_ERROR,
					status: resp.status,
					msg: resp.msg
                });
            });
    },

	updateAddress: function(data) {
		Api
			.post('http://mcs.dev/api/property/address', data)
			.then(function (results) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.UPDATE_PROPERTY_ADDRESS,
					results: results
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.RECEIVE_ERROR,
					status: resp.status,
					msg: resp.msg
				});
			});
	},

    removeAddress: function(id) {
        Api
            .delete('http://mcs.dev/api/properties/addresses/' + id)
            .then(function (results) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.REMOVE_PROPERTY_ADDRESS,
					results: results
                });
            })
            .catch(function(resp) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_ERROR,
					status: resp.status,
					msg: resp.msg
                });
            });
    }
};

export default PropertiesAddressAction;