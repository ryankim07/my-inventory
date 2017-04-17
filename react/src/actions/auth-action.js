import AppDispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import Auth from '../services/Auth';

let AuthAction = {
	login: function(data)  {
		Auth
			.post('http://mcs.dev/login', data)
			.then(function (results) {
				let token = results.token;

				AppDispatcher.handleViewAction({
					actionType: ActionConstants.LOGIN_USER,
					token: token
				});
			})
			.catch(function() {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.LOGIN_USER_ERROR,
					msg: 'There was a problem login user'
				});
			});
	},

	/*logout: function(data) {
		Auth
			.post('http://mcs.dev/logout', data)
			.then(function (results) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.LOGOUT_USER,
					results: results
				});
			})
			.catch(function() {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.LOGOUT_USER_ERROR,
					msg: 'There was a problem login out user'
				});
			});
	}*/
};

export default AuthAction;