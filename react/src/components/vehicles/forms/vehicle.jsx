import React from 'react';
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

		this.onHandleFormChange = this.onHandleFormChange.bind(this);
		this.setAssets     		= this.setAssets.bind(this);
		this.handleFormSubmit   = this.handleFormSubmit.bind(this);
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
		let defaultMfgId  = parseInt(vehicle.mfg_id);
		let yearsOptions  = [];

		// Years options
		for (let i = 2014; i <= 2020; i++) {
			yearsOptions.push(<option key={ 'y-' + i } value={ i }>{ i }</option>)
		}

		// Get api vehicles list
		let apiMfgsOptions = manufacturers.map((mfgs, mfgIndex) => {
			return (
				<option key={ mfgIndex } value={ mfgs.id }>{ mfgs.mfg }</option>
			);
		});

		// Get selected choice from api vehicles dropdown
		let selectedMfg = manufacturers.filter(manufacturer => {
			return manufacturer.id === defaultMfgId
		});

		// Models options by ID
		let apiModelsOptions = '';
		if (selectedMfg.length !== 0) {
			apiModelsOptions = selectedMfg[0].models.map((manufacturer, modelIndex) => {
				return (
					<option key={ modelIndex } value={ manufacturer.model_id }>{ manufacturer.model }</option>
				);
			});
		}

		let vehicleForm =
			<form onSubmit={ this.handleFormSubmit }>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Image</label>
						<div className="input-group">
							<Uploader
								assets={ vehicle.assets }
								isEditingMode={ this.props.isEditingMode }
								setAssets={ this.setAssets }
							/>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Year</label>
						<div className="input-group">
							<select
								onChange={ this.onHandleFormChange.bind(this, 'year') }
								value={ vehicle.year }
								className="form-control input-sm"
								required="required">
								<option value="">Select One</option>
								{yearsOptions}
							</select>
						</div>
					</div>
				</div>

				{
					// Need to display loader if add new vehicle component is accessed from header
					!this.props.loader ?
						<div>
							<div className="form-group required">
								<div className="col-xs-12 col-md-8">
									<label className="control-label">Manufacturer</label>
									<div className="input-group">
										<select
											onChange={this.onHandleFormChange.bind(this, 'mfg_id')}
											value={vehicle.mfg_id}
											className="form-control input-sm"
											required="required">
											<option value="">Select One</option>
											{apiMfgsOptions}
										</select>
									</div>
								</div>
							</div>
							<div className="form-group required">
								<div className="col-xs-12 col-md-8">
									<label className="control-label">Model</label>
									<div className="input-group">
										<select
											onChange={this.onHandleFormChange.bind(this, 'model_id')}
											value={vehicle.model_id}
											className="form-control input-sm"
											required="required">
											<option value="">Select One</option>
											{apiModelsOptions}
										</select>
									</div>
								</div>
							</div>
						</div> :
						<div><Loader/></div>
				}

				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Color</label>
						<div className="input-group">
							<select
								onChange={ this.onHandleFormChange.bind(this, 'color') }
								value={ vehicle.color }
								className="form-control input-sm"
								required="required">
								<option value="">Select One</option>
								<option value="white">White</option>
								<option value="black">Black</option>
								<option value="silver">Silver</option>
								<option value="red">Red</option>
								<option value="yellow">Yellow</option>
								<option value="orange">Orange</option>
							</select>
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