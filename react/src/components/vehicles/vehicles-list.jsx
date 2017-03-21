import React from 'react';
import MyVehiclesStore from '../../stores/my-vehicles-store';
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

        this._onChange = this._onChange.bind(this);
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
        this.setState({vehicles: MyVehiclesStore.getMyVehicles()});
    }

    onClick(selectedVehicle) {
        this.setState({
            isSideBarVisible: !this.state.isSideBarVisible,
            vehicle: selectedVehicle
        });
    }

    removeMyVehicle(e) {
        let id = e.target.dataset.id;

        ActionCreator.removeMyVehicle(id);

        AppDispatcher.handleViewAction({
            actionType: ActionConstants.REMOVE_MY_VEHICLE,
            id: id
        });
    }

    render() {
        let vehiclesHtml = this.state.vehicles.map((vehicle) => {
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