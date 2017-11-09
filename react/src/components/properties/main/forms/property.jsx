import React from 'react';
import PropertyAddressForm from './../../address/forms/address';
import YearsDropdown from '../../../helper/forms/hybrid_field';
import FloorsDropdown from '../../../helper/forms/hybrid_field';
import BedsDropdown from '../../../helper/forms/hybrid_field';
import BathsDropdown from '../../../helper/forms/hybrid_field';
import Uploader from '../../../helper/uploader';
import { numberFormat,
		 sequencedObject,
		 getSingleModifiedState,
		 getNestedModifiedState } from '../../../helper/utils';

class PropertyForm extends React.Component
{
    constructor(props) {
        super(props);

		this.state = {
			selectedItem: '',
			assets: []
		};

		this.onHandleFormChange = this.onHandleFormChange.bind(this);
		this.onHandleAssets     = this.onHandleAssets.bind(this);
		this.onHandleAddress    = this.onHandleAddress.bind(this);
		this.onHandleSelect     = this.onHandleSelect.bind(this);
		this.onHandleSubmit 	= this.onHandleSubmit.bind(this);
    }

	// Mounting component
	componentWillMount() {
		this.setState({
			selectedItem: this.props.property.id,
			assets: this.props.property.assets
		});
	}

	// Next state change
	componentWillReceiveProps(nextProps) {
		if (nextProps.property.id !== this.state.selectedItem) {
			this.setState({
				selectedItem: nextProps.property.id,
				assets: nextProps.property.assets
			});
		}
	}

    // Handle input changes
	onHandleFormChange(event) {
		let fieldName 	= event.target.name;
		let chosenValue = event.target.value;
		let modifiedObj = {};

        switch (fieldName) {
            case 'finished_area':
            case 'unfinished_area':
            case 'total_area':
                if (chosenValue === 0) {
                    alert('Please enter correct area.');
                } else {
					modifiedObj[fieldName] = numberFormat(chosenValue);
                }
            break;

            default:
				modifiedObj[fieldName] = chosenValue;
        }

		this.props.onChange(getNestedModifiedState(this.props.property, modifiedObj));
    }

	// Handle when years dropdown field is selected
	onHandleSelect(property, value) {
		this.props.onChange(getSingleModifiedState(this.props.property, property, value));
	}

	onHandleAddress(address) {
		this.props.onChange(getSingleModifiedState(this.props.property, 'address', address));
	}

	// Handle assets
	onHandleAssets(assets) {
		this.setState({ assets: assets });
	}

	onHandleSubmit(event) {
		event.preventDefault();

		let property       = this.props.property;
		property['assets'] = this.state.assets;

		this.props.onSubmit(property);
	}

	render() {
		let propertyForm =
			<form onSubmit={ this.onHandleSubmit }>
				<div>
					<hr/>
					<p>General Information</p>
					<hr/>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Photo</label>
						<Uploader
							inputProps={
								{
									className: "input-group",
									assets: this.state.assets,
									onChange: this.onHandleAssets
								}
							}
						/>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Built</label>
						<YearsDropdown
							inputProps={
								{
									auto: true,
									others: { name: "built", className: "form-control" },
									list: sequencedObject(1980, (new Date()).getFullYear() + 1),
									value: this.props.property.built,
									onChange: this.onHandleFormChange,
									onSelect: this.onHandleSelect.bind(this, 'built'),
									required: true
								}
							}
						/>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Style</label>
						<div className="input-group">
							<select
								name="style"
								onChange={ this.onHandleFormChange }
								value={ this.props.property.style }
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
						<FloorsDropdown
							inputProps={
								{
									auto: false,
									others: { name: "floors", className: "form-control" },
									list: sequencedObject(1, 10),
									value: this.props.property.floors,
									onChange: this.onHandleFormChange,
									required: true
								}
							}
						/>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Beds</label>
						<BedsDropdown
							inputProps={
								{
									auto: false,
									others: { name: "beds", className: "form-control" },
									list: sequencedObject(0, 15),
									value: this.props.property.beds,
									onChange: this.onHandleFormChange,
									required: true
								}
							}
						/>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Baths</label>
						<BathsDropdown
							inputProps={
								{
									auto: false,
									others: { name: "baths", className: "form-control" },
									list: sequencedObject(1, 10, 0.5),
									value: this.props.property.baths,
									onChange: this.onHandleFormChange,
									required: true
								}
							}
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Finished Area</label>
						<div className="input-group">
							<input
								name="finished_area"
								type="text"
								onChange={ this.onHandleFormChange }
								value={ this.props.property.finished_area }
								className="form-control input-sm"/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Unfinished Area</label>
						<div className="input-group">
							<input
								name="unfinished_area"
								type="text"
								onChange={ this.onHandleFormChange }
								value={ this.props.property.unfinished_area }
								className="form-control input-sm"/>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Total Area</label>
						<div className="input-group">
							<input
								name="total_area"
								type="text"
								onChange={ this.onHandleFormChange }
								value={ this.props.property.total_area }
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
								name="parcel_number"
								type="text"
								onChange={ this.onHandleFormChange }
								value={ this.props.property.parcel_number }
								className="form-control input-sm"/>
						</div>
					</div>
				</div>

				<PropertyAddressForm
					inputProps = {
						{
							address: this.props.property.address,
							onChange: this.onHandleAddress
						}
					}
				/>

				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input
								type="hidden"
								value={ this.props.property.id }/>
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
			<div>{ propertyForm }</div>
        );
    }
}

export default PropertyForm;