import React from 'react';
import _ from 'lodash';
import { upperFirstLetter, getNestedModifiedState } from '../../../helper/utils';

class SettingsUser extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			selectedItem: '',
			isChecked: false
		};

		this.onHandleFormChange = this.onHandleFormChange.bind(this);
		this.onHandleCheckbox   = this.onHandleCheckbox.bind(this);
	}

	// Next state change
	componentWillReceiveProps(nextProps) {
		if (nextProps.user.id !== this.state.selectedItem) {
			this.setState({
				selectedItem: nextProps.user.id
			});
		}
	}

	// Handle input changes
	onHandleFormChange(event) {
		let fieldName 	= event.target.name;
		let chosenValue = event.target.value;
		let user        = this.props.user;
		let modifiedObj = {}

		switch (fieldName) {
			case 'first_name':
			case 'last_name':
				modifiedObj[fieldName] = upperFirstLetter(chosenValue);
			break;

			case 'username':
				let username = chosenValue.toLowerCase();
				let temp   = [];

				// Add username to all groups
				user.groups.map(group => {
					group.username = username;
					temp.push(group);
				});

				modifiedObj = {
					username: username,
					groups: temp
				}
			break;

			case 'groups':
				let existingGroup = user.groups;
				let newGroup 	  = [];

				// Iterate selected options
				existingGroup.slice.call(event.target.selectedOptions).map(role => {
					let selectedRole = role.value;

					// Find out if the selected role already exists
					let foundGroup = existingGroup.find(existingRole => existingRole.role === selectedRole);

					// Add new role object
					if (!foundGroup) {
						foundGroup = {
							id: '',
							username: user.username,
							role: selectedRole,
							users: []
						};

						let group = user.groups.find(clonedRole => clonedRole.role === foundGroup.role);

						return newGroup.push(!group ? foundGroup : group);
					} else {
						// Make sure if an existing object with all the properties already exists
						let group = user.groups.find(clonedRole => clonedRole.role === foundGroup.role);

						newGroup.push(!group ? foundGroup : group);
					}
				});

				modifiedObj[fieldName] = newGroup;
			break;

			case 'confirm_password':
				// Make sure confirmation password matches
				if (this.props.user.password !== chosenValue) {
					event.target.setCustomValidity("Confirmation password needs to match.");
				} else {
					event.target.setCustomValidity("");
				}
			break;

			default:
				modifiedObj[fieldName] = chosenValue;
		}

		this.props.onChange(getNestedModifiedState(user, modifiedObj));
	}

	// Handle multi-select
	onHandleCheckbox(event) {
		const target = event.target;
		const value  = target.type === 'checkbox' ? target.checked : target.value;

		this.setState({
			isChecked: value
		});
	}

	// Render
	render() {
		let rolesOptions = this.props.user.groups.map((obj) => {
			return (obj.role);
		});

		let credentialFields = !this.props.isEditingMode ?
			<div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Password</label>
						<div className="input-group">
							<input
								name="password"
								type={ this.state.isChecked ? 'text' : 'password' }
								className="form-control input-sm"
								onChange={ this.onHandleFormChange }
								required="required"
							/>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Confirm Password</label>
						<div className="input-group">
							<input
								name="confirm_password"
								type={ this.state.isChecked ? 'text' : 'password' }
								className="form-control input-sm"
								onChange={ this.onHandleFormChange }
								required="required"
							/>
						</div>
					</div>
				</div>
			</div> : null;

		let userForm =
			<form onSubmit={ this.props.onSubmit }>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Groups</label>
						<div className="input-group">
							<select
								name="groups"
								multiple={ true }
								onChange={ this.onHandleFormChange }
								value={ rolesOptions }
								className="form-control"
								required="required">
								<option value="ROLE_USER">User</option>
								<option value="ROLE_ADMIN">Admin</option>
								<option value="ROLE_SUPER_ADMIN">Super Admin</option>
							</select>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-12">
						<label className="control-label">First Name</label>
						<div className="input-group">
							<input
								name="first_name"
								type="text"
								className="form-control input-sm"
								value={ this.props.user.first_name }
								onChange={ this.onHandleFormChange }
								required="required"
							/>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-12">
						<label className="control-label">Last name</label>
						<div className="input-group">
							<input
								name="last_name"
								type="text"
								className="form-control input-sm"
								value={ this.props.user.last_name }
								onChange={ this.onHandleFormChange }
								required="required"
							/>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-12">
						<label className="control-label">Email</label>
						<div className="input-group">
							<input
								name="email"
								type="email"
								className="form-control input-sm"
								value={ this.props.user.email }
								onChange={ this.onHandleFormChange }
								required="required"
							/>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-12">
						<label className="control-label">Username</label>
						<div className="input-group">
							<input
								name="username"
								type="text"
								className="form-control input-sm"
								value={ this.props.user.username }
								onChange={ this.onHandleFormChange }
								required="required"
							/>
						</div>
					</div>
				</div>
				{ credentialFields }
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="checkbox">
							<label>
								<input
									type="checkbox"
									checked={ this.state.isChecked }
									onChange={ this.onHandleCheckbox }
								/>
							Show password</label>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input type="hidden" value={ this.props.user.id }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-12">
						<div className="clearfix">
							<button type="submit" value="Save"><i className="fa fa-floppy-o"/> Save</button>
						</div>
					</div>
				</div>
			</form>;

		return (
			<div>{ userForm }</div>
		);
	}
}

export default SettingsUser;