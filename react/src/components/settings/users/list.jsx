import React from 'react';
import SearchField from '../../helper/search_field';
import TogglingRows from '../../helper/table/toggling_rows';
import Loader from '../../helper/loader';

class SettingsUsersList extends React.Component
{
	// Render
	render() {
        let usersHtml = null;

		// If loading is complete
        if (!this.props.loader) {
        	if (!this.props.users || this.props.users.length === 0) {
				usersHtml = <tr><td><span>Empty list.</span></td></tr>;
			} else {
				usersHtml = this.props.users.map((user, userIndex) => {
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

        return (
			<div>
				<div className="form-group">
					<div className="col-xs-12 col-lg-12">
						<SearchField
							inputProps={
								{
									objs: this.props.users,
									searchType: "first_name",
									onSearch: this.props.onSearch
								}
							}
						/>
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