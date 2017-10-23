import React from 'react';
import SearchField from '../../helper/search_field';
import TogglingRows from '../../helper/table/toggling_rows';
import Loader from '../../helper/loader';

class SettingsUsersList extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			users: this.props.users,
			clonedUsers: JSON.parse(JSON.stringify(this.props.users)),
			searchText: '',
			isSearch: false,
		};

		this.onHandleFormChange = this.onHandleFormChange.bind(this);
	}

	// Next state change
	componentWillReceiveProps(nextProps) {
		if (nextProps.users !== this.state.users) {
			this.setState({
				users: nextProps.users,
				clonedUsers: JSON.parse(JSON.stringify(nextProps.users)),
				searchText: '',
				isSearch: false
			});
		}
	}

	// Handle input changes
	onHandleFormChange(event) {
		let searchText = event.target.value;
		let users   = this.state.clonedUsers;
		let results = users.filter(function (list) {
			return list.first_name.match(new RegExp(searchText, 'gi'));
		});

		this.setState({
			users: searchText.replace(/\s/g, '').length ? results : users,
			searchText: searchText,
			isSearch: true
		});
	}

	// Render
	render() {
        let usersHtml   = null;
        let searchField = null;

		// If loading is complete
        if (!this.props.loader) {
        	let users = this.state.users;

        	if (!users || users.length === 0) {
				usersHtml = <tr><td><span>Empty list.</span></td></tr>;
			} else {
				usersHtml = users.map((user, userIndex) => {
					return (
						<TogglingRows
							key={ userIndex }
							selectedItem={ this.props.user.id === user.id }
							columnValues={ [
								user.first_name,
								user.last_name,
								user.username,
								user.email,
								user.is_enabled
							] }
							addEditBtn={ true }
							handleEditPanel={ this.props.onHandleRightPanel.bind(this, user.id) }
							addRemoveBtn={ true }
							handleRemove={ this.props.onHandleRemove.bind(this, user.id) }
						/>
					);
				});

				searchField =
					<SearchField
						objs={ this.state.users }
						objKey="firstname"
						searchType="users"
						searchText={ this.state.searchText }
						onHandleFormChange={ this.onHandleFormChange }
					/>;
			}
        } else {
            usersHtml = <tr><td><Loader/></td></tr>;
        }

        return (
			<div>
				<div className="form-group">
					<div className="col-xs-12 col-lg-12">
						{ searchField }
					</div>
				</div>
				<table className="table">
					<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Username</th>
						<th>Email</th>
						<th>Active</th>
					</tr>
					</thead>
					<tbody>
					{ usersHtml }
					</tbody>
				</table>
			</div>
        )
    }
}

export default SettingsUsersList;