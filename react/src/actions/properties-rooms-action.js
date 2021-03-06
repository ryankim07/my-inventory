import AppDispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import Api from '../services/Api';

let PropertiesRoomsAction = {

	getNonAddedRooms: function(id) {
		Api
			.get('http://mcs.dev/api/properties/non-added-rooms/property/' + id)
			.then(function(rooms) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.RECEIVE_NON_ADDED_ROOMS,
					results: rooms
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

    addRoom: function(data) {
        Api
            .post('http://mcs.dev/api/property/room', data)
            .then(function (room) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.ADD_PROPERTY_ROOM,
					results: room
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

	updateRoom: function(data) {
		Api
			.post('http://mcs.dev/api/property/room', data)
			.then(function (room) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.UPDATE_PROPERTY_ROOM,
					results: room
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

    removeRoom: function(id) {
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
                    actionType: ActionConstants.RECEIVE_ERROR,
					status: resp.status,
					msg: resp.msg
                });
            });
    }
};

export default PropertiesRoomsAction;