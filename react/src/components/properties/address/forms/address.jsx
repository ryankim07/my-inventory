import React from 'react';
import classNames from 'classnames';
import AutoCompleteAddress from '../../../helper/forms/auto_complete_address';
import InputZipCode from '../../../helper/forms/input_zip_code';
import StatesDropdown from '../../../helper/forms/hybrid_field';
import CountiesDropdown from '../../../helper/forms/hybrid_field';
import CountriesDropdown from '../../../helper/forms/hybrid_field';
import { getStates, getCounties, getCountries } from '../../../helper/lists/region';
import { upperFirstLetter,
		 checkAddressInputFields,
		 getSingleModifiedState,
		 getNestedModifiedState } from '../../../helper/utils';

class PropertyAddressForm extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			isRequiredField: false
		};

		this.handleFormChange = this.handleFormChange.bind(this);
		this.onHandleSelect   = this.onHandleSelect.bind(this);
	}

	// Handle input changes
    handleFormChange(event) {
		let fieldName = event.target.name;
		let chosenValue = event.target.value;
		let modifiedObj = {};
		let addressFieldsOn = false;

		switch (fieldName) {
			case 'subdivision':
				modifiedObj[fieldName] = upperFirstLetter(chosenValue);
				break;

			case 'street':
			case 'city':
			case 'state':
			case 'zip':
			case 'country':
				addressFieldsOn = true;
				modifiedObj[fieldName] = fieldName === 'city' ? upperFirstLetter(chosenValue) : chosenValue;
				break;

			default:
				modifiedObj[fieldName] = chosenValue;
		}

		const newObj = getNestedModifiedState(this.props.inputProps.address, modifiedObj);
		this.setState({isRequiredField: addressFieldsOn ? checkAddressInputFields(newObj) : false});
		this.props.inputProps.onChange(newObj);
	}

	// Handle when years and color dropdown field is selected
	onHandleSelect(modified) {
		this.props.inputProps.onChange(getNestedModifiedState(this.props.inputProps.address, modified));
	}

	render() {
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
										name: "street",
										value: this.props.inputProps.address.street,
										inputIds: ['street', 'city', 'state', 'zip', 'county', 'country'],
										onChange: this.handleFormChange,
										onSelect: this.onHandleSelect,
										required: classNames({ 'required': this.state.isRequiredField })
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
								name="city"
								type="text"
								className="form-control input-sm"
								onChange={ this.handleFormChange }
								value={ this.props.inputProps.address.city }
								required={ classNames({ 'required': this.state.isRequiredField }) }
							/>
						</div>
					</div>
				</div>
				<div className={ classNames('form-group', { 'required': this.state.isRequiredField }) }>
					<div className="col-xs-12 col-md-8">
						<label className="control-label">State</label>
						<StatesDropdown
							inputProps={
								{
									auto: true,
									others: { name: "state", className: "form-control" },
									list: getStates(),
									value: this.props.inputProps.address.state,
									onChange: this.onHandleFormChange,
									required: classNames({ 'required': this.state.isRequiredField })
								}
							}
						/>
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
										value: this.props.inputProps.address.zip,
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
						<CountiesDropdown
							inputProps={
								{
									auto: true,
									others: { name: "county", className: "form-control" },
									list: getCounties(),
									value: this.props.inputProps.address.county,
									onChange: this.onHandleFormChange,
								}
							}
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Country</label>
						<CountriesDropdown
							inputProps={
								{
									auto: false,
									others: { name: "country", className: "form-control" },
									list: getCountries(),
									value: this.props.inputProps.address.country,
									onChange: this.handleFormChange
								}
							}
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Subdivision</label>
						<div className="input-group">
							<input
								name="subdivision"
								type="text"
								className="form-control input-sm"
								onChange={ this.handleFormChange }
								value={ this.props.inputProps.address.subdivision }
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input type="hidden" value={ this.props.inputProps.address.id }/>
						</div>
					</div>
				</div>
			</div>
        );
    }
}

export default PropertyAddressForm;