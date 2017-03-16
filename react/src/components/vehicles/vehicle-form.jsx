import React from 'react';
import ReactDOM from 'react-dom';
import VehiclesStore from '../../stores/vehicles-store';
import AppDispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
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
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        VehiclesStore.addChangeListener(this._onChange.bind(this));
    }

    componentDidMount() {
        ActionCreator.getManufacturers();
}

    componentWillUnmount() {
        VehiclesStore.removeChangeListener(this._onChange.bind(this));
    }

    _onChange() {
        this.setState({manufacturers: VehiclesStore.getManufacturers()});
        this.setState({models: VehiclesStore.getModels()});
    }

    handleChange(propertyName, event) {
        const vehicle = this.state.mfg_vehicle;

        switch(propertyName) {
            case 'manufacturers':
                let mfgId = event.target.value;

                if (mfgId == 0) {
                    alert('Please select correct manufacturer.');
                } else {
                    ActionCreator.getModelsByMfgId(mfgId);
                }
            break;

            case 'vin':
                vehicle[propertyName] = event.target.value.toUpperCase();
            break;

            default:
                vehicle[propertyName] = event.target.value;
        }

        this.setState({vehicle: vehicle});
    }

    handleSubmit(event) {
        event.preventDefault();

        // create ID
        let id = guid();

        // this gets the value from the input
        let mfg = ReactDOM.findDOMNode(this.refs.mfg).value.trim();
        let model = ReactDOM.findDOMNode(this.refs.model).value.trim();
        let year = ReactDOM.findDOMNode(this.refs.year).value.trim();
        let color = ReactDOM.findDOMNode(this.refs.color).value.trim();
        let vin = ReactDOM.findDOMNode(this.refs.vin).value.trim();
        let plate = ReactDOM.findDOMNode(this.refs.plate).value.trim();

        AppDispatcher.handleViewAction({
            actionType: ActionConstants.ADD_VEHICLE,
            new_vehicle: {
                id: id,
                mfg: mfg,
                model: model,
                year: year,
                color: color,
                vin: vin,
                plate: plate
            }
        });
    }

    render() {
        // Manufacturers options
        let mfgOptions = this.state.manufacturers.map((veh) => {
            return (
                <option key={veh.id} value={veh.mfg_id}>{ veh.mfg }</option>
            );
        });

        // Models options by ID
        let modelOptions = this.state.models.map((veh) => {
            return (
                <option key={veh.id} value={veh.model_id}>{ veh.model }</option>
            );
        });

        // Years options
        let yearsOptions = [];
        for (let i = 2014; i <= 2020; i++) {
            yearsOptions.push(<option key={i} value={i}>{ i }</option>)
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <div className="col-xs-12 col-md-8">
                        <label className="">Manufacturer</label>
                        <div className="input-group">
                            <select name="manufacturers" onChange={this.handleChange.bind(this, 'manufacturers')} className="form-control input-sm required">
                                <option key={0} value={0}>Select One</option>
                                { mfgOptions }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-12 col-md-8">
                        <label className="">Model</label>
                        <div className="input-group">
                            <select name="models" onChange={this.handleChange.bind(this, 'models')} className="form-control input-sm required">
                                { modelOptions }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-12 col-md-8">
                        <label className="">Year</label>
                        <div className="input-group">
                            <select name="years">
                                { yearsOptions }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-12 col-md-8">
                        <label className="">Color</label>
                        <div className="input-group">
                            <input type="text" onChange={this.handleChange.bind(this, 'color')} value={this.state.mfg_vehicle.color} className="form-control input-sm required"/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-12 col-md-8">
                        <label className="">VIN</label>
                        <div className="input-group">
                            <input type="text" onChange={this.handleChange.bind(this, 'vin')} value={this.state.mfg_vehicle.vin} className="form-control input-sm required"/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-12 col-md-8">
                        <label className="">Plate</label>
                        <div className="input-group">
                            <input type="text" onChange={this.handleChange.bind(this, 'plate')} value={this.state.mfg_vehicle.plate} className="form-control input-sm required"/>
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