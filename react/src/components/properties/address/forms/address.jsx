import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import AutoCompleteAddress from '../../../helper/forms/auto_complete_address';
import InputZipCode from '../../../helper/forms/input_zip_code';
import StatesDropdown from '../../../helper/forms/list_options_field';
import CountiesDropdown from '../../../helper/forms/list_options_field';
import CountriesDropdown from '../../../helper/forms/list_options_field';
import { getStates, getCounties, getCountries } from '../../../helper/lists/region';
import { upperFirstLetter, checkAddressInputFields } from '../../../helper/utils';

class PropertyAddressForm extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			address: this.props.inputProps.address,
			isRequiredField: false
		};

		this.handleFormChange = this.handleFormChange.bind(this);
		this.onHandleSelect   = this.onHandleSelect.bind(this);
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
										value: this.state.address.street,
										inputIds: ['street', 'city', 'state', 'zip', 'county', 'country'],
										onChange: this.handleFormChange,
										onSelect: this.onHandleSelect,
										required: "required"
									}
								}
							/>
						</div>
					</div>
				</div>
				<div className={ classNames('form-group', { 'required': this.state.isRequiredField }) }>
					<div className="col-xs-12 col-md-8">
						<label className="control-label">City</label>
						<div className="input-group">
							<input
								type="text"
								className="form-control input-sm"
								onChange={ this.handleFormChange }
								value={ this.state.address.city }
								required={ classNames({ 'required': this.state.isRequiredField }) }
							/>
						</div>
					</div>
				</div>
				<div className={ classNames('form-group', { 'required': this.state.isRequiredField }) }>
					<div className="col-xs-12 col-md-8">
						<label className="control-label">State</label>
						<div className="input-group">
							<StatesDropdown
								inputProps={
									{
										auto: true,
										name: "state",
										list: sequencedObject(2010, (new Date()).getFullYear() + 1),
										value: this.state.address.state,
										onChange: this.onHandleFormChange,
										onSelect: "",
										required: classNames({ 'required': this.state.isRequiredField })
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
										value: this.state.address.zip,
										onChange: this.handleFormChange,
										required: classNames({ 'required': this.state.isRequiredField })
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
										auto: true,
										name: "county",
										list: sequencedObject(2010, (new Date()).getFullYear() + 1),
										value: this.state.address.county,
										onChange: this.onHandleFormChange,
										onSelect: "",
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
										value: this.state.address.country,
										onChange: this.handleFormChange,
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
								onChange={ this.handleFormChange }
								value={ this.state.address.subdivision }
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input type="hidden" value={ this.state.address.id }/>
						</div>
					</div>
				</div>
			</div>
        );
    }
}

export default PropertyAddressForm;