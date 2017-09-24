import React from 'react';

class PropertiesAddressList extends React.Component
{
	render() {
		let properties    = this.props.properties;
		let addressesHtml = properties.map((property) => {
			let address = property.address;

			return (
				<tr key={ address.id }>
					<td>{ address.street }</td>
					<td>{ address.city }</td>
					<td>{ address.state }</td>
					<td>{ address.zip }</td>
					<td>{ address.county }</td>
					<td>{ address.country }</td>
					<td>{ address.subdivision }</td>
					<td>
						<button onClick={ this.props.onHandleMainPanel.bind(this, address.property_id, 'info') }><i className="fa fa-search" aria-hidden="true"/></button>
						<button onClick={ this.props.handleRightPanel.bind(this, address.property_id) }><i className="fa fa-pencil" aria-hidden="true"/></button>
						<button onClick={ this.props.onHandleRemove.bind(this, address.property_id) }><i className="fa fa-trash" aria-hidden="true"/></button>
					</td>
				</tr>

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