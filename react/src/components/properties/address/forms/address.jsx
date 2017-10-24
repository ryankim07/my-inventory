import React from 'react';
import classNames from 'classnames';
import AutoCompleteAddress from "../../../helper/forms/auto_complete_address";
import InputZipCode from '../../../helper/forms/input_zip_code';
import StatesDropdown from '../../../helper/forms/states_dropdown';
import CountiesDropdown from '../../../helper/forms/counties_dropdown';
import CountriesDropdown from '../../../helper/forms/countries_dropdown';
import { upperFirstLetter, checkAddressInputFields } from '../../../helper/utils';

class PropertyAddressForm extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			address: this.props.address,
			isRequiredField: false
		};

		this.parentObjSetter  = this.parentObjSetter.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
	}

	// Vendor object setter
	parentObjSetter(obj) {
		this.setState(obj);
	}

	// Handle input changes
    handleFormChange(propertyName, event) {
        let address         = this.state.address;
		let chosenValue     = propertyName === 'street' ? event : event.target.value;
		let isRequiredField = this.state.isRequiredField;

        switch (propertyName) {
            case 'subdivision':
                address[propertyName] = upperFirstLetter(chosenValue);
            break;

			case 'street':
			case 'city':
			case 'state':
			case 'zip':
			case 'country':
				address[propertyName] = chosenValue;
				isRequiredField = checkAddressInputFields(address);
			break;

            default:
                address[propertyName] = chosenValue;
        }

		this.setState({
			isRequiredField: isRequiredField
		});

        this.props.onHandleFormChange('address', address);
    }

	render() {
    	let address = this.state.address;

        return (

			<div>
				<hr/>
				<p>Address Information</p>
				<hr/>

				<div className={ classNames('form-group', {'required': this.state.isRequiredField }) }>
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Street</label>
						<AutoCompleteAddress
							parentObjName="address"
							parentObj={ address }
							parentObjSetter={ this.parentObjSetter }
							onHandleFormChange={ this.handleFormChange.bind(this) }
							required={ classNames({'required': this.state.isRequiredField }) }
						/>
					</div>
				</div>
				<div className={ classNames('form-group', {'required': this.state.isRequiredField }) }>
					<div className="col-xs-12 col-md-8">
						<label className="control-label">City</label>
						<div className="input-group">
							<input
								type="text"
								className="form-control input-sm"
								onChange={ this.handleFormChange.bind(this, 'city') }
								value={ address.city }
								required={ classNames({'required': this.state.isRequiredField }) }
							/>
						</div>
					</div>
				</div>
				<div className={ classNames('form-group', {'required': this.state.isRequiredField }) }>
					<div className="col-xs-12 col-md-8">
						<label className="control-label">State</label>
						<div className="input-group">
							<StatesDropdown
								className="form-control input-sm"
								value={ address.state }
								onHandleFormChange={ this.handleFormChange.bind(this, 'state') }
								required={ classNames({'required': this.state.isRequiredField }) }
							/>
						</div>
					</div>
				</div>
				<div className={ classNames('form-group', {'required': this.state.isRequiredField }) }>
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Zip</label>
						<div className="input-group">
							<InputZipCode
								className="form-control input-sm"
								value={ address.zip }
								onHandleFormChange={ this.handleFormChange.bind(this, 'zip') }
								required={ classNames({'required': this.state.isRequiredField }) }
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">County</label>
						<div className="input-group">
							<CountiesDropdown
								className="form-control input-sm"
								value={ address.county }
								onHandleFormChange={ this.handleFormChange.bind(this, 'county') }
								required=""
							/>
						</div>
					</div>
				</div>
				<div className={ classNames('form-group', {'required': this.state.isRequiredField }) }>
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Country</label>
						<div className="input-group">
							<CountriesDropdown
								className="form-control input-sm"
								value={ address.country }
								onHandleFormChange={ this.handleFormChange.bind(this, 'country') }
								required={ classNames({'required': this.state.isRequiredField }) }
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Subdivision</label>
						<div className="input-group">
							<input
								type="text"
								className="form-control input-sm"
								onChange={ this.handleFormChange.bind(this, 'subdivision') }
								value={ address.subdivision }
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input type="hidden" value={ address.id }/>
						</div>
					</div>
				</div>
			</div>
        );
    }
}

export default PropertyAddressForm;