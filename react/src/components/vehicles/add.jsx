import React from 'react';
import VehiclesAction from '../../actions/vehicles-action';
import Uploader from '../helper/uploader';

class VehicleAdd extends React.Component
{
    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.setAssets 		  = this.setAssets.bind(this);
    }

    // Handle input changes
    handleFormChange(propertyName, event) {
        let vehicle 	= this.props.state.vehicle;
        let chosenValue = event.target.value;

        switch (propertyName) {
            case 'mfg_id':
            case 'model_id':
            case 'year':
                if (chosenValue === 0) {
                    alert('Please select correct manufacturer.');
                } else {
                    vehicle[propertyName] = chosenValue;
                    vehicle['vin'] = '';
                }
            break;

            case 'color':
                vehicle[propertyName] = chosenValue;
            break;

            default:
                vehicle[propertyName] = chosenValue.toUpperCase();
        }

        this.props.handleFormChange(vehicle);
    }

    // Submit
    handleFormSubmit(event) {
		event.preventDefault();

		if (!this.props.state.isEditingMode) {
			VehiclesAction.addMyVehicle(this.props.state.vehicle);
		} else {
			VehiclesAction.updateMyVehicle(this.props.state.vehicle);
		}

		// Close the panel
		this.props.closeRightPanel();
	}

    setAssets(assets) {
		let vehicle = this.props.state.vehicle
		vehicle['assets'] = assets;

		this.props.handleFormChange(vehicle);
	}

    render() {
		let defaultMfgId = this.props.state.vehicle.mfg_id;
			let apiModelsOptions = '';
			let yearsOptions = [];

			// Get manufacturers list
		let apiMfgsOptions = this.props.state.manufacturers.map((mfgs, mfgIndex) => {
				return (
                    <option key={mfgIndex} value={mfgs.id}>{ mfgs.mfg }</option>
				);
			});

			// Get selected choice from dropdown
		let selectedMfg = this.props.state.manufacturers.filter(manufacturer => {
				return manufacturer.id == defaultMfgId
			});

			// Models options by ID
			if (selectedMfg.length !== 0) {
				apiModelsOptions = selectedMfg[0].models.map((veh, modelIndex) => {
					return (
                        <option key={modelIndex} value={veh.model_id}>{ veh.model }</option>
					);
				});
			}

			// Years options
			for (let i = 2014; i <= 2020; i++) {
				yearsOptions.push(<option key={'y-' + i} value={i}>{ i }</option>)
			}

		let vehicleForm = <form onSubmit={this.handleFormSubmit}>
								<div className="form-group">
									<div className="col-xs-12 col-md-8">
										<label className="control-label">Image</label>
										<div className="input-group">
						<Uploader setAssets={this.setAssets} isEditingMode={this.props.state.isEditingMode} assets={this.props.state.vehicle.assets} />
										</div>
									</div>
								</div>
                                <div className="form-group required">
                                    <div className="col-xs-12 col-md-8">
                                        <label className="control-label">Year</label>
                                        <div className="input-group">
                                            <select ref="year"
													onChange={this.handleFormChange.bind(this, 'year')}
													value={this.props.state.vehicle.year}
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
													onChange={this.handleFormChange.bind(this, 'mfg_id')}
													value={this.props.state.vehicle.mfg_id}
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
													onChange={this.handleFormChange.bind(this, 'model_id')}
													value={this.props.state.vehicle.model_id}
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
													onChange={this.handleFormChange.bind(this, 'color')}
													value={this.props.state.vehicle.color}
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
												   onChange={this.handleFormChange.bind(this, 'vin')}
							   						value={this.props.state.vehicle.vin}
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
												   onChange={this.handleFormChange.bind(this, 'plate')}
							   						value={this.props.state.vehicle.plate}
												   className="form-control input-sm"
                                                   required="required"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-xs-12 col-md-8">
                                        <div className="input-group">
											<input type="hidden" ref="id" value={this.props.state.vehicle.id} />
											<input type="hidden" ref="mfg" value={this.props.state.vehicle.mfg} />
											<input type="hidden" ref="model" value={this.props.state.vehicle.model} />
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
            <div className="col-xs-4 col-md-4" id="vehicle-add">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>Vehicle</span>
                                </div>
                                <div className="col-xs-2 col-md-2">
                                    { this.props.state.isEditingMode ? <button onClick={this.props.closeRightPanel} className="close close-viewer" value="Close"><span>&times;</span></button> : ''}
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