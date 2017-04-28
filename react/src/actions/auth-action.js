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
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.LOGIN_USER_ERROR,
					status: resp.status,
					msg: resp.msg
				});
			});
	}
};

export default AuthAction;