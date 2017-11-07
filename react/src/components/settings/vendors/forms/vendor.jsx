import React from 'react';
import classNames from 'classnames';
import AutoCompleteAddress from '../../../helper/forms/auto_complete_address';
import InputZipCode from '../../../helper/forms/input_zip_code';
import InputPhone from '../../../helper/forms/input_phone';
import StatesDropdown from '../../../helper/forms/hybrid_field';
import CountriesDropdown from '../../../helper/forms/hybrid_field';
import { getStates, getCountries } from "../../../helper/lists/region";
import { upperFirstLetter,
	     phoneFormat,
	     urlFormat,
		 checkAddressInputFields,
		 getNestedModifiedState } from '../../../helper/utils';

class SettingsVendor extends React.Component
{
	// Constructor
    constructor(props) {
        super(props);

        this.state = {
			selectedItem: '',
			isRequiredField: false
		};

        this.onHandleSelect     = this.onHandleSelect.bind(this);
		this.onHandleFormChange = this.onHandleFormChange.bind(this);
    }

	// Mounting component
	componentWillMount() {
		this.setState({
			selectedItem: this.props.vendor.id
		});
	}

	// Next state change
	componentWillReceiveProps(nextProps) {
		if (nextProps.vendor.id !== this.state.selectedItem) {
			this.setState({
				selectedItem: nextProps.vendor.id
			});
		}
	}

    // Handle input changes
    onHandleFormChange(event) {
		let fieldName 		= event.target.name;
        let chosenValue 	= event.target.value;
		let modifiedObj     = {};
		let addressFieldsOn = false;

		switch (fieldName) {
			case 'company':
			case 'contact':
				modifiedObj[fieldName] = upperFirstLetter(chosenValue);
			break;

			case 'street':
			case 'city':
			case 'state':
			case 'zip':
			case 'country':
				addressFieldsOn 	   = true;
				modifiedObj[fieldName] = fieldName === 'city' ? upperFirstLetter(chosenValue) : chosenValue;
			break;

			case 'phone':
				modifiedObj[fieldName] = phoneFormat(chosenValue);
			break;

			case 'url':
				modifiedObj[fieldName] = urlFormat(chosenValue);
			break;

			default:
				modifiedObj[fieldName] = chosenValue;
        }

        const newObj = getNestedModifiedState(this.props.vendor, modifiedObj);

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
		let vendorForm =
			<form onSubmit={ this.props.onSubmit }>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Company</label>
						<div className="input-group">
							<input
								name="company"
								type="text"
								className="form-control input-sm"
								onChange={ this.onHandleFormChange }
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
										onChange: this.onHandleFormChange,
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
								onChange={ this.onHandleFormChange }
								value={ this.props.vendor.city }
								required={ classNames({'required': this.state.isRequiredField }) }
							/>
						</div>
					</div>
				</div>
				<div className={ classNames('form-group', {'required': this.state.isRequiredField }) }>
					<div className="col-xs-12 col-md-8">
						<label className="control-label">State</label>
						<StatesDropdown
							inputProps={
								{
									auto: false,
									others: { name: "state", className: "form-control" },
									parentClassName: "",
									list: getStates(),
									value: this.props.vendor.state,
									onChange: this.onHandleFormChange,
									onSelect: "",
									required: classNames({'required': this.state.isRequiredField})
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
										name: "zip",
										className: "form-control input-sm",
										value: this.props.vendor.zip,
										onChange: this.onHandleFormChange,
										required: classNames({ 'required': this.state.isRequiredField })
									}
								}
							/>
						</div>
					</div>
				</div>
				<div className={ classNames('form-group', {'required': this.state.isRequiredField }) }>
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Country</label>
						<CountriesDropdown
							inputProps={
								{
									auto: false,
									others: { name: "country", className: "form-control" },
									parentClassName: "",
									list: getCountries(),
									value: this.props.vendor.country,
									onChange: this.onHandleFormChange,
									onSelect: "",
									required: classNames({'required': this.state.isRequiredField})
								}
							}
						/>
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
										onChange: this.onHandleFormChange,
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
								onChange={ this.onHandleFormChange }
								value={ this.props.vendor.contact }
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Url</label>
						<div className="input-group">
							<input
								name="url"
								type="url"
								pattern="https?://.+"
								className="form-control input-sm"
								value={ this.props.vendor.url }
								onChange={ this.onHandleFormChange }
								required=""
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
									onChange={ this.onHandleFormChange }
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
							<button type="submit" className="btn"><i className="fa fa-floppy-o"/> Save</button>
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