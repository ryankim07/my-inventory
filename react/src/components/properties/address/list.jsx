import React from 'react';
import TogglingRows from '../../helper/table/toggling_rows';

class PropertiesAddressList extends React.Component
{
	render() {
		let properties    = this.props.properties;
		let addressesHtml = properties.map((property, propertyIndex) => {
			let address = property.address;

			return (
				<TogglingRows
					key={ propertyIndex }
					selectedItem={ this.props.property.address.id === address.id }
					columnValues={ [
						address.street,
						address.city,
						address.state,
						address.zip,
						address.county,
						address.country,
						address.subdivision
					] }
					addViewBtn={ true }
					handleViewPanel={ this.props.onHandleMainPanel.bind(this, address.property_id, 'info') }
					addEditBtn={ true }
					handleEditPanel={ this.props.onHandleRightPanel.bind(this, vehicle.id) }
					addRemoveBtn={ true }
					handleRemove={ this.props.onHandleRemove.bind(this, vehicle.id) }
				/>
			);
		});

        return (
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
		)
    }
}

export default PropertiesAddressList;