import React from 'react';
import SearchField from '../../helper/search_field';
import TogglingRows from '../../helper/table/toggling_rows';
import Loader from '../../helper/loader';

class PropertiesAddressList extends React.Component
{
	// Render
	render() {
		let addressesHtml = null;
		let searchField   = null;

		// If loading is complete
		if (!this.props.loader) {
			let properties    = this.props.properties;

			if (!properties || properties.length === 0) {
				addressesHtml = <tr><td><span>Empty list.</span></td></tr>;
			} else {
				addressesHtml = properties.map((property, propertyIndex) => {
					return (
						<TogglingRows
							key={propertyIndex}
							selectedItem={this.props.property.address.id === property.address.id}
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
							handleViewPanel={this.props.onHandleMainPanel.bind(this, property.address.property_id, 'info')}
							addEditBtn={true}
							handleEditPanel={this.props.handleRightPanel.bind(this, property.address.property_id)}
							addRemoveBtn={true}
							handleRemove={this.props.onHandleRemove.bind(this, property.address.property_id)}
						/>
					);
				});

				// Search field
				searchField =
					<SearchField
						objs={ properties }
						objKey="street"
						searchType="properties"
						searchText={ this.props.searchText }
						onHandleFormChange={ this.props.onHandleFormChange }
					/>;
			}
		} else {
			addressesHtml = <tr><td><Loader/></td></tr>;
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
						<th>Street</th>
						<th>City</th>
						<th>State</th>
						<th>Zip</th>
						<th>County</th>
						<th>Country</th>
						<th>Subdivision</th>
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