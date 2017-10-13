import React from 'react';

class AuthForm extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			user: this.props.user
		};

		this.onHandleFormChange = this.onHandleFormChange.bind(this);
		this.handleFormSubmit   = this.handleFormSubmit.bind(this);
	}

    // Next state change
	componentWillReceiveProps(nextProps) {
		if (nextProps.user !== this.props.user) {
			this.setState({
				user: nextProps.user
			});
		}
	}

	// Handle input changes
	onHandleFormChange(propertyName, event) {
		let user 		   = this.state.user;
		user[propertyName] = event.target.value;

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

		let userForm =
			<form onSubmit={ this.handleFormSubmit }>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Role</label>
						<div className="input-group">
							<select
								onChange={ this.onHandleFormChange.bind(this, 'role') }
								value={ user.role }
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
						<label className="control-label">First Name</label>
						<div className="input-group">
							<input
								type="email"
								className="form-control input-sm"
								value={ user.firstname }
								onChange={ this.onHandleFormChange.bind(this, 'firstname') }
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
								value={ user.lastname }
								onChange={ this.onHandleFormChange.bind(this, 'lastname') }
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