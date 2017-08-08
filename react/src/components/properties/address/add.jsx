import React from 'react';
import _ from 'lodash';
import PropertiesAddressStore from '../../../stores/properties/address-store';
import PropertiesAddressAction from '../../../actions/properties-address-action';
import { titleCase } from "../../helper/utils"

class PropertyAddressAdd extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            address: {
                id: '',
                property_id: '',
                street: '',
                city: '',
                state: '',
				zip: '',
                county: '',
                country: '',
                subdivision: ''
            },
			isEditingMode: false,
            newAddressAdded: false,
			flashMessage: null
        };

        this._onChange = this._onChange.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentWillMount() {
		if (this.props.location.state.property_id) {
			this.setState({
				address: {
					id: '',
					property_id: this.props.location.state.property_id,
					street: '',
					city: '',
					state: '',
					zip: '',
					county: '',
					country: '',
					subdivision: ''
				},
				isEditingMode: false,
				newAddressAdded: false,
				flashMessage: null
			});
		}
        PropertiesAddressStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
		PropertiesAddressStore.removeChangeListener(this._onChange);
		PropertiesAddressStore.unsetAddressToUpdate();
	}

    shouldComponentUpdate(nextProps, nextState) {
		// Only redirect to list if new address is being added
        if (nextState.newAddressAdded || this.state.newAddressAdded) {
			PropertiesAddressStore.unFlagNewAddress();
			nextState.newAddressAdded = false;
			this.context.router.push('/properties/dashboard');
			return false;
		}

		return true;
    }

    // Listen to changes in store, update it's own state
    _onChange() {
    	let addingNewAddress = PropertiesAddressStore.isNewAddressAdded();
		let addressToUpdate  = PropertiesAddressStore.getAddressToUpdate();
		let isEditingMode    = this.state.isEditingMode;
		let stateAddress     = this.state.address;
		let flashMsg         = PropertiesAddressStore.getStoreFlashMessage();
		let isAuthenticated  = PropertiesAddressStore.isAuthenticated();

		if (!isAuthenticated){
			this.context.router.push("/auth/login");
			return false;
		}

		if (!_.every(_.values(addressToUpdate), function(v) {return !v;})) {
			stateAddress = addressToUpdate;
			isEditingMode = true;
		}

		this.setState({
		    address: stateAddress,
			isEditingMode: isEditingMode,
			newAddressAdded: addingNewAddress,
			flashMessage: flashMsg !== undefined ? flashMsg : null
		});
    }

    // Handle input changes
    handleFormChange(propertyName, event) {
        let address     = this.state.address;
        let chosenValue = event.target.value;

        switch (propertyName) {
            case 'street':
            case 'city':
            case 'subdivision':
                address[propertyName] = titleCase(chosenValue);
            break;

            default:
                address[propertyName] = chosenValue;
        }

        this.setState({
            address: address,
			isEditingMode: this.state.isEditingMode,
			newAddressAdded: this.state.newAddressAdded,
			flashMessage: this.state.flashMessage
        });
    }

    // Submit
    handleFormSubmit(event) {
        event.preventDefault();

        if (!this.state.isEditingMode) {
			PropertiesAddressAction.addAddress(this.state.address);
		} else {
			PropertiesAddressAction.updateAddress(this.state.address);

        	// Close the panel
            this.props.closeRightPanel();
        }
    }

	render() {
        let stateOptions = [];

		let addressForm = <form onSubmit={this.handleFormSubmit}>
			<div className="form-group required">
				<div className="col-xs-12 col-md-8">
					<label className="control-label">Street</label>
					<div className="input-group">
						<input type="text"
							   ref="street"
							   onChange={this.handleFormChange.bind(this, 'street')}
							   value={this.state.address.street}
							   className="form-control input-sm"
							   required="required"/>
					</div>
				</div>
			</div>
			<div className="form-group required">
				<div className="col-xs-12 col-md-8">
					<label className="control-label">City</label>
					<div className="input-group">
						<input type="text"
							   ref="city"
							   onChange={this.handleFormChange.bind(this, 'city')}
							   value={this.state.address.city}
							   className="form-control input-sm"
							   required="required"/>
					</div>
				</div>
			</div>
			<div className="form-group required">
				<div className="col-xs-12 col-md-8">
					<label className="control-label">State</label>
					<div className="input-group">
						<select ref="state"
								onChange={this.handleFormChange.bind(this, 'state')}
								value={this.state.address.built}
								className="form-control input-sm"
								required="required">
							<option value="">Select One</option>
							<option value="CA">CA</option>
						</select>
					</div>
				</div>
			</div>
			<div className="form-group required">
				<div className="col-xs-12 col-md-8">
					<label className="control-label">Zip</label>
					<div className="input-group">
						<input type="text"
							   ref="zip"
							   onChange={this.handleFormChange.bind(this, 'zip')}
							   value={this.state.address.zip}
							   className="form-control input-sm"
							   required="required"/>
					</div>
				</div>
			</div>
			<div className="form-group">
				<div className="col-xs-12 col-md-8">
					<label className="control-label">County</label>
					<div className="input-group">
						<select ref="county"
								onChange={this.handleFormChange.bind(this, 'county')}
								value={this.state.address.county}
								className="form-control input-sm">
							<option value="">Select One</option>
							<option value="Orange County">Orange County</option>
						</select>
					</div>
				</div>
			</div>
			<div className="form-group">
				<div className="col-xs-12 col-md-8">
					<label className="control-label">Country</label>
					<div className="input-group">
						<select ref="country"
								onChange={this.handleFormChange.bind(this, 'country')}
								value={this.state.address.country}
								className="form-control input-sm">
							<option value="">Select One</option>
							<option value="US">United States</option>
						</select>
					</div>
				</div>
			</div>
			<div className="form-group">
				<div className="col-xs-12 col-md-8">
					<label className="control-label">Subdivision</label>
					<div className="input-group">
						<input type="text"
							   ref="subdivision"
							   onChange={this.handleFormChange.bind(this, 'subdivision')}
							   value={this.state.address.subdivision}
							   className="form-control input-sm"/>
					</div>
				</div>
			</div>
			<div className="form-group">
				<div className="col-xs-12 col-md-8">
					<div className="input-group">
						<input type="hidden" ref="id" value={this.state.address.id} />
						<input type="hidden" ref="property_id" value={this.state.address.property_id} />
					</div>
				</div>
			</div>
			<div className="form-group">
				<div className="col-xs-12 col-md-12">
					<div className="clearfix">
						<input type="submit" value="Submit" className="btn"/>
					</div>
				</div>
			</div>
		</form>

        return (
            <div className="col-xs-4 col-md-4" id="address-add">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>address</span>
                                </div>
                                <div className="col-xs-2 col-md-2">
                                    { this.state.isEditingMode ? <button onClick={this.props.closeRightPanel} className="close close-viewer" value="Close"><span>&times;</span></button> : ''}
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">
                            { addressForm }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PropertyAddressAdd.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default PropertyAddressAdd;