import React from 'react';
import { upperFirstLetter, arrayDiff } from '../../helper/utils';

class AuthForm extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			user: this.props.user,
			clonedGroup: JSON.parse(JSON.stringify(this.props.user.groups))
		};

		this.onHandleFormChange = this.onHandleFormChange.bind(this);
		this.handleFormSubmit   = this.handleFormSubmit.bind(this);
	}

    // Next state change
	componentWillReceiveProps(nextProps) {
		if (nextProps.user !== this.state.user) {
			this.setState({
				user: nextProps.user,
				clonedGroup: JSON.parse(JSON.stringify(nextProps.user.groups))
			});
		}
	}

	// Handle input changes
	onHandleFormChange(propertyName, event) {
		let user 		= this.state.user;
		let chosenValue = event.target.value;

		switch (propertyName) {
			case 'first_name':
			case 'last_name':
				user[propertyName] = upperFirstLetter(chosenValue);
			break;

			case 'username':
				let username = chosenValue.toLowerCase();

				// Add username to all groups
				user.groups.map(group => {
					group['username'] = username;
				});

				user[propertyName] = username;
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
							username: this.state.user.username,
							role: selectedRole,
							users: []
						};

						let group = this.state.clonedGroup.find(clonedRole => clonedRole.role === foundGroup.role);

						return newGroup.push(!group ? foundGroup : group);
					} else {
						// Make sure if an existing object with all the properties already exists
						let group = this.state.clonedGroup.find(clonedRole => clonedRole.role === foundGroup.role);

						newGroup.push(!group ? foundGroup : group);
					}
				});

				user[propertyName] = newGroup;
			break;

			default:
				user[propertyName] = chosenValue;
		}

		this.setState({
			user: user
		});
	}

	// Submit
	handleFormSubmit(event) {
		event.preventDefault();

		this.props.onHandleFormSubmit(this.state.user);
	}

	// Render
	render() {
		let user = this.state.user;
		let rolesOptions = user.groups.map((obj) => {
			return (obj.role);
		});

		let userForm =
			<form onSubmit={ this.handleFormSubmit }>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Groups</label>
						<div className="input-group">
							<select
								multiple={ true }
								onChange={ this.onHandleFormChange.bind(this, 'groups') }
								value={ rolesOptions }
								className="form-control input-sm"
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
								type="email"
								className="form-control input-sm"
								value={ user.first_name }
								onChange={ this.onHandleFormChange.bind(this, 'first_name') }
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
								type="email"
								className="form-control input-sm"
								value={ user.last_name }
								onChange={ this.onHandleFormChange.bind(this, 'last_name') }
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
								type="email"
								className="form-control input-sm"
								value={ user.email }
								onChange={ this.onHandleFormChange.bind(this, 'email') }
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
								type="text"
								className="form-control input-sm"
								value={ user.username }
								onChange={ this.onHandleFormChange.bind(this, 'username') }
								required="required"
							/>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Password</label>
						<div className="input-group">
							<input
								type="password"
								className="form-control input-sm"
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
								type="password"
								className="form-control input-sm"
								required="required"
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input type="hidden" value={ user.id }/>
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
			</form>;

		return (
			<div className="row" id="user-form">
				<div className="panel panel-info">
					<div className="panel-heading">
						<div className="row">
							<div className="col-xs-10 col-md-10">
								<span>Vehicle</span>
							</div>
							<div className="col-xs-2 col-md-2">
								<button onClick={ this.props.closeRightPanel }><i className="fa fa-window-close" aria-hidden="true" /></button>
							</div>
						</div>
					</div>
					<div className="panel-body">
						{ userForm }
					</div>
				</div>
			</div>
		);
	}
}

export default AuthForm;