import React from 'react';
import AuthStore from '../../stores/auth/store';
import AuthAction from '../../actions/auth-action';
import FlashMessage from '../helper/flash-message';

class Login extends React.Component
{
	constructor() {
		super();
		this.state = {
			username: null,
			password: null,
			authenticated: false,
			flashMessage: null
		}

		this._onChange = this._onChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	componentWillMount() {
		AuthStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
		AuthStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		let flashMsg = AuthStore.getStoreFlashMessage();
		let isAuthenticated = AuthStore.isAuthenticated();

		if (isAuthenticated){
			this.context.router.push("/");
			return false;
		}

		this.setState({
			username: this.state.username,
			password: this.state.password,
			authenticated: isAuthenticated,
			flashMessage: flashMsg !== undefined ? flashMsg : null
		});
	}

	// Submit
	handleFormSubmit(event) {
		event.preventDefault();

		AuthAction.login({
			'username': this.refs.username.value,
			'password': this.refs.password.value
		});
	}

	render() {
		let loginForm;
		if (this.state.username) {
			loginForm = (
				<div>
					<p>
						You're logged in as <strong>{ this.state.username }</strong>.
					</p>
				</div>
			);
		} else {
			loginForm = (
				<div>
					<div className="form-group required">
						<div className="col-xs-12 col-md-8">
							<label className="control-label">Username</label>
							<div className="input-group">
								<input type="text"
									   ref="username"
									   className="form-control input-sm"
									   required="required"
									   defaultValue="rkim07"/>
							</div>
						</div>
					</div>
					<div className="form-group required">
						<div className="col-xs-12 col-md-8">
							<label className="control-label">Password</label>
							<div className="input-group">
								<input type="password"
									   ref="password"
									   className="form-control input-sm"
									   required="required"
									   defaultValue="123"/>
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
			);
		}
		return (
			<div className="row">
				{ !this.state.flashMessage ? null : <FlashMessage message={this.state.flashMessage} alertType="alert-danger" />}
				<form onSubmit={this.handleFormSubmit}>
					 <div className="col-xs-12 col-md-12" id="auth">
						 <div className="row">
							 { loginForm }
						</div>
					 </div>
				</form>
			</div>
		);
	}
}

Login.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default Login;