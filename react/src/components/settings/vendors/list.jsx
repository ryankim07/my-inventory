import React from 'react';
import SearchField from '../../helper/search_field';
import TogglingRows from '../../helper/table/toggling_rows';
import Loader from '../../helper/loader';

class SettingsVendorsList extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			vendors: this.props.vendors,
			clonedVendors: JSON.parse(JSON.stringify(this.props.vendors)),
			searchText: '',
			isSearch: false,
		};

		this.onHandleFormChange = this.onHandleFormChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.vendors !== this.state.vendors) {
			this.setState({
				vendors: nextProps.vendors,
				clonedVendors: JSON.parse(JSON.stringify(nextProps.vendors)),
				searchText: '',
				isSearch: false
			});
		}
	}

	// Handle input changes
	onHandleFormChange(event) {
		let searchText = event.target.value;
		let vendors    = this.state.clonedVendors;
		let results = vendors.filter(function (list) {
			return list.company.match(new RegExp(searchText, 'gi'));
		});

		this.setState({
			vendors: searchText.replace(/\s/g, '').length ? results : vendors,
			searchText: searchText,
			isSearch: true
		});
	}

	render() {
        let vendorsHtml = '';

		// If loading is complete
        if (!this.props.loader) {
        	let vendors = this.state.vendors;

        	if (!vendors || vendors.length === 0) {
				vendorsHtml = <tr><td><span>Empty list.</span></td></tr>;
			} else {
				vendorsHtml = vendors.map((vendor, vendorIndex) => {
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
								vendor.phone,
								vendor.contact,
								vendor.country,
								vendor.url,
								vendor.notes
							] }
							addEditBtn={ true }
							handleEditPanel={ this.props.onHandleRightPanel.bind(this, vendor.id) }
							addRemoveBtn={ true }
							handleRemove={ this.props.onHandleRemove.bind(this, vendor.id) }
						/>
					);
				});
			}
        } else {
			vendorsHtml = <tr><td><Loader/></td></tr>;
        }

        return (
			<div className="row" id="vendors-list">
				<div className="panel panel-info">
					<div className="panel-heading">
						<div className="row">
							<div className="col-xs-10 col-md-10">
								<span>Paints List</span>
							</div>
							<div className="col-xs-2 col-md-2">
								<button onClick={ this.props.onHandleRightPanel.bind(this, false) }><i className="fa fa-plus" aria-hidden="true"/></button>
							</div>
						</div>
					</div>
					<div className="panel-body">
						<div className="form-group">
							<div className="col-xs-12 col-lg-12">
								<SearchField
									objs={ this.state.vendors }
									objKey="name"
									searchType="vendors"
									searchText={ this.state.searchText }
									onHandleFormChange={ this.onHandleFormChange }
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
								<th>Contact</th>
								<th>Country</th>
								<th>Url</th>
								<th>Notes</th>
								<th/>
							</tr>
							</thead>
							<tbody>
								{ vendorsHtml }
							</tbody>
						</table>
					</div>
				</div>
			</div>
        )
    }
}

export default SettingsVendorsList;