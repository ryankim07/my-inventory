import React from 'react';
import { Link } from 'react-router-dom';
import AuthStore from '../../../stores/auth/store';
import AuthAction from '../../../actions/auth-action';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import FlashMessage from '../../helper/flash_message';
import { loginValidators } from '../../helper/validation/login';
import { updateValidators, resetValidators, displayValidationErrors, isFormValid } from '../../helper/validation/validator';
import { getSingleModifiedState } from '../../helper/utils';

class AuthLogin extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			authenticated: false,
			flashMessage: null
		};

		// Initiate validators
		resetValidators(loginValidators);

		this._onChange 		= this._onChange.bind(this);
		this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
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
			this.props.history.push("/");
			return false;
		}

		this.setState({
			authenticated: isAuthenticated,
			flashMessage: flashMsg !== null ? flashMsg : null
		});
	}

	// Handle errors
	onHandleChange(event) {
		let fieldName   = event.target.name;
		let chosenValue = event.target.value;

		this.setState(getSingleModifiedState(this.state, fieldName,  chosenValue));
		updateValidators(loginValidators, fieldName, chosenValue);
	}

	// Submit
	onHandleSubmit(event) {
		event.preventDefault();

		AuthAction.login({
			username: this.state.username,
			password: this.state.password
		});
	}

	render() {
		let flashMessage = this.state.flashMessage ?
			<FlashMessage message={ this.state.flashMessage } alertType="danger"/> : null;

		let cardStyle = {
			display: 'block',
			width: '40vw',
		};

		return (
			<div className="login-form">
				{ flashMessage }

				<form onSubmit={ this.onHandleSubmit }>
					<Card style={ cardStyle }>
						<CardHeader
							title="Sign into your account"
							titleStyle={ { fontSize: '36px' } }
							subtitle=""
						/>
						<CardText>
								<div className="textfield-container">
									<div><FontIcon className="material-icons">person</FontIcon></div>
									<div>
										<TextField
											name="username"
											type="text"
											value={ this.state.username }
											floatingLabelText="Username"
											errorText={ displayValidationErrors(loginValidators['username']) }
											onChange={ this.onHandleChange }
										/>
									</div>
								</div>
								<div className="textfield-container">
									<div><FontIcon className="material-icons">lock</FontIcon></div>
									<div>
										<TextField
											name="password"
											type="password"
											value={ this.state.password }
											floatingLabelText="Password"
											errorText={ displayValidationErrors(loginValidators['password']) }
											onChange={ this.onHandleChange }
										/><br/>
									</div>
								</div>
						</CardText>
						<CardActions>
							<RaisedButton
								type="submit"
								label="Login"
								disabled={ isFormValid(loginValidators) ? false : true }
							/><br/>
							<Link to="/auth/forms/password_reset" className="menu-link"><span className="icons-text">Forgot Password</span></Link>
						</CardActions>
					</Card>
				</form>
			</div>
		);
	}
}

export default AuthLogin;