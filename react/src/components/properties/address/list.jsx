import React from 'react';
import PropertiesAddressAction from '../../../actions/properties-address-action';

class PropertiesAddressList extends React.Component
{
    constructor(props) {
        super(props);
    }

	handleRemove(id) {
		this.props.handleRemove(id);
	}

	handleEdit(data) {
		this.props.editProperty(data);
		// Set panel width
		/*let imageName = data.assets[0] === undefined ? data.assets.name : data.assets[0].name;
		let imagePath = data.assets[0] === undefined ? data.assets.path : data.assets[0].path;

		data['assets']: {
			name: data.imageName,
				path: data.imagePath
		}

		AppDispatcher.handleViewAction({
			actionType: ActionConstants.EDIT_MY_VEHICLE,
			vehicle: data
		});*/
	}

	handleView(propertyId) {
		this.props.handleView(propertyId);
	}

    render() {
    	let address = this.props.address;

        let addressesHtml =
			<tr key={ address.id }>
				<td>{ address.street }</td>
				<td>{ address.city }</td>
				<td>{ address.state }</td>
				<td>{ address.zip }</td>
				<td>{ address.county }</td>
				<td>{ address.country }</td>
				<td>{ address.subdivision }</td>
				<td>
					<button onClick={ this.handleRemove.bind(this, address.property_id) }><i className="fa fa-trash"></i></button>
					<button onClick={ this.handleEdit.bind(this, address) }><i className="fa fa-pencil"></i></button>
					<button onClick={ this.handleEdit.bind(this, address.property_id) }><i className="fa fa-search"></i></button>
				</td>
			</tr>;

        return ({ addressesHtml })
    }
}

PropertiesAddressList.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default PropertiesAddressList;