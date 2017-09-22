import React from 'react';
import AuthStore from '../../stores/auth/store';
import UsersStore from '../../stores/auth/users-store';
import UsersAction from '../../actions/users-action';
import FlashMessage from '../helper/flash-message';

class Signup extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			user: {
				email: null,
				username: null,
				password: null,
				confirm_password: null,
				role: null
			},
			isNewUser: false,
			newUserAdded: false,
			loader: true,
			flashMessage: null
		};

		this._onChange = this._onChange.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	componentWillMount() {
		AuthStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
		AuthStore.removeChangeListener(this._onChange);
		UsersStore.removeChangeListener(this._onChange);
		UsersStore.unsetUserToUpdate();
	}

	_onChange() {
		let addingNewUser = UsersStore.isNewUserAdded();
		let userToUpdate = UsersStore.getUserToUpdate();
		let isNewUser = this.state.isNewUser;
		let stateUser = this.state.user;
		let flashMsg = UsersStore.getStoreFlashMessage();
		let isAuthenticated = UsersStore.isAuthenticated();

		if (!isAuthenticated){
			this.context.router.push("/auth/login");
			return false;
		}

		if (!_.every(_.values(userToUpdate), function(v) {return !v;})) {
			stateUser = userToUpdate;
			isNewUser = true;
		}

		this.setState({
			user: stateUser,
			isNewUser: isNewUser,
			newUserAdded: addingNewUser,
			loader: false,
			flashMessage: flashMsg !== undefined ? flashMsg : null
		});
	}

	// Handle input changes
	handleFormChange(propertyName, event) {
		let user = this.state.user;
		let chosenValue = event.target.value;

		user[propertyName] = event.target.value;

		this.setState({
			user: user,
			isNewUser: this.state.isNewUser,
			newUserAdded: this.state.newUserAdded,
			loader: false,
			flashMessage: null
		});
	}

	// Submit
	handleFormSubmit(event) {
		event.preventDefault();

		let data = {
			email: this.refs.email.value,
			username: this.refs.username.value,
			password: this.refs.password.value,
			role: this.refs.role.value
		};

		if (!this.state.isNewUser) {
			UsersAction.addUser(data);
		} else {
			UsersAction.updateUser(data);
		}
	}

	render() {
		return (
			<form onSubmit={this.handleFormSubmit}>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Role</label>
						<div className="input-group">
							<select ref="role"
									onChange={this.handleFormChange.bind(this, 'role')}
									value={this.state.user.role}
									className="form-control input-sm"
									required="required">
								<option value="">Select One</option>
								<option value="ROLE_USER">User</option>
								<option value="ROLE_ADMIN">Admin</option>
							</select>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-12">
						<label className="control-label">Email</label>
						<div className="input-group">
							<input type="email"
								   	ref="email"
								   	className="form-control input-sm"
								   	required="required"
								   	value={this.state.user.email}
								   	onChange={this.handleFormChange.bind(this, 'email')} />
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-12">
						<label className="control-label">Username</label>
						<div className="input-group">
							<input type="text"
								   	ref="username"
								   	className="form-control input-sm"
								   	required="required"
								   	value={this.state.user.username}
								   	onChange={this.handleFormChange.bind(this, 'username')} />
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
								   required="required" />
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Confirm Password</label>
						<div className="input-group">
							<input type="password"
								   ref="confirm_password"
								   className="form-control input-sm"
								   required="required" />
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
			</form>
		);
	}
}

export default Signup;