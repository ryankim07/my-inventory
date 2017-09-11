import React from 'react';
import AppDispatcher from '../../../dispatcher/app-dispatcher';
import ActionConstants from '../../../constants/action-constants';
import PropertiesAddressAction from '../../../actions/properties-address-action';
import Loader from '../../loader';

class PropertiesAddressList extends React.Component
{
    constructor(props) {
        super(props);
    }

	handleAdd() {
		AppDispatcher.handleViewAction({
			actionType: ActionConstants.SHOW_PROPERTY_ADDRESS_PANEL
		});
	}

	editAddress(data) {
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

	viewProperty(propertyId) {
		this.context.router.push({
			pathname: "/properties/dashboard",
			state: {property_id: propertyId}
		});
	}

	removeAddress(id) {
		PropertiesAddressAction.removeAddress(id);
	}

    render() {
        let addressesHtml = '';

		// If loading is complete
        if (!this.props.state.loader) {
            let addresses = this.props.state.addresses;

			if (!addresses) {
				addressesHtml = <tr><td>There are no saved addresses.</td></tr>;
			} else {
				addressesHtml = addresses.map((address) => {

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
                                <button onClick={ this.removeAddress.bind(this, address.id) }><i className="fa fa-trash"></i></button>
								<button onClick={ this.editAddress.bind(this, address) }><i className="fa fa-pencil"></i></button>
                                <button onClick={ this.viewProperty.bind(this, address.property_id) }><i className="fa fa-search"></i></button>
                            </td>
                        </tr>
					);
				});
			}
        } else {
            addressesHtml = <tr><td><Loader /></td></tr>;
        }

        return (
            <div className={ [this.props.mobileWidth, this.props.desktopWidth, this.props.className].join(' ') } id="addresses-main">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>Properties</span>
                                </div>
                                <div className="col-xs-2 col-md-2">
                                    <button onClick={ this.handleAdd.bind(this) }><i className="fa fa-plus">Add Property</i></button>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">
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
                    </div>
                </div>
            </div>
        )
    }
}

PropertiesAddressList.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default PropertiesAddressList;