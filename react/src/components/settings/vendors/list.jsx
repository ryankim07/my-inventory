import React from 'react';
import SearchField from '../../helper/search_field';
import TogglingRows from '../../helper/table/toggling_rows';
import Loader from '../../helper/loader';

class SettingsVendorsList extends React.Component
{
	// Render
	render() {
        let vendorsHtml = null;

		// If loading is complete
        if (!this.props.loader) {
        	if (!this.props.vendors || this.props.vendors.length === 0) {
				vendorsHtml = <tr><td><span>Empty list.</span></td></tr>;
			} else {
				vendorsHtml = this.props.vendors.map((vendor, vendorIndex) => {
					return (
						<TogglingRows
							key={ vendorIndex }
							selectedItem={ this.props.vendor.id === vendor.id }
							columnValues={ [
								vendor.company,
								vendor.street,
								vendor.city,
								vendor.state,
								vendor.zip,
								vendor.phone
							] }
							addEditBtn={ true }
							handleEditPanel={ this.props.onHandleRightPanel.bind(this, vendor.id) }
							addRemoveBtn={ true }
							onRemove={ this.props.onRemove.bind(this, vendor.id) }
						/>
					);
				});
			}
        } else {
			vendorsHtml = <tr><td><Loader/></td></tr>;
        }

        return (
			<div>
				<div className="form-group">
					<div className="col-xs-12 col-lg-12">
						<SearchField
							inputProps={
								{
									objs: this.props.vendors,
									searchType: "company",
									onChange: this.props.onChange,
									onSearch: this.props.onSearch
								}
							}
						/>
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
						<th/>
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