import AppDispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import Auth from '../services/Auth';

let AuthAction = {
	login: function(data)  {
		Auth
			.post('http://mcs.dev/auth/login', data)
			.then(function (resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.LOGIN_USER,
					token: resp.token
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.LOGIN_USER_ERROR,
					status: resp.status,
					results: resp.msg
				});
			});
	}
};

export default AuthAction;