import React from 'react';
import AppDispatcher from '../../../dispatcher/app-dispatcher';
import ActionConstants from '../../../constants/action-constants';

class AuthLogout extends React.Component
{
	componentWillMount() {
		AppDispatcher.handleViewAction({actionType: ActionConstants.LOGOUT_USER});
		this.props.history.push("/");
	}

	render() {
		return null;
	}
}

export default AuthLogout;