import React from 'react';
import { PropTypes } from 'prop-types'
import AppDispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';

class Logout extends React.Component
{
	componentWillMount() {
		AppDispatcher.handleViewAction({actionType: ActionConstants.LOGOUT_USER});
		this.context.router.push("/auth/login");
	}

	render() {
		return null;
	}
}

Logout.contextTypes = {
	router: PropTypes.object.isRequired
}

export default Logout;