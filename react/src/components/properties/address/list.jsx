import React from 'react';
import TogglingRows from '../../helper/table/toggling_rows';

class PropertiesAddressList extends React.Component
{
	// Render
	render() {
		let properties    = this.props.properties;
		let addressesHtml = properties.map((property, propertyIndex) => {
			return (
				<TogglingRows
					key={ propertyIndex }
					selectedItem={ this.props.property.address.id === property.address.id }
					columnValues={ [
						property.address.street,
						property.address.city,
						property.address.state,
						property.address.zip,
						property.address.county,
						property.address.country,
						property.address.subdivision
					] }
					addViewBtn={ true }
					handleViewPanel={ this.props.onHandleMainPanel.bind(this, property.address.property_id, 'info') }
					addEditBtn={ true }
					handleEditPanel={ this.props.handleRightPanel.bind(this, property.address.property_id) }
					addRemoveBtn={ true }
					handleRemove={ this.props.onHandleRemove.bind(this, property.address.property_id) }
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