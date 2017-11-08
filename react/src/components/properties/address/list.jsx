import React from 'react';
import _ from 'lodash';
import SearchField from '../../helper/search_field';
import TogglingRows from '../../helper/table/toggling_rows';
import Loader from '../../helper/loader';

class PropertiesAddressList extends React.Component
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
		let addressesHtml = null;

		// If loading is complete
		if (!this.props.loader) {
			if (!this.props.properties || this.props.properties.length === 0) {
				addressesHtml = <tr><td><span>Empty list.</span></td></tr>;
			} else {
				let list = !_.isEmpty(this.state.searchResults) ? this.state.searchResults : this.props.properties;

				addressesHtml = list.map((property, propertyIndex) => {
					return (
						<TogglingRows
							key={propertyIndex}
							selectedItem={this.props.selectedItem === property.address.id}
							columnValues={[
								property.address.street,
								property.address.city,
								property.address.state,
								property.address.zip,
								property.address.county,
								property.address.country,
								property.address.subdivision
							]}
							addViewBtn={true}
							onView={this.props.onMainPanel.bind(this, property.address.property_id, 'info')}
							addEditBtn={true}
							onEdit={this.props.onRightPanel.bind(this, property.address.property_id, 'property-form')}
							addRemoveBtn={true}
							onRemove={this.props.onRemove.bind(this, property.address.property_id)}
						/>
					);
				});
			}
		} else {
			addressesHtml = <tr><td><Loader/></td></tr>;
		}

		let searchField =
			<SearchField
				inputProps={
					{
						objs: this.props.properties,
						searchType: "street",
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
						<th>Street</th>
						<th>City</th>
						<th>State</th>
						<th>Zip</th>
						<th>County</th>
						<th>Country</th>
						<th>Subdivision</th>
						<th>Actions</th>
					</tr>
					</thead>
					<tbody>
						{ addressesHtml }
					</tbody>
				</table>
			</div>
		)
    }
}

export default PropertiesAddressList;