import AppDispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import User from '../services/User';

let UsersAction = {
	getUsers: function() {
		User
			.get('http://mcs.dev/api/users')
			.then(function (results) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.RECEIVE_USERS,
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

	addUser: function(data) {
		User
			.post('http://mcs.dev/api/user', data)
			.then(function (results) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.ADD_NEW_USER,
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

	updateUser: function(data) {
		User
			.post('http://mcs.dev/api/user', data, data.assets)
			.then(function (results) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.UPDATE_USER,
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

	removeUser: function(id) {
		User
			.delete('http://mcs.dev/api/users/' + id)
			.then(function (results) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.REMOVE_USER,
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
};

export default UsersAction;