import AppDispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import Api from '../services/api';

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
					results: resp.status + ' : ' + resp.msg
				});
			});
	},

	addProperty: function(data) {
		Api
			.post('http://mcs.dev/api/property', data)
			.then(function (resp) {
				AppDispatcher.handleViewAction({
					actionType: data.obj_type === 'rooms' ?
						ActionConstants.ADD_PROPERTY_ROOM : ActionConstants.ADD_PROPERTY,
					results: resp
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.PROPERTIES_ERROR,
					results: resp.status + ' : ' + resp.msg
				});
			});
	},

	updateProperty: function(data) {
		Api
			.post('http://mcs.dev/api/property', data)
			.then(function (resp) {
				AppDispatcher.handleViewAction({
					actionType: data.obj_type === 'rooms' ?
						ActionConstants.UPDATE_PROPERTY_ROOM : ActionConstants.UPDATE_PROPERTY,
					results: resp
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.PROPERTIES_ERROR,
					results: resp.status + ' : ' + resp.msg
				});
			});
	},

    removeProperty: function(id) {
        Api
            .delete('http://mcs.dev/api/properties/' + id)
            .then(function (resp) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.REMOVE_PROPERTY,
					results: resp
                });
            })
            .catch(function(resp) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.PROPERTIES_ERROR,
					results: resp.status + ' : ' + resp.msg
                });
            });
    },

	removePropertyRoom: function(propertyId, roomId) {
		Api
			.delete('http://mcs.dev/api/properties/' + propertyId + '/rooms/' + roomId)
			.then(function (resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.REMOVE_PROPERTY_ROOM,
					results: resp
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.PROPERTIES_ERROR,
					results: resp.status + ' : ' + resp.msg
				});
			});
	}
};

export default PropertiesAction;