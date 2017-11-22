import AppDispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import Users from '../services/users';

let UsersAction = {
	getUsers: function() {
		Users
			.get('http://mcs.dev/api/users')
			.then(function (resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.RECEIVE_USERS,
					results: resp
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.USERS_ERROR,
					results: resp.status + ' : ' + resp.msg
				});
			});
	},

	addUser: function(data) {
		Users
			.post('http://mcs.dev/api/user', data)
			.then(function (resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.ADD_USER,
					results: resp
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.USERS_ERROR,
					results: resp.status + ' : ' + resp.msg
				});
			});
	},

	updateUser: function(data) {
		Users
			.post('http://mcs.dev/api/user', data)
			.then(function (resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.UPDATE_USER,
					results: resp
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.USERS_ERROR,
					results: resp.status + ' : ' + resp.msg
				});
			});
	},

	removeUser: function(id) {
		Users
			.delete('http://mcs.dev/api/users/' + id)
			.then(function (resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.REMOVE_USER,
					results: resp
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.USERS_ERROR,
					results: resp.status + ' : ' + resp.msg
				});
			});
	}/*,

	newPasswordLink: function(data)  {
		Auth
			.post('http://mcs.dev/auth/password/link', data)
			.then(function (resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.NEW_PASSWORD_LINK,
					token: resp.token
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.NEW_PASSWORD_LINK_ERROR,
					status: resp.status,
					results: resp.msg
				});
			});
	}*/
};

export default UsersAction;