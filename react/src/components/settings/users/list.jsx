import React from 'react';
import _ from 'lodash';
import SearchField from '../../helper/search_field';
import TogglingRows from '../../helper/table/toggling_rows';
import Loader from '../../helper/loader';

class SettingsUsersList extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			searchResults: []
		};

		this.onHandleSearch = this.onHandleSearch.bind(this);
	}

	// Handle search
	onHandleSearch(results) {
		this.setState({ searchResults: results });
	}

	// Render
	render() {
        let usersHtml = null;

		// If loading is complete
        if (!this.props.loader) {
        	if (!this.props.users || this.props.users.length === 0) {
				usersHtml = <tr><td><span>Empty list.</span></td></tr>;
			} else {
				let list = !_.isEmpty(this.state.searchResults) ? this.state.searchResults : this.props.users;

				usersHtml = list.map((user, userIndex) => {
					return (
						<TogglingRows
							key={ userIndex }
							selectedItem={ this.props.selectedItem === user.id }
							columnValues={ [
								user.first_name,
								user.last_name,
								user.username,
								user.email,
								user.is_enabled
							] }
							addEditBtn={ true }
							onEdit={ this.props.onHandleRightPanel.bind(this, user.id) }
							addRemoveBtn={ true }
							onRemove={ this.props.onRemove.bind(this, user.id) }
						/>
					);
				});
			}
        } else {
            usersHtml = <tr><td><Loader/></td></tr>;
        }

		let searchField =
			<SearchField
				inputProps={
					{
						objs: this.props.users,
						searchType: "first_name",
						onSearch: this.onHandleSearch
					}
				}
			/>;

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
						<th>Actions</th>
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