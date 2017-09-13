import AppDispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import Api from '../services/Api';

let PropertiesAction = {

	getProperty: function(id) {
		Api
			.get('http://mcs.dev/api/properties/' + id)
			.then(function (results) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.GET_PROPERTY,
					results: results
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.GET_PROPERTY,
					status: resp.status,
					msg: resp.msg
				});
			});
	},

    getProperties: function() {
        Api
            .get('http://mcs.dev/api/properties')
            .then(function (properties) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_PROPERTIES,
                    properties: properties
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
            .then(function (results) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.ADD_PROPERTY,
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

	updateProperty: function(data) {
		Api
			.post('http://mcs.dev/api/property', data, data.assets)
			.then(function (results) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.UPDATE_PROPERTY,
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

    removeProperty: function(id) {
        Api
            .delete('http://mcs.dev/api/properties/' + id)
            .then(function (results) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.REMOVE_PROPERTY,
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

export default PropertiesAction;