import React from 'react';

class PropertiesAddressList extends React.Component
{
	handleRightPanel(id) {
		this.props.handleRightPanel(id);
	}

	// Handle view
	/*handleView(id) {
		this.props.onHandleView(id);
	}*/

	// Handle view
	handleRemove(id) {
		this.props.onHandleRemove(id);
	}

	render() {
		let address = this.props.address;

		let addressesHtml = !address ?
			<tr><td><span>Unable to display properties due to missing address.</span></td></tr> :
			<tr key={ address.id }>
				<td>{ address.street }</td>
				<td>{ address.city }</td>
				<td>{ address.state }</td>
				<td>{ address.zip }</td>
				<td>{ address.county }</td>
				<td>{ address.country }</td>
				<td>{ address.subdivision }</td>
				<td>
					<button onClick={ this.props.onHandleView.bind(this, address.property_id, 'info') }><i className="fa fa-search" aria-hidden="true"/></button>
					<button onClick={ this.handleRightPanel.bind(this, address.property_id) }><i className="fa fa-pencil" aria-hidden="true"/></button>
					<button onClick={ this.handleRemove.bind(this, address.property_id) }><i className="fa fa-trash" aria-hidden="true"/></button>
				</td>
			</tr>

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