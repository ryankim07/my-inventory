import React from 'react';
import PropertiesAddressStore from '../../../stores/properties/address-store';
import PropertiesAddressAction from '../../../actions/properties-address-action';
import Loader from '../../loader';

class PropertiesAddressList extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            addresses: [],
            address: {},
            loader: true
        };

        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        PropertiesAddressStore.addChangeListener(this._onChange);
    }

    componentDidMount() {
		PropertiesAddressAction.getAddresses();
    }

    componentWillUnmount() {
        PropertiesAddressStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
            addresses: PropertiesAddressStore.getAddresses(),
			address: {},
            loader: false
        });
    }

	removeAddress(id) {
		PropertiesAddressAction.removeAddress(id);
	}

	viewProperty(propertyId) {
        this.context.router.push({
			pathname: "/properties/dashboard",
			state: {property_id: propertyId}
		});
    }

    render() {
        let addressesHtml = '';

		// If loading is complete
        if (!this.state.loader) {
			addressesHtml = this.state.addresses.map((address) => {

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
                            <button onClick={this.removeAddress.bind(this, address.id)}><i className="fa fa-trash"></i></button>
							<button onClick={this.viewProperty.bind(this, address.property_id)}><i className="fa fa-search"></i></button>
                        </td>
                    </tr>
                );
			});
        } else {
            addressesHtml = <tr><td><Loader /></td></tr>;
        }

        return (
            <div id="addresses-main">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>Properties</span>
                                </div>
                                <div className="col-xs-2 col-md-2"></div>
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