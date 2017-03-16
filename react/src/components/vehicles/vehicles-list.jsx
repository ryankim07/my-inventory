import React from 'react';
import VehiclesStore from '../../stores/vehicles-store';
import AppDispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
import ActionCreator from '../../actions/action-creator';
import Sidebar from '../vehicles/sidebar';

class VehiclesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            vehicles: [],
            vehicle: {},
            isSideBarVisible: false
        };
    }

    componentWillMount() {
        VehiclesStore.addChangeListener(this._onChange.bind(this));
    }

    componentDidMount() {
        ActionCreator.getVehicles();
    }

    componentWillUnmount() {
        VehiclesStore.removeChangeListener(this._onChange.bind(this));
    }

    removeVehicle(e) {
        var id = e.target.dataset.id;

        ActionCreator.removeVehicles(id);

        AppDispatcher.handleViewAction({
            actionType: ActionConstants.REMOVE_VEHICLE,
            id: id
        });
    }

    _onChange() {
        this.setState({vehicles: VehiclesStore.getVehicles()});
    }

    onClick(selectedVehicle) {
        this.setState({
            isSideBarVisible: !this.state.isSideBarVisible,
            vehicle: selectedVehicle
        });
    }

    render() {
        var vehiclesHtml = this.state.vehicles.map((vehicle) => {
            return (
                <tr key={ vehicle.id }>
                    <td>{ vehicle.mfg }</td>
                    <td>{ vehicle.model }</td>
                    <td>{ vehicle.year }</td>
                    <td>{ vehicle.color }</td>
                    <td>{ vehicle.vin }</td>
                    <td>{ vehicle.plate }</td>
                    <td>
                        <button onClick={this.removeVehicle } data-id={vehicle.id}>×</button>
                        <button onClick={this.onClick.bind(this)} data-id={vehicle.id}>edit</button>
                    </td>
                </tr>
            );
        });

        return (
            <div className="col-xs-12 col-md-12 main" id="vehicles-main">
                <div className="page-header">
                    <h2>My Vehicles</h2>
                </div>
                <div className="col-xs-12 col-md-7">
                    <div className="row">
                        <div className="panel panel-info">
                            <div className="panel-heading"><span>Vehicles</span></div>
                            <div className="panel-body">
                                <div className="table-responsive vehicles-table">
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
                </div>
                { this.state.isSideBarVisible ? <Sidebar data={ this.state.vehicle }/> : null }
            </div>
        )
    }
}

export default VehiclesList;