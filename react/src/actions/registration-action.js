import AppDispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import Registration from '../services/registration';

let RegistrationAction = {
	newPassword: function(data)  {
		Registration
			.post('http://mcs.dev/registration/password/reset', data)
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
	}
};

export default RegistrationAction;