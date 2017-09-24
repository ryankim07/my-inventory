import AppDispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import Api from '../services/Api';

let PropertiesAction = {

	getPropertiesAndPaints: function() {
		Api
			.getMultiple('http://mcs.dev/api/properties', 'http://mcs.dev/api/paints')
			.then(function ([properties, paints])  {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.RECEIVE_PROPERTIES_AND_PAINTS,
					properties: properties,
					paints: paints
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.PROPERTIES_ERROR,
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
                    results: properties
                });
            })
            .catch(function(resp) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.PROPERTIES_ERROR,
                    status: resp.status,
					msg: resp.msg
                });
            });
    },

	postProperty: function(data, editingMode) {
		Api
			.post('http://mcs.dev/api/property', data, data.assets)
			.then(function (property) {
				let actionType = !editingMode ? ActionConstants.ADD_PROPERTY : ActionConstants.UPDATE_PROPERTY;

				AppDispatcher.handleViewAction({
					actionType: actionType,
					results: property
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.PROPERTIES_ERROR,
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
                    actionType: ActionConstants.PROPERTIES_ERROR,
					status: resp.status,
					msg: resp.msg
                });
            });
    },

	postPropertyRoom: function(data, editingMode) {
		Api
			.post('http://mcs.dev/api/property/room', data)
			.then(function (room) {
				let actionType = !editingMode ? ActionConstants.PROPERTIES_ERROR : ActionConstants.UPDATE_PROPERTY_ROOM;

				AppDispatcher.handleViewAction({
					actionType: actionType,
					results: room
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.PROPERTIES_ERROR,
					status: resp.status,
					msg: resp.msg
				});
			});
	},

	removePropertyRoom: function(id) {
		Api
			.delete('http://mcs.dev/api/properties/rooms/' + id)
			.then(function (room) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.REMOVE_PROPERTY_ROOM,
					results: room
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.PROPERTIES_ERROR,
					status: resp.status,
					msg: resp.msg
				});
			});
	}
};

export default PropertiesAction;