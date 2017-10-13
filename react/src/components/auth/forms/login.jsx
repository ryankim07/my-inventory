import React from 'react';
import { PropTypes } from 'prop-types';
import AuthStore from '../../../stores/auth/store';
import AuthAction from '../../../actions/auth-action';
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
		}

		this._onChange 			= this._onChange.bind(this);
		this.onHandleFormChange = this.onHandleFormChange.bind(this);
		this.onHandleFormSubmit = this.onHandleFormSubmit.bind(this);
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
		let flashMsg 		= AuthStore.getStoreFlashMessage();

		if (isAuthenticated){
			this.context.router.push("/");
			return false;
		}

		this.setState({
			authenticated: isAuthenticated,
			flashMessage: flashMsg !== undefined ? flashMsg : null
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
	onHandleFormSubmit(event) {
		event.preventDefault();

		AuthAction.login({
			username: this.state.username,
			password: this.state.password
		});
	}

	// Render
	render() {
		let loginForm =
			<form onSubmit={ this.onHandleFormSubmit }>
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
							<div className="col-xs-12 col-md-8">
								<label className="control-label">Remember me</label>
								<div className="input-group">
									<input
										type="checkbox"
										id="remember_me"
										name="_remember_me"
										className="form-control input-sm"
									/>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="col-xs-12 col-md-12">
								<div className="clearfix">
									<input type="submit" value="Submit" className="btn"/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>	;

		return (
			<div className="row">
				{
					!this.state.flashMessage ?
						null : <FlashMessage message={ this.state.flashMessage } alertType="alert-danger" />
				}

				<div className="row" id="login-form">
					<div className="panel panel-info">
						<div className="panel-heading">
							<div className="row">
								<div className="col-xs-10 col-md-10">
									<span>Login</span>
								</div>
								<div className="col-xs-2 col-md-2"/>
							</div>
						</div>
						<div className="panel-body">
							{ loginForm }
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AuthLogin.contextTypes = {
	router: PropTypes.object.isRequired
}

export default AuthLogin;