import React from 'react';
import ReactDOM from 'react-dom';
import AppDispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
import ApiVehiclesStore from '../../stores/api-vehicles-store';
import MyVehiclesStore from '../../stores/my-vehicles-store';
import ActionCreator from '../../actions/action-creator';
import Loader from '../loader';

class VehicleForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            manufacturers: [],
            models: [],
            mfg_vehicle: {
                id: '',
                mfg_id: '',
                mfg: '',
                model_id: '',
                model: '',
                year: new Date().getFullYear(),
                color: '',
                vin: '',
                plate: '',
            },
            editingMode: false,
            newVehicleAdded: false,
            loader: true
        };

        this._onChange = this._onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setDefaultValue = this.setDefaultValue.bind(this);
        this.getVehicleFormValues = this.getVehicleFormValues.bind(this);
        this.hasContextData = this.hasContextData.bind(this);
    }

    componentWillMount() {
        ApiVehiclesStore.addChangeListener(this._onChange);
        MyVehiclesStore.addChangeListener(this._onChange);

        // Check if form is in editing mode

        if (this.hasContextData()) {
            this.setState({editingMode: true});
        }

        this.setState({mfg_id: 52});
    }

    componentDidMount() {
        ActionCreator.getApiVehicles();
    }

    componentWillUnmount() {
        ApiVehiclesStore.removeChangeListener(this._onChange);
        MyVehiclesStore.removeChangeListener(this._onChange);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.newVehicleAdded) {
            // Only redirect to list if new vehicle is being added
            MyVehiclesStore.unFlagNewVehicle();
            this.context.router.push('/vehicles');
            return false;
        }

        return true;
    }

    _onChange() {
        this.setState({
            manufacturers: ApiVehiclesStore.getApiVehicles(),
            newVehicleAdded: MyVehiclesStore.isNewVehicleAdded(),
            loader: false
        });
    }

    // Handle input changes
    handleChange(propertyName, event) {
        let vehicle = this.getVehicleFormValues();
        let chosenValue = event.target.value;

        switch (propertyName) {
            case 'mfg_id':
            case 'model_id':
            case 'year':
                if (chosenValue == 0) {
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

        if (this.hasContextData()) {
            this.context.myVehicle = vehicle;
        }

        this.setState({
            mfg_vehicle: vehicle
        });
    }

    // Submit
    handleSubmit(event) {
        event.preventDefault();

        // This gets the value from the input
        let formData = this.getVehicleFormValues();

        // Add new vehicle
        ActionCreator.addMyVehicle(formData);

        // Close panel after update
        if (this.state.editingMode) {
            AppDispatcher.handleViewAction({
                actionType: ActionConstants.UPDATE_MY_VEHICLE,
                vehicle: formData
            });

            this.props.closeRightPanel();
        }
    }

    // Get form data

    getVehicleFormValues() {
        let data = {
            id: this.refs.id.value,
            mfg_id: this.refs.mfg_id.value,
            mfg: this.refs.mfg.value,
            model_id: this.refs.model_id.value,
            model: this.refs.model.value,
            year: this.refs.year.value,
            color: this.refs.color.value,
            vin: this.refs.vin.value.trim(),
            plate: this.refs.plate.value.trim()
        };

        return data;
    }

    hasContextData() {
        if (this.context.myVehicle == undefined || Object.keys(this.context.myVehicle).length == 0) {
            return false;
        }

        return true;
    }

    // Get default value
    setDefaultValue(type) {
        // If context data exists, set state to pre-populate all models of current manufacturer
        if (this.hasContextData()  && this.state.editingMode) {
            return this.context.myVehicle[type];
        } else {
            return this.state.mfg_vehicle[type];
        }
    }

    // Handle event

    render() {
        // If loading is complete
        if (!this.state.loader) {
            let defaultMfgId = this.setDefaultValue('mfg_id');

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
            let apiModelsOptions = '';

            if (selectedMfg.length != 0) {
                apiModelsOptions = selectedMfg[0].models.map((veh, modelIndex) => {
                    return (
                        <option key={modelIndex} value={veh.model_id}>{ veh.model }</option>
                    );
                });
            }

            // Years options
            let yearsOptions = [];
            for (let i = 2014; i <= 2020; i++) {
                yearsOptions.push(<option key={'y-' + i} value={i}>{ i }</option>)
            }

            return (
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group required">
                        <div className="col-xs-12 col-md-8">
                            <label className="control-label">Year</label>
                            <div className="input-group">
                                <select ref="year" onChange={this.handleChange.bind(this, 'year')} value={this.setDefaultValue('year')} className="form-control input-sm" required="required">
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
                                <select ref="mfg_id" onChange={this.handleChange.bind(this, 'mfg_id')} value={this.setDefaultValue('mfg_id')} className="form-control input-sm" required="required">
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
                                <select ref="model_id" onChange={this.handleChange.bind(this, 'model_id')} value={this.setDefaultValue('model_id')} className="form-control input-sm" required="required">
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
                                <select ref="color" onChange={this.handleChange.bind(this, 'color')} value={this.setDefaultValue('color')} className="form-control input-sm" required="required">
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
                                <input type="text" ref="vin" onChange={this.handleChange.bind(this, 'vin')} value={this.setDefaultValue('vin')} className="form-control input-sm" required="required"/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group required">
                        <div className="col-xs-12 col-md-8">
                            <label className="control-label">Plate</label>
                            <div className="input-group">
                                <input type="text" ref="plate" onChange={this.handleChange.bind(this, 'plate')} value={this.setDefaultValue('plate')} className="form-control input-sm"  required="required"/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-12 col-md-8">
                            <div className="input-group">
                                <input type="hidden" ref="id" value={this.setDefaultValue('id')} />
                                <input type="hidden" ref="mfg" value={this.setDefaultValue('mfg')} />
                                <input type="hidden" ref="model" value={this.setDefaultValue('model')} />
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
            );
        } else {
            return (<Loader />);
        }
    }
}

// Context
VehicleForm.contextTypes = {
    myVehicle: React.PropTypes.object,
    router: React.PropTypes.object.isRequired
}

export default VehicleForm;