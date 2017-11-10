import React from 'react';
import _ from 'lodash';
import SearchField from '../../helper/search_field';
import TogglingRows from '../../helper/table/toggling_rows';
import Loader from '../../helper/loader';

class SettingsVendorsList extends React.Component
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
        let vendorsHtml = null;

		// If loading is complete
        if (!this.props.loader) {
        	if (!this.props.vendors || this.props.vendors.length === 0) {
				vendorsHtml = <tr><td><span>Empty list.</span></td></tr>;
			} else {
				let list = !_.isEmpty(this.state.searchResults) ? this.state.searchResults : this.props.vendors;

				vendorsHtml = list.map((vendor, vendorIndex) => {
					return (
						<TogglingRows
							key={ vendorIndex }
							selectedItem={ this.props.selectedItem === vendor.id }
							columnValues={ [
								vendor.company,
								vendor.street,
								vendor.city,
								vendor.state,
								vendor.zip,
								vendor.phone
							] }
							addEditBtn={ true }
							onEdit={ this.props.onHandleRightPanel.bind(this, vendor.id) }
							addRemoveBtn={ true }
							onRemove={ this.props.onRemove.bind(this, vendor.id) }
						/>
					);
				});
			}
        } else {
			vendorsHtml = <tr><td><Loader/></td></tr>;
        }

		let searchField =
			<SearchField
				inputProps={
					{
						list: this.props.vendors,
						searchType: "company",
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
						<th>Company</th>
						<th>Street</th>
						<th>City</th>
						<th>State</th>
						<th>Zip</th>
						<th>Phone</th>
						<th>Actions</th>
					</tr>
					</thead>
					<tbody>
						{ vendorsHtml }
					</tbody>
				</table>
			</div>
        )
    }
}

export default SettingsVendorsList;