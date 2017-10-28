import React from 'react';
import _ from 'lodash';
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
			address: this.props.inputProps.address,
			isRequiredField: false
		};

		this.onHandleSelect = this.onHandleSelect.bind(this);
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
				isRequiredField       = checkAddressInputFields(address);
			break;

            default:
                address[propertyName] = chosenValue;
        }

		this.setState({
			address: address,
			isRequiredField: isRequiredField
		});
    }

	// Handle auto complete select
	onHandleSelect(updated) {
		let address = this.state.address;

		this.setState({ address: _.assign(address, updated) });
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
						<div className="input-group">
							<AutoCompleteAddress
								inputProps = {
									{
										value: address.street,
										inputIds: ['street', 'city', 'state', 'zip', 'county', 'country'],
										onChange: this.handleFormChange.bind(this, 'street'),
										onSelect: this.onHandleSelect,
										required: "required"
									}
								}
							/>
						</div>
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
								inputProps={
									{
										className: "form-control input-sm",
										value: address.state,
										onChange: this.handleFormChange.bind(this, 'state'),
										required: classNames({'required': this.state.isRequiredField})
									}
								}
							/>
						</div>
					</div>
				</div>
				<div className={ classNames('form-group', {'required': this.state.isRequiredField }) }>
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Zip</label>
						<div className="input-group">
							<InputZipCode
								inputProps={
									{
										className: "form-control input-sm",
										value: address.zip,
										onChange: this.handleFormChange.bind(this, 'zip'),
										required: classNames({'required': this.state.isRequiredField})
									}
								}
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">County</label>
						<div className="input-group">
							<CountiesDropdown
								inputProps={
									{
										className: "form-control input-sm",
										value: address.county,
										onChange: this.handleFormChange.bind(this, 'county'),
										required: ""
									}
								}
							/>
						</div>
					</div>
				</div>
				<div className={ classNames('form-group', {'required': this.state.isRequiredField }) }>
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Country</label>
						<div className="input-group">
							<CountriesDropdown
								inputProps={
									{
										className: "form-control input-sm",
										value: address.country,
										onChange: this.handleFormChange.bind(this, 'country'),
										required: classNames({'required': this.state.isRequiredField })
									}
								}
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