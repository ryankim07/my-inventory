import React from 'react';
import classNames from 'classnames';
import AutoCompleteAddress from "../../../helper/forms/auto_complete_address";
import InputZipCode from '../../../helper/forms/input_zip_code';
import StatesDropdown from '../../../helper/forms/states_dropdown';
import CountriesDropdown from '../../../helper/forms/countries_dropdown';
import { upperFirstLetter, phoneFormat, urlFormat, checkAddressInputFields } from '../../../helper/utils';

class SettingsVendor extends React.Component
{
	// Constructor
    constructor(props) {
        super(props);

        this.state = {
			vendor: this.props.vendor,
			isRequiredField: false
		};

        this.parentObjSetter  = this.parentObjSetter.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    // When it receives new values
	componentWillReceiveProps(nextProps) {
		if (nextProps.vendor !== this.props.vendor) {
			this.setState({ vendor: nextProps.vendor });
		}
	}

	// Vendor object setter
	parentObjSetter(obj) {
		this.setState(obj);
	}

    // Handle input changes
    onHandleFormChange(propertyName, event) {
    	let vendor 	    	= this.state.vendor;
        let chosenValue 	= propertyName === 'street' ? event : event.target.value;
		let isRequiredField = this.state.isRequiredField;

			switch (propertyName) {
			case 'company':
			case 'contact':
				vendor[propertyName] = upperFirstLetter(chosenValue);
			break;

			case 'street':
			case 'city':
			case 'state':
			case 'zip':
			case 'country':
				vendor[propertyName] = chosenValue;
				isRequiredField = checkAddressInputFields(vendor);
				vendor[propertyName] = propertyName === 'city' ? upperFirstLetter(chosenValue) : chosenValue;
			break;

			case 'phone':
				vendor[propertyName] = phoneFormat(chosenValue);
			break;

			case 'url':
				vendor[propertyName] = urlFormat(chosenValue);
			break;

			default:
				vendor[propertyName] = chosenValue;
        }

		this.setState({
			vendor: vendor,
			isRequiredField: isRequiredField
		});
    }

    // Submit
    handleFormSubmit(event) {
		event.preventDefault();
		this.props.onHandleFormSubmit(this.state.vendor);
	}

	// Render
    render() {
		let vendor = this.state.vendor;

		// Get api vehicles list
		let categoryOptions = this.props.categories.map((cat, catIndex) => {
			return (
				<option key={ catIndex } value={ cat.id }>{ upperFirstLetter(cat.name) }</option>
			);
		});

		let vendorForm =
			<form onSubmit={ this.handleFormSubmit }>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Category</label>
						<div className="input-group">
							<select
								className="form-control input-sm"
								onChange={ this.onHandleFormChange.bind(this, 'category_id') }
								value={ vendor.category_id }>
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
								type="text"
								className="form-control input-sm"
								onChange={ this.onHandleFormChange.bind(this, 'company') }
								value={ vendor.company }
								required="required"
							/>
						</div>
					</div>
				</div>
				<div className={ classNames('form-group', {'required': this.state.isRequiredField }) }>
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Street</label>
						<AutoCompleteAddress
							list={ vendor }
							listObjName="vendor"
							listObjSetter={ this.parentObjSetter }
							onChange={ this.onHandleFormChange.bind(this) }
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
								onChange={ this.onHandleFormChange.bind(this, 'city') }
								value={ vendor.city }
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
								className="form-control input-sm"
								value={ vendor.zip }
								onHandleFormChange={ this.onHandleFormChange.bind(this, 'zip') }
								required={ classNames({'required': this.state.isRequiredField }) }
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
								value={ vendor.country }
								onHandleFormChange={ this.onHandleFormChange.bind(this, 'country') }
								required={ classNames({'required': this.state.isRequiredField }) }
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Phone</label>
						<div className="input-group">
							<input
								type="tel"
								className="form-control input-sm"
								onChange={ this.onHandleFormChange.bind(this, 'phone') }
								value={ vendor.phone }
								pattern="^(\d{3}) \d{3}-\d{4}$"
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Contact</label>
						<div className="input-group">
							<input
								type="text"
								className="form-control input-sm"
								onChange={ this.onHandleFormChange.bind(this, 'contact') }
								value={ vendor.contact }
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Url</label>
						<div className="input-group">
							<input
								type="url"
								className="form-control input-sm"
								onChange={ this.onHandleFormChange.bind(this, 'url') }
								value={ vendor.url }
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Notes</label>
						<div className="input-group">
								<textarea
									rows="5"
									className="form-control"
									onChange={ this.onHandleFormChange.bind(this, 'notes') }
									value={ vendor.notes }
								/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input type="hidden" value={ vendor.id }/>
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