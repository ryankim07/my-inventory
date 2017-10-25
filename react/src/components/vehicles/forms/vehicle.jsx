import React from 'react';
import AbstractDropdown from "../../helper/forms/abstract_dropdown";
import YearsDropdown from '../../helper/forms/years_dropdown';
import VehicleColorsDropdown  from '../../helper/forms/vehicle_colors_dropdown';
import Uploader from '../../helper/uploader';
import Loader from '../../helper/loader';
import { upperFirstLetter } from "../../helper/utils";

class VehicleForm extends React.Component
{
	// Constructor
    constructor(props) {
        super(props);

        this.state = {
			vehicle: this.props.vehicle
		};

		this.setAssets     	  = this.setAssets.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    // Next state change
	componentWillReceiveProps(nextProps) {
		if (nextProps.vehicle !== this.props.vehicle) {
			this.setState({
				vehicle: nextProps.vehicle
			});
		}
	}

    // Handle input changes
    onHandleFormChange(propertyName, event) {
    	let vehicle 	= this.state.vehicle;
        let chosenValue = event.target.value;

        switch (propertyName) {
            case 'mfg_id':
            case 'model_id':
            case 'year':
			case 'color':
                if (chosenValue === 0) {
                    alert('Please select correct manufacturer.');
                } else {
                    vehicle[propertyName] = chosenValue;
                    vehicle['vin'] = '';
                }
            break;

			case 'vin':
			case 'plate':
				vehicle[propertyName] = chosenValue.toUpperCase();
			break;

            default:
                vehicle[propertyName] = upperFirstLetter(chosenValue);
        }

        this.setState({
			vehicle: vehicle
        });
    }

    // Handle when dropdown field is selected
    onHandleAutoSelectChanges(value) {
		let vehicle = this.state.vehicle;
		this.setState({
			vehicle: vehicle['year'] = value
		});
	}

	// Handle assets
	setAssets(assets) {
		let vehicle = this.state.vehicle;
		vehicle['assets'] = assets

		this.setState({
			vehicle: vehicle
		});
	}

    // Submit
    handleFormSubmit(event) {
		event.preventDefault();

		this.props.onHandleFormSubmit(this.state.vehicle);
	}

	// Render
    render() {
		let manufacturers = this.props.manufacturers;
		let vehicle       = this.state.vehicle;
		let defaultMfgId  = vehicle.mfg_id !== "" ? parseInt(vehicle.mfg_id) : false;

		// Generate json list of manufacturers
		let mfgOptions = manufacturers.map((mfgs, mfgIndex) => {
			return (<option key={ mfgIndex } value={ mfgs.id }>{ mfgs.mfg }</option>);
		});

		// Get selected choice from api vehicles dropdown
		let selectedMfg = manufacturers.length > 0 && defaultMfgId ?
			manufacturers.filter(manufacturer => {
				return manufacturer.id === defaultMfgId
			}) : false;

		// Generate json list of models
		let modelsOptions = selectedMfg ? selectedMfg[0].models.map((manufacturer, modelIndex) => {
			return (<option key={ modelIndex } value={ manufacturer.model_id }>{ manufacturer.model }</option>);
		}) : '';

		// Need to display loader if add new vehicle component is accessed from header
		let mfgAndModelsFields = !this.props.loader ?
			<div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Manufacturer</label>
						<div className="input-group">
							<AbstractDropdown
								inputProps={
									{
										className: "form-control input-sm",
										value: vehicle.mfg,
										onChange: this.onHandleFormChange.bind(this, 'mfg_id'),
										required: "required"
									}
								}>
								<option value="">Select One</option>
								{ mfgOptions }
							</AbstractDropdown>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Model</label>
						<div className="input-group">
							<AbstractDropdown
								inputProps={
									{
										className: "form-control input-sm",
										value: vehicle.model,
										onChange: this.onHandleFormChange.bind(this, 'model_id'),
										required: "required"
									}
								}>
								<option value="">Select One</option>
								{ modelsOptions }
							</AbstractDropdown>
						</div>
					</div>
				</div>
			</div> : <div><Loader/></div>;

		let vehicleForm =
			<form onSubmit={ this.handleFormSubmit }>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Image</label>
						<div className="input-group">
							<Uploader
								inputProps={
									{
										assets: vehicle.assets,
										isEditingMode: this.props.isEditingMode,
										setAssets: this.setAssets
									}
								}
							/>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Year</label>
						<YearsDropdown
							inputProps={
								{
									className: "form-control input-sm",
									fromYear: 2010,
									toYear: (new Date()).getFullYear(),
									type: 'auto',
									value: vehicle.year,
									onChange: this.onHandleFormChange.bind(this, 'year'),
									onSelect: this.onHandleAutoSelectChanges.bind(this),
									required: "required"
								}
							}
						/>
					</div>
				</div>

				{ mfgAndModelsFields }

				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Color</label>
						<div className="input-group">
							<VehicleColorsDropdown
								inputProps={
									{
										assets: vehicle.assets,
										isEditingMode: this.props.isEditingMode,
										setAssets: this.setAssets
									}
								}
							/>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">VIN</label>
						<div className="input-group">
							<input type="text"
								onChange={ this.onHandleFormChange.bind(this, 'vin') }
								value={ vehicle.vin }
								className="form-control input-sm"
								required="required"/>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Plate</label>
						<div className="input-group">
							<input
								type="text"
								onChange={ this.onHandleFormChange.bind(this, 'plate') }
								value={ vehicle.plate }
								className="form-control input-sm"
								required="required"/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input type="hidden" value={ vehicle.id }/>
							<input type="hidden" value={ vehicle.mfg }/>
							<input type="hidden" value={ vehicle.model }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-12">
						<div className="clearfix">
							<button type="submit" value="Save"><i className="fa fa-floppy-o"/> Save</button>
						</div>
					</div>
				</div>
			</form>;

        return (
			<div>{ vehicleForm }</div>
        );
    }
}

export default VehicleForm;