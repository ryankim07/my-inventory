import React from 'react';
import Uploader from '../helper/uploader';
import Loader from '../helper/loader';

class VehicleAdd extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
			vehicle: this.props.state.vehicle
		}

		this.onHandleFormChange = this.onHandleFormChange.bind(this);
		this.handleFormSubmit   = this.handleFormSubmit.bind(this);
    }

	componentWillReceiveProps(nextProps) {
		if (nextProps.state.vehicle !== this.state.vehicle) {
			this.setState({
				vehicle: nextProps.state.vehicle
			});
		}
	}


    // Handle input changes
    onHandleFormChange(propertyName, event) {
    	let vehicle 	= this.state.vehicle;
        let chosenValue = propertyName === 'assets' ? event : event.target.value;

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

			case 'assets':
				vehicle[propertyName] = chosenValue[0];
			break;

            default:
                vehicle[propertyName] = chosenValue.toUpperCase();
        }

        this.setState({vehicle});
    }

    // Submit
    handleFormSubmit(event) {
		event.preventDefault();

		this.props.onHandleFormSubmit(this.state.vehicle);
	}

    render() {
		let vehicleForm   = '';
		let defaultMfgId  = parseInt(this.state.vehicle.mfg_id);
		let manufacturers = this.props.state.manufacturers;
		let vehicle		  = this.state.vehicle;

		if (!this.props.state.loader  && Object.keys(manufacturers).length !== 0) {
			let apiModelsOptions = '';
			let yearsOptions 	 = [];

				// Get manufacturers list
			let apiMfgsOptions = manufacturers.map((mfgs, mfgIndex) => {
					return (
						<option key={ mfgIndex } value={ mfgs.id }>{ mfgs.mfg }</option>
					);
				});

				// Get selected choice from dropdown
			let selectedMfg = manufacturers.filter(manufacturer => {
					return manufacturer.id === defaultMfgId
				});

				// Models options by ID
				if (selectedMfg.length !== 0) {
					apiModelsOptions = selectedMfg[0].models.map((veh, modelIndex) => {
						return (
							<option key={ modelIndex } value={ veh.model_id }>{ veh.model }</option>
						);
					});
				}

				// Years options
				for (let i = 2014; i <= 2020; i++) {
					yearsOptions.push(<option key={ 'y-' + i } value={ i }>{ i }</option>)
				}

			vehicleForm =
				<form onSubmit={ this.handleFormSubmit }>
					<div className="form-group">
						<div className="col-xs-12 col-md-8">
							<label className="control-label">Image</label>
							<div className="input-group">
								<Uploader
									onHandleFormChange={ this.onHandleFormChange }
									isEditingMode={ this.props.state.isEditingMode }
									assets={ vehicle.assets }
								/>
							</div>
						</div>
					</div>
					<div className="form-group required">
						<div className="col-xs-12 col-md-8">
							<label className="control-label">Year</label>
							<div className="input-group">
								<select ref="year"
										onChange={ this.onHandleFormChange.bind(this, 'year') }
										value={ vehicle.year }
										className="form-control input-sm"
										required="required">
									<option value="">Select One</option>
									{ yearsOptions }
								</select>
							</div>
						</div>
					</div>
					<div className="form-group required">
						<div className="col-xs-12 col-md-8">
							<label className="control-label">Manufacturer</label>
							<div className="input-group">
								<select ref="mfg_id"
										onChange={ this.onHandleFormChange.bind(this, 'mfg_id') }
										value={ vehicle.mfg_id }
										className="form-control input-sm"
										required="required">
									<option value="">Select One</option>
									{ apiMfgsOptions }
								</select>
							</div>
						</div>
					</div>
					<div className="form-group required">
						<div className="col-xs-12 col-md-8">
							<label className="control-label">Model</label>
							<div className="input-group">
								<select ref="model_id"
										onChange={ this.onHandleFormChange.bind(this, 'model_id') }
										value={ vehicle.model_id }
										className="form-control input-sm"
										required="required">
									<option value="">Select One</option>
									{ apiModelsOptions }
								</select>
							</div>
						</div>
					</div>
					<div className="form-group required">
						<div className="col-xs-12 col-md-8">
							<label className="control-label">Color</label>
							<div className="input-group">
								<select ref="color"
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
									   ref="vin"
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
								<input type="text"
									   ref="plate"
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
								<input type="hidden" ref="id" value={ vehicle.id } />
								<input type="hidden" ref="mfg" value={ vehicle.mfg } />
								<input type="hidden" ref="model" value={ vehicle.model } />
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
		} else {
			vehicleForm = <div><Loader /></div>;
		}

        return (
            <div className="col-xs-4 col-md-4" id="vehicle-add">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>Vehicle</span>
                                </div>
                                <div className="col-xs-2 col-md-2">
                                    <button onClick={ this.props.closeRightPanel }><i className="fa fa-window-close" aria-hidden="true" /></button>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">
                            { vehicleForm }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default VehicleAdd;