import React from 'react';
import MyVehiclesStore from '../../stores/my-vehicles-store';
import AppDispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
import ActionCreator from '../../actions/action-creator';
import Loader from '../loader';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';
let mainClassName = 'main-column';

class VehiclesList extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            vehicles: [],
            vehicle: {},
            columnCss: {
                'mobileWidth': mainDefaultMobileColumnWidth,
                'desktopWidth': mainDefaultDesktopColumnWidth,
                'className': mainClassName
            },
            showRightPanel: false,
            loader: true
        };

        this._onChange = this._onChange.bind(this);
        this.editMyVehicle = this.editMyVehicle.bind(this);
        this.removeMyVehicle = this.removeMyVehicle.bind(this);
    }

    componentWillMount() {
        MyVehiclesStore.addChangeListener(this._onChange);
    }

    componentDidMount() {
        ActionCreator.getMyVehicles();
    }

    componentWillUnmount() {
        MyVehiclesStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({vehicles: MyVehiclesStore.getMyVehicles(), loader: false});
    }

    editMyVehicle(e) {
        // Set panel width
        this.props.setPanel();

        let data = e.target.dataset;

		AppDispatcher.handleViewAction({
			actionType: ActionConstants.EDIT_MY_VEHICLE,
			vehicle: {
				id: data.id,
				mfg_id: data.mfgid,
				mfg: data.mfg,
				model_id: data.modelid,
				model: data.model,
				year: data.year,
				color: data.color.toLowerCase(),
				vin: data.vin,
				plate: data.plate
			}
		});
    }

    removeMyVehicle(e) {
        let id = e.target.dataset.id;

        ActionCreator.removeMyVehicle(id);
		MyVehiclesStore.removeMyVehicle(id);
    }

    render() {
        let vehiclesHtml = '';

		// If loading is complete
        if (!this.state.loader) {
            vehiclesHtml = this.state.vehicles.map((vehicle) => {
                return (
                    <tr key={ vehicle.id }>
                        <td>{ vehicle.mfg }</td>
                        <td>{ vehicle.model }</td>
                        <td>{ vehicle.year }</td>
                        <td>{ vehicle.color }</td>
                        <td>{ vehicle.vin }</td>
                        <td>{ vehicle.plate }</td>
                        <td>
                            <button onClick={this.removeMyVehicle} data-id={vehicle.id}>×</button>
                            <button onClick={this.editMyVehicle} data-id={vehicle.id} data-mfg={vehicle.mfg} data-mfgid={vehicle.mfg_id}
                                    data-model={vehicle.model} data-modelid={vehicle.model_id} data-year={vehicle.year} data-color={vehicle.color}
                                    data-vin={vehicle.vin} data-plate={vehicle.plate}>edit
                            </button>
                        </td>
                    </tr>
                );
            });
        } else {
            vehiclesHtml = <tr><td><Loader /></td></tr>;
        }

        return (
            <div className={[this.props.mobileWidth, this.props.desktopWidth, this.props.className].join(' ')} id="vehicles-main">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>Vehicle Edit</span>
                                </div>
                                <div className="col-xs-2 col-md-2"></div>
                            </div>
                        </div>
                        <div className="panel-body">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Manufacturer</th>
                                    <th>Model</th>
                                    <th>Year</th>
                                    <th>Color</th>
                                    <th>Vin</th>
                                    <th>Plate</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                { vehiclesHtml }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VehiclesList;