import React from 'react';
import ReactDOM from 'react-dom';
import AppDispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
import ApiVehiclesStore from '../../stores/api-vehicles-store';
import ActionCreator from '../../actions/action-creator';

class VehicleForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            manufacturers: [],
            models: [],
            mfg_vehicle: {
                mfg: '',
                model: '',
                year: '',
                color: '',
                vin: '',
                plate: '',
            },
            selectedMfg: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        ApiVehiclesStore.addChangeListener(this._onChange.bind(this));
    }

    componentDidMount() {
        ActionCreator.getApiVehicles();
}

    componentWillUnmount() {
        ApiVehiclesStore.removeChangeListener(this._onChange.bind(this));
    }

    _onChange() {
        this.setState({manufacturers: ApiVehiclesStore.getApiVehicles()});
    }

    handleChange(propertyName, event) {
        const vehicle = this.state.mfg_vehicle;

        switch(propertyName) {
            case 'manufacturer':
                let mfgId = event.target.value;

                if (mfgId == 0) {
                    alert('Please select correct manufacturer.');
                } else {
                    this.setState({selectedMfg: mfgId});
                }
            break;

            default:
                vehicle[propertyName] = event.target.value.toUpperCase();
        }

        this.setState({vehicle: vehicle});
    }

    handleSubmit(event) {
        event.preventDefault();

        // This gets the value from the input
        let formData = {
            mfg_id: ReactDOM.findDOMNode(this.refs.manufacturer).value.trim(),
            model: ReactDOM.findDOMNode(this.refs.model).value.trim(),
            year: ReactDOM.findDOMNode(this.refs.year).value.trim(),
            color: ReactDOM.findDOMNode(this.refs.color).value.trim(),
            vin: ReactDOM.findDOMNode(this.refs.vin).value.trim(),
            plate: ReactDOM.findDOMNode(this.refs.plate).value.trim()
        };

        ActionCreator.addMyVehicle(formData);
    }

    render() {
        // Manufacturers options
        let apiMfgsOptions = this.state.manufacturers.map((mfgs, mfgIndex) => {
            return (
                <option key={mfgIndex} value={mfgs.id}>{ mfgs.mfg }</option>
            );
        });

        // Get selected choice from dropdown
        let chosenMfg = this.state.manufacturers.filter(manufacturer => {
            return manufacturer.id == this.state.selectedMfg
        });

        // Models options by ID
        let apiModelsOptions = '';

        if (chosenMfg.length != 0) {
            apiModelsOptions = chosenMfg[0].models.map((veh, modelIndex) => {
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
                <div className="form-group">
                    <div className="col-xs-12 col-md-8">
                        <label className="">Year</label>
                        <div className="input-group">
                            <select name="year" ref="year">
                                { yearsOptions }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-12 col-md-8">
                        <label className="">Manufacturer</label>
                        <div className="input-group">
                            <select ref="manufacturer" onChange={this.handleChange.bind(this, 'manufacturer')} value={this.state.selectedMfg} className="form-control input-sm required">
                                <option key={0} value={0}>Select One</option>
                                { apiMfgsOptions }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-12 col-md-8">
                        <label className="">Model</label>
                        <div className="input-group">
                            <select ref="model" onChange={this.handleChange.bind(this, 'model')} value={this.state.mfg_vehicle.model} className="form-control input-sm required">
                                <option key={0} value={0}>Select One</option>
                                { apiModelsOptions }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-12 col-md-8">
                        <label className="">Color</label>
                        <div className="input-group">
                            <select ref="color" onChange={this.handleChange.bind(this, 'color')} value={this.state.mfg_vehicle.color} className="form-control input-sm required">
                                <option value="0">Select One</option>
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
                <div className="form-group">
                    <div className="col-xs-12 col-md-8">
                        <label className="">VIN</label>
                        <div className="input-group">
                            <input type="text" ref="vin" onChange={this.handleChange.bind(this, 'vin')} value={this.state.mfg_vehicle.vin} className="form-control input-sm required"/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-12 col-md-8">
                        <label className="">Plate</label>
                        <div className="input-group">
                            <input type="text" ref="plate" onChange={this.handleChange.bind(this, 'plate')} value={this.state.mfg_vehicle.plate} className="form-control input-sm required"/>
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
    }
}

export default VehicleForm;