import React from 'react';
import { PropTypes } from 'prop-types';
import AuthStore from '../../../stores/auth/store';
import AuthAction from '../../../actions/auth-action';
import DisplayPanel from '../../helper/panels/display';
import FlashMessage from '../../helper/flash_message';

class AuthLogin extends React.Component
{
	// Constructor
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			authenticated: false,
			flashMessage: null
		};

		this._onChange 			= this._onChange.bind(this);
		this.onHandleFormChange = this.onHandleFormChange.bind(this);
		this.onHandleSubmit 	= this.onHandleSubmit.bind(this);
	}

	// Mounting event
	componentWillMount() {
		AuthStore.addChangeListener(this._onChange);
	}

	// Unmounting event
	componentWillUnmount() {
		AuthStore.removeChangeListener(this._onChange);
	}

	// Form changes
	_onChange() {
		let isAuthenticated = AuthStore.isAuthenticated();
		let flashMsg 		= AuthStore.getStoreStatus();

		if (isAuthenticated){
			this.context.router.history.push("/");
			return false;
		}

		this.setState({
			authenticated: isAuthenticated,
			flashMessage: flashMsg !== null ? flashMsg : null
		});
	}

	// Handle input changes
	onHandleFormChange(propertyName, event) {
		let obj = {
			[propertyName]: event.target.value
		};

		this.setState(obj);
	}

	// Submit
	onHandleSubmit(event) {
		event.preventDefault();

		AuthAction.login({
			username: this.state.username,
			password: this.state.password
		});
	}

	// Render
	render() {
		let loginForm =
			<form onSubmit={ this.onHandleSubmit }>
				<div className="col-xs-12 col-md-12" id="auth">
					<div className="row">
						<div className="form-group required">
							<div className="col-xs-12 col-md-8">
								<label className="control-label">Username</label>
								<div className="input-group">
									<input
										type="text"
										value={ this.state.username }
										className="form-control input-sm"
										onChange={ this.onHandleFormChange.bind(this, 'username') }
										required="required"/>
								</div>
							</div>
						</div>
						<div className="form-group required">
							<div className="col-xs-12 col-md-8">
								<label className="control-label">Password</label>
								<div className="input-group">
									<input
										type="password"
										value={ this.state.password }
										className="form-control input-sm"
										onChange={ this.onHandleFormChange.bind(this, 'password') }
										required="required"/>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="col-xs-12 col-md-12">
								<div className="clearfix">
									<input type="submit" value="Login"/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>	;

		let flashMessage = this.state.flashMessage ?
			<FlashMessage message={ this.state.flashMessage } alertType="danger"/> : null;

		return (
			<div className="row">
				{ flashMessage }

				<DisplayPanel
					id="login-form"
					header="Login"
					additionalHeader=""
					iconBtn=""
					onClick=""
					previousRoute="">
					{ loginForm }
				</DisplayPanel>
			</div>
		);
	}
}

AuthLogin.contextTypes = {
	router: PropTypes.object.isRequired
};

export default AuthLogin;