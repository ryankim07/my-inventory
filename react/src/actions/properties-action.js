import AppDispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import Api from '../services/Api';

let PropertiesAction = {

	getProperties: function() {
        Api
            .get('http://mcs.dev/api/properties')
            .then(function (properties) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_PROPERTIES,
                    results: properties
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

    addProperty: function(data) {
        Api
            .post('http://mcs.dev/api/property', data, data.assets)
            .then(function (property) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.ADD_PROPERTY,
					results: property
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

	updateProperty: function(data) {
		Api
			.post('http://mcs.dev/api/property', data, data.assets)
			.then(function (property) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.UPDATE_PROPERTY,
					results: property
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

    removeProperty: function(id) {
        Api
            .delete('http://mcs.dev/api/properties/' + id)
            .then(function (property) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.REMOVE_PROPERTY,
					results: property
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

export default PropertiesAction;