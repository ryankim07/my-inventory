import React from 'react';
import RegistrationAction from '../../../actions/registration-action';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import { passwordResetValidators } from '../../helper/validation/password_reset';
import { updateValidators, resetValidators, displayValidationErrors, isFormValid } from '../../helper/validation/validator';
import { getSingleModifiedState } from '../../helper/utils';

class AuthPasswordReset extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			confirmPassword: ''
		};

		// Initiate validators
		resetValidators(passwordResetValidators);

		this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	}

	// Handle errors
	onHandleChange(event) {
		let fieldName   = event.target.name;
		let chosenValue = event.target.value;

		this.setState(getSingleModifiedState(this.state, fieldName,  chosenValue));
		updateValidators(passwordResetValidators, fieldName, chosenValue);
	}

	// Submit
	onHandleSubmit(event) {
		event.preventDefault();

		RegistrationAction.newPassword({
			username: this.state.username,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword
		});
	}

	render() {
		let cardStyle = {
			display: 'block',
			width: '40vw',
		};

		return (
			<div className="login-form">
				<form onSubmit={ this.onHandleSubmit }>
					<Card style={ cardStyle }>
						<CardHeader
							title="Reset Your Password"
							titleStyle={ { fontSize: '36px' } }
							subtitle=""
						/>
						<CardText>
								<div><span>To reset your MyInventory password, enter all the information below.</span></div>
								<div className="textfield-container">
									<div>
										<TextField
											name="username"
											type="text"
											value={ this.state.username }
											floatingLabelText="Username"
											errorText={ displayValidationErrors(passwordResetValidators['email']) }
											onChange={ this.onHandleChange }
										/>
									</div>
								</div>
								<div className="textfield-container">
									<div>
										<TextField
											name="password"
											type="password"
											value={ this.state.password }
											floatingLabelText="New password"
											errorText={ displayValidationErrors(passwordResetValidators['password']) }
											onChange={ this.onHandleChange }
										/>
									</div>
								</div>
								<div className="textfield-container">
									<div>
										<TextField
											name="confirm-password"
											type="password"
											value={ this.state.confirmPassword }
											floatingLabelText="Confirm password"
											errorText={ displayValidationErrors(passwordResetValidators['confirm_password']) }
											onChange={ this.onHandleChange }
										/>
									</div>
								</div>
						</CardText>
						<CardActions>
							<RaisedButton
								type="submit"
								label="Reset"
								disabled={ isFormValid(passwordResetValidators) ? false : true }
							/>
						</CardActions>
					</Card>
				</form>
			</div>
		);
	}
}

export default AuthPasswordReset;