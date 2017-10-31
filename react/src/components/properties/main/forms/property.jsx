import React from 'react';
import PropertyAddressForm from './../../address/forms/address';
import YearsField from '../../../helper/forms/hybrid_field';
import Uploader from '../../../helper/uploader';
import { numberFormat } from '../../../helper/utils';

class PropertyForm extends React.Component
{
    constructor(props) {
        super(props);

		this.setAssets = this.setAssets.bind(this);
    }

	c// Handle assets
	setAssets(assets) {
		let property = this.state.property;
		property['assets'] = assets;

		this.setState({
			property: property
		});
	}

    // Handle input changes
	onHandleFormChange(propertyName, event) {
        let property    = this.state.property;
        let chosenValue = event.target.value;

        switch (propertyName) {
            case 'finished_area':
            case 'unfinished_area':
            case 'total_area':
                if (chosenValue === 0) {
                    alert('Please enter correct area.');
                } else {
					property[propertyName] = numberFormat(chosenValue);
                }
            break;

            default:
                property[propertyName] = chosenValue;
        }

        this.setState({property: property});
    }

	// Handle when dropdown field is selected
	onHandleYear(value) {
		let vehicle = this.state.vehicle;
		vehicle['year'] = value;

		this.setState({
			vehicle: vehicle
		});
	}

	// Submit
	handleFormSubmit(event) {
		event.preventDefault();

		this.props.onHandleSubmit(this.state.property, 'property');
	}

	render() {
		let property  	  = this.state.property;
		let bedsOptions   = [];
		let bathsOptions  = [];
		let floorsOptions = [];

		// Bed options
		for (let j = 0; j <= 15; j++) {
			bedsOptions.push(<option key={ 'be-' + j } value={ j }>{ j }</option>)
		}

		// Bath options
		let half = 0;
		for (let k = 1; k <= 10; k++) {
			half = k + 0.5;
			bathsOptions.push(<option key={ 'ba-' + k } value={ k }>{ k }</option>)
			bathsOptions.push(<option key={ 'ba-' + half } value={ half }>{ half }</option>)
		}

		// Floor options
		for (let x = 0; x <= 10; x++) {
			floorsOptions.push(<option key={ 'f-' + x } value={ x }>{ x }</option>)
		}

		let propertyForm =
			<form onSubmit={ this.handleFormSubmit.bind(this) }>
				<div>
					<hr/>
					<p>General Information</p>
					<hr/>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Image</label>
						<Uploader
							inputProps={
								{
									className: "input-group",
									assets: this.state.property.assets,
									isEditingMode: this.props.isEditingMode
								}
							}
						/>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Built</label>
						<div className="input-group">
							<YearsField
								inputProps={
									{
										auto: true,
										name: "built",
										list: sequencedObject(1920, (new Date()).getFullYear() + 1),
										value: this.state.property.built,
										onChange: this.onHandleFormChange,
										onSelect: this.onHandleYear,
										required: "required"
									}
								}
							/>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Style</label>
						<div className="input-group">
							<select
								onChange={ this.onHandleFormChange.bind(this, 'style') }
								value={ property.style }
								className="form-control input-sm"
								required="required">
								<option value="">Select One</option>
								<option value="apartment">Apartment</option>
								<option value="attached-condo">Attached Condo</option>
								<option value="detached-condo">Detached Condo</option>
								<option value="townhouse">Townhouse</option>
								<option value="single-family">Single Family</option>
							</select>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Floors</label>
						<div className="input-group">
							<select
								onChange={ this.onHandleFormChange.bind(this, 'floors') }
								value={ property.floors }
								className="form-control input-sm"
								required="required">
								<option value="">Select One</option>
								{ floorsOptions }
							</select>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Beds</label>
						<div className="input-group">
							<select
								onChange={ this.onHandleFormChange.bind(this, 'beds') }
								value={ property.beds }
								className="form-control input-sm"
								required="required">
								<option value="">Select One</option>
								{ bedsOptions }
							</select>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Baths</label>
						<div className="input-group">
							<select
								onChange={ this.onHandleFormChange.bind(this, 'baths') }
								value={ property.baths }
								className="form-control input-sm"
								required="required">
								<option value="">Select One</option>
								{ bathsOptions }
							</select>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Finished Area</label>
						<div className="input-group">
							<input
								type="text"
								onChange={ this.onHandleFormChange.bind(this, 'finished_area') }
								value={ property.finished_area }
								className="form-control input-sm"/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Unfinished Area</label>
						<div className="input-group">
							<input
								type="text"
								onChange={ this.onHandleFormChange.bind(this, 'unfinished_area') }
								value={ property.unfinished_area }
								className="form-control input-sm"/>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Total Area</label>
						<div className="input-group">
							<input
								type="text"
								onChange={ this.onHandleFormChange.bind(this, 'total_area') }
								value={ property.total_area }
								className="form-control input-sm"
								required="required"/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Parcel Number</label>
						<div className="input-group">
							<input
								type="text"
								onChange={ this.onHandleFormChange.bind(this, 'parcel_number') }
								value={ property.parcel_number }
								className="form-control input-sm"/>
						</div>
					</div>
				</div>

				<PropertyAddressForm
					inputProps = { { address: property.address } }
				/>

				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input
								type="hidden"
								value={ property.id }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-12">
						<div className="clearfix">
							<input
								type="submit"
								value="Submit"
								className="btn"/>
						</div>
					</div>
				</div>
			</form>

        return (
			<div>{ propertyForm }</div>
        );
    }
}

export default PropertyForm;