import React from 'react';
import _ from 'lodash';
import ApiVehiclesStore from '../../stores/vehicles/api-store';
import MyVehiclesStore from '../../stores/vehicles/store';
import VehiclesAction from '../../actions/vehicles-action';
import Uploader from '../helper/uploader';
import Loader from '../loader';

class VehicleAdd extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            vehicle: {
                id: '',
                mfg_id: '',
                mfg: '',
                model_id: '',
                model: '',
                year: '',
                color: '',
                vin: '',
                plate: '',
				assets: []
            },
			manufacturers: [],
            isEditingMode: false,
            newVehicleAdded: false,
            loader: true,
			flashMessage: null
        };

        this._onChange 		  = this._onChange.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.setAssets 		  = this.setAssets.bind(this);
    }

    componentWillMount() {
        ApiVehiclesStore.addChangeListener(this._onChange);
        MyVehiclesStore.addChangeListener(this._onChange);
    }

    componentDidMount() {
        VehiclesAction.getApiVehicles();
    }

    componentWillUnmount() {
		ApiVehiclesStore.removeChangeListener(this._onChange);
		MyVehiclesStore.removeChangeListener(this._onChange);
		MyVehiclesStore.unsetVehicleToUpdate();
	}

    shouldComponentUpdate(nextProps, nextState) {
    	// Check here and don't render component again if it's an image upload action
		let emptyObj = _.every(_.values(nextState.vehicle), function(v) {return !v;});
		if (nextState.vehicle.assets !== '' && emptyObj) {
			return false;
		}

		// Only redirect to list if new vehicle is being added
        if (nextState.newVehicleAdded || this.state.newVehicleAdded) {
			MyVehiclesStore.unFlagNewVehicle();
			nextState.newVehicleAdded = false;
			this.context.router.push('/vehicles/dashboard');

			return false;
		}

		return true;
    }

    // Listen to changes in store, update it's own state
    _onChange() {
    	let addingNewVehicle = MyVehiclesStore.isNewVehicleAdded();
		let vehicleToUpdate = MyVehiclesStore.getVehicleToUpdate();
		let isEditingMode = this.state.isEditingMode;
		let stateVehicle = this.state.vehicle;
		let flashMsg = MyVehiclesStore.getStoreFlashMessage();
		let isAuthenticated = MyVehiclesStore.isAuthenticated();

		if (!isAuthenticated){
			this.context.router.push("/auth/login");
			return false;
		}

		if (!_.every(_.values(vehicleToUpdate), function(v) {return !v;})) {
			stateVehicle = vehicleToUpdate;
			isEditingMode = true;
		}

		this.setState({
		    vehicle: stateVehicle,
			manufacturers: ApiVehiclesStore.getApiVehicles(),
			isEditingMode: isEditingMode,
			newVehicleAdded: addingNewVehicle,
			loader: false,
			flashMessage: flashMsg !== undefined ? flashMsg : null
		});
    }

    // Handle input changes
    handleFormChange(propertyName, event) {
        let vehicle = this.state.vehicle;
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

        this.setState({
            vehicle: vehicle,
			manufacturers: this.state.manufacturers,
			isEditingMode: this.state.isEditingMode,
			newVehicleAdded: this.state.newVehicleAdded,
			loader: this.state.loader,
			flashMessage: this.state.flashMessage
        });
    }

    // Submit
    handleFormSubmit(event) {
        event.preventDefault();

        if (!this.state.isEditingMode) {
			VehiclesAction.addMyVehicle(this.state.vehicle);
		} else {
			VehiclesAction.updateMyVehicle(this.state.vehicle);

        	// Close the panel
            this.props.closeRightPanel();
        }
    }

    setAssets(assets) {
		let vehicle = this.state.vehicle;
		vehicle['assets'] = assets;
	}

    render() {
        let vehicleForm = '';

        // If loading is complete
        if (!this.state.loader) {
			let defaultMfgId = this.state.vehicle.mfg_id;
			let apiModelsOptions = '';
			let yearsOptions = [];

			// Get manufacturers list
			let apiMfgsOptions = this.state.manufacturers.map((mfgs, mfgIndex) => {
				return (
                    <option key={mfgIndex} value={mfgs.id}>{ mfgs.mfg }</option>
				);
			});

			// Get selected choice from dropdown
			let selectedMfg = this.state.manufacturers.filter(manufacturer => {
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

			vehicleForm = <form onSubmit={this.handleFormSubmit}>
								<div className="form-group">
									<div className="col-xs-12 col-md-8">
										<label className="control-label">Image</label>
										<div className="input-group">
											<Uploader setAssets={this.setAssets} isEditingMode={this.state.isEditingMode} assets={this.state.vehicle.assets} />
										</div>
									</div>
								</div>
                                <div className="form-group required">
                                    <div className="col-xs-12 col-md-8">
                                        <label className="control-label">Year</label>
                                        <div className="input-group">
                                            <select ref="year"
													onChange={this.handleFormChange.bind(this, 'year')}
                                                    value={this.state.vehicle.year}
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
                                                    value={this.state.vehicle.mfg_id}
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
                                                    value={this.state.vehicle.model_id}
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
                                                    value={this.state.vehicle.color}
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
                                                   value={this.state.vehicle.vin}
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
                                                   value={this.state.vehicle.plate}
												   className="form-control input-sm"
                                                   required="required"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-xs-12 col-md-8">
                                        <div className="input-group">
                                            <input type="hidden" ref="id" value={this.state.vehicle.id} />
                                            <input type="hidden" ref="mfg" value={this.state.vehicle.mfg} />
                                            <input type="hidden" ref="model" value={this.state.vehicle.model} />
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
            vehicleForm = <Loader />;
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
                                    { this.state.isEditingMode ? <button onClick={this.props.closeRightPanel} className="close close-viewer" value="Close"><span>&times;</span></button> : ''}
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

VehicleAdd.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default VehicleAdd;