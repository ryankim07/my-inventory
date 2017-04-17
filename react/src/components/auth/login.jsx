import React from 'react';
import AuthStore from '../../stores/auth-store';
import AuthAction from '../../actions/auth-action';

class Login extends React.Component
{
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			authenticated: false
		}

		this._onChange = this._onChange.bind(this);
		this.login = this.login.bind(this);
	}

	componentWillMount() {
		AuthStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
		AuthStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		let isAuthenticated = AuthStore.isAuthenticated();

		if (isAuthenticated){
			this.context.router.push("/");
			return false;
		}

		this.setState({authenticated: isAuthenticated});
	}

	// Submit
	login(event) {
		event.preventDefault();

		AuthAction.login({
			'username': this.refs.username.value,
			'password': this.refs.password.value
		});
	}

	render() {
		let errorMessage;
		if (this.state.error) {
			errorMessage = (
				<div className='state-error' style={{ paddingBottom: 16 }}>
					{ this.state.error }
				</div>
			);
		}

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
					{ errorMessage }
					Email: <input defaultValue="rkim07" ref="username" style={{ maxWidth: "100%" }} type="text" />
					<br/>
					Password: <input defaultValue="123" ref="password" style={{ maxWidth: "100%" }} type="password" />
					<br/>
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
			<form onSubmit={this.login}>
        		 <div className="col-xs-12 col-md-12" id="auth">
					 <div className="row">
						 { loginForm }
					</div>
				 </div>
			</form>
		);
	}
}

Login.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default Login;