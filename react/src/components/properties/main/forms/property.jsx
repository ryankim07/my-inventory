import React from 'react';
import PropertyAddressForm from './../../address/forms/address';
import Uploader from '../../../helper/uploader';
import { numberFormat } from '../../../helper/utils';

class PropertyForm extends React.Component
{
    constructor(props) {
        super(props);

		this.state = {
			property: this.props.property
		}

		this.onHandleFormChange = this.onHandleFormChange.bind(this);
		this.setAssets     		= this.setAssets.bind(this);
    }

	componentWillReceiveProps(nextProps) {
		if (nextProps.property !== this.state.property) {
			this.setState({
				property: nextProps.property
			});
		}
	}

	// Handle assets
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
        let chosenValue = propertyName === 'address' ? event : event.target.value;

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

	// Submit
	handleFormSubmit(event) {
		event.preventDefault();

		this.props.onHandleFormSubmit(this.state.property, 'property');
	}

	render() {
		let property  	  = this.state.property;
        let builtOptions  = [];
		let bedsOptions   = [];
		let bathsOptions  = [];
		let floorsOptions = [];

		// Built options
		for (let i = 1970; i <= 2050; i++) {
			builtOptions.push(<option key={ 'y-' + i } value={ i }>{ i }</option>)
		}

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
						<div className="input-group">
							<Uploader
								assets={ property.assets }
								isEditingMode={ this.props.isEditingMode }
								setAssets={ this.setAssets }
							/>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Built</label>
						<div className="input-group">
							<select
								onChange={ this.onHandleFormChange.bind(this, 'built') }
								value={ property.built }
								className="form-control input-sm"
								required="required">
								<option value="">Select One</option>
								{ builtOptions }
							</select>
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
				<div>
					<hr/>
					<p>Address Information</p>
					<hr/>
				</div>

				<PropertyAddressForm
					address={ property.address }
					onHandleFormChange={ this.onHandleFormChange }
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
			<div className="row" id="property-form">
				<div className="panel panel-info">
					<div className="panel-heading">
						<div className="row">
							<div className="col-xs-10 col-md-10">
								<span>Property</span>
							</div>
							<div className="col-xs-2 col-md-2">
								<button onClick={ this.props.closeRightPanel }><i className="fa fa-window-close" aria-hidden="true"/></button>
							</div>
						</div>
					</div>
					<div className="panel-body">
						{ propertyForm }
					</div>
				</div>
			</div>
        );
    }
}

export default PropertyForm;