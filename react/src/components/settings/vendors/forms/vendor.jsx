import React from 'react';
import classNames from 'classnames';
import AutoCompleteAddress from "../../../helper/forms/auto_complete_address";
import InputZipCode from '../../../helper/forms/input_zip_code';
import InputPhone from '../../../helper/forms/input_phone';
import InputUrl from '../../../helper/forms/input_url'
import StatesDropdown from '../../../helper/forms/states_dropdown';
import CountriesDropdown from '../../../helper/forms/countries_dropdown';
import { upperFirstLetter, phoneFormat, urlFormat, checkAddressInputFields, getSingleModifiedState, getNestedModifiedState } from '../../../helper/utils';

class SettingsVendor extends React.Component
{
	// Constructor
    constructor(props) {
        super(props);

        this.state = {
			isRequiredField: false
		};

        this.onHandleSelect     = this.onHandleSelect.bind(this);
		this.onHandleFormChange = this.onHandleFormChange.bind(this);
    }

    // Handle input changes
    onHandleFormChange(event) {
    	let name            = event.target.name;
        let chosenValue 	= event.target.value;
		let addressFieldsOn = false;

			switch (name) {
			case 'company':
			case 'contact':
				chosenValue = upperFirstLetter(chosenValue);
			break;

			case 'street':
			case 'city':
			case 'state':
			case 'zip':
			case 'country':
				addressFieldsOn = true;
				chosenValue     = name === 'city' ? upperFirstLetter(chosenValue) : chosenValue;
			break;

			case 'phone':
				chosenValue = phoneFormat(chosenValue);
			break;

			case 'url':
				chosenValue = urlFormat(chosenValue);
			break;
        }

        const newObj = getSingleModifiedState(this.props.vendor, name, chosenValue);

        this.setState({
			isRequiredField: addressFieldsOn ? checkAddressInputFields(newObj) : false
        });

		this.props.onChange(newObj);
    }

	// Handle auto complete select
	onHandleSelect(modified) {
		this.props.onChange(getNestedModifiedState(this.props.vendor, modified));
	}

	// Render
    render() {
		// Get api vehicles list
		let categoryOptions = this.props.categories.map((cat, catIndex) => {
			return (
				<option key={ catIndex } value={ cat.id }>{ upperFirstLetter(cat.name) }</option>
			);
		});

		let vendorForm =
			<form onSubmit={ this.props.onSubmit.bind(this) }>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Category</label>
						<div className="input-group">
							<select
								name="category_id"
								className="form-control input-sm"
								onChange={ this.onHandleFormChange.bind(this) }
								value={ this.props.vendor.category_id }>
								<option value="">Select One</option>
								{ categoryOptions }
							</select>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Company</label>
						<div className="input-group">
							<input
								name="company"
								type="text"
								className="form-control input-sm"
								onChange={ this.onHandleFormChange.bind(this) }
								value={ this.props.vendor.company }
								required="required"
							/>
						</div>
					</div>
				</div>
				<div className={ classNames('form-group', {'required': this.state.isRequiredField }) }>
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Street</label>
						<div className="input-group">
							<AutoCompleteAddress
								inputProps = {
									{
										name: "street",
										value: this.props.vendor.street,
										inputIds: ['street', 'city', 'state', 'zip', 'country'],
										onChange: this.onHandleFormChange.bind(this),
										onSelect: this.onHandleSelect,
										required: classNames({'required': this.state.isRequiredField })
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
								name="city"
								type="text"
								className="form-control input-sm"
								onChange={ this.onHandleFormChange.bind(this) }
								value={ this.props.vendor.city }
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
										name: "state",
										className: "form-control input-sm",
										value: this.props.vendor.state,
										onChange: this.onHandleFormChange.bind(this),
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
										name: "zip",
										className: "form-control input-sm",
										value: this.props.vendor.zip,
										onChange: this.onHandleFormChange.bind(this),
										required: classNames({'required': this.state.isRequiredField})
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
										name: "country",
										className: "form-control input-sm",
										value: this.props.vendor.country,
										onChange: this.onHandleFormChange.bind(this),
										required: classNames({'required': this.state.isRequiredField})
									}
								}
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Phone</label>
						<div className="input-group">
							<InputPhone
								inputProps={
									{
										name: "phone",
										className: "form-control input-sm",
										value: this.props.vendor.phone,
										onChange: this.onHandleFormChange.bind(this),
										required: ""
									}
								}
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Contact</label>
						<div className="input-group">
							<input
								name="contact"
								type="text"
								className="form-control input-sm"
								onChange={ this.onHandleFormChange.bind(this) }
								value={ this.props.vendor.contact }
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Url</label>
						<div className="input-group">
							<InputUrl
								inputProps={
									{
										name: "url",
										className: "form-control input-sm",
										value: this.props.vendor.url,
										onChange: this.onHandleFormChange.bind(this),
										required: ""
									}
								}
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Notes</label>
						<div className="input-group">
								<textarea
									name="notes"
									rows="5"
									className="form-control"
									onChange={ this.onHandleFormChange.bind(this) }
									value={ this.props.vendor.notes }
								/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input type="hidden" value={ this.props.vendor.id }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-12">
						<div className="clearfix">
							<button type="submit" value="Save" className="btn"><i className="fa fa-floppy-o"/> Save</button>
						</div>
					</div>
				</div>
			</form>;

        return (
			<div>{ vendorForm }</div>
        );
    }
}

export default SettingsVendor;