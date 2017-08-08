import React from 'react';
import PropertiesAddressStore from '../../../stores/properties/address-store';
import PropertiesAddressAction from '../../../actions/properties-address-action';
import AppDispatcher from '../../../dispatcher/app-dispatcher';
import ActionConstants from '../../../constants/action-constants';
import Loader from '../../loader';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';
let mainClassName = 'main-column';

class PropertiesAddressList extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            addresses: [],
            address: {},
            loader: true
        };

        this._onChange     = this._onChange.bind(this);
        this.editAddress   = this.editAddress().bind(this);
        this.removeAddress = this.removeAddress.bind(this);
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
            addresses: PropertiesAddressStore.getAddress(),
			address: {},
            loader: false
        });
    }

    editAddress(e) {
        // Set panel width
        let data = e.target.dataset;

		AppDispatcher.handleViewAction({
			actionType: ActionConstants.EDIT_PROPERTY_ADDRESS,
			address: {
				id: data.id,
				property_id: data.property_id,
				street: data.street,
				city: data.city,
				state: data.state,
				zip: data.zip,
				county: data.county,
				country: data.country,
				subdivision: data.subdivision
			},
			openRightPanel: true
		});
    }

    removeAddress(e) {
        let id = e.target.dataset.id;
        PropertiesAddressAction.removeAddress(id);
    }

    render() {
        let addressesHtml = '';

		// If loading is complete
        if (!this.state.loader) {
			addressesHtml = this.state.properties.map((property) => {
				let imageName = property.assets[0] === undefined ? property.assets.name : property.assets[0].name;
				let imagePath = property.assets[0] === undefined ? property.assets.path : property.assets[0].path;

				return (
                    <tr key={ property.id }>
                        <td>{ property.built }</td>
                        <td>{ property.style }</td>
                        <td>{ property.beds }</td>
                        <td>{ property.baths }</td>
                        <td>{ property.finished_area }</td>
                        <td>{ property.unfinished_area }</td>
						<td>{ property.total_area }</td>
						<td>{ property.parcel_number }</td>
                        <td>
                            <button onClick={this.removeAddress} data-id={property.id}>×</button>
                            <button onClick={this.editAddress} data-id={property.id}
									data-built={property.built}
                                    data-style={property.style}
                                    data-beds={property.beds}
									data-baths={property.baths}
                                    data-finished-area={property.finished_area}
									data-unfinished-area={property.unfinished_area}
									data-total-area={property.total_area}
									data-parcel-number={property.parcel_number}
                                    data-image-name={imageName}
                                    data-image-path={imagePath}>edit
                            </button>
                        </td>
                    </tr>
                );
			});
        } else {
            addressesHtml = <tr><td><Loader /></td></tr>;
        }

        return (
            <div className={[this.props.mobileWidth, this.props.desktopWidth, this.props.className].join(' ')} id="addresses-main">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>Property Address Edit</span>
                                </div>
                                <div className="col-xs-2 col-md-2"></div>
                            </div>
                        </div>
                        <div className="panel-body">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Property ID</th>
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

export default PropertiesAddressList;