import React from 'react';
import AppDispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
import VehiclesAction from '../../actions/vehicles-action';
import Loader from '../loader';

class VehiclesList extends React.Component
{
    constructor(props) {
        super(props);
    }

	handleAdd() {
		AppDispatcher.handleViewAction({
			actionType: ActionConstants.SHOW_VEHICLE_ADD_PANEL
        });
    }

    editMyVehicle(data) {
        // Set panel width
		/*let imageName = data.assets[0] === undefined ? data.assets.name : data.assets[0].name;
		let imagePath = data.assets[0] === undefined ? data.assets.path : data.assets[0].path;

		data['assets']: {
			name: data.imageName,
				path: data.imagePath
		}*/

		AppDispatcher.handleViewAction({
			actionType: ActionConstants.EDIT_MY_VEHICLE,
			vehicle: data
		});
    }

    removeMyVehicle(id) {
        VehiclesAction.removeMyVehicle(id);
    }

    render() {
        let vehiclesHtml = '';

		// If loading is complete
        if (!this.props.state.loader) {
        	let vehicles = this.props.state.vehicles;

        	if (!vehicles) {
				vehiclesHtml = <tr><td>There are no saved vehicle.</td></tr>;
			} else {
				vehiclesHtml = vehicles.map((vehicle) => {
					return (
						<tr key={ vehicle.id }>
							<td>{ vehicle.mfg }</td>
							<td>{ vehicle.model }</td>
							<td>{ vehicle.year }</td>
							<td>{ vehicle.color }</td>
							<td>{ vehicle.vin }</td>
							<td>{ vehicle.plate }</td>
							<td>
								<button onClick={ this.removeMyVehicle.bind(this.vehicle.id) }><i className="fa fa-trash" aria-hidden="true" /></button>
								<button onClick={ this.editMyVehicle.bind(this, vehicle) }><i className="fa fa-pencil" aria-hidden="true" /></button>
							</td>
						</tr>
					);
				});
			}
        } else {
            vehiclesHtml = <tr><td><Loader /></td></tr>;
        }

        return (
            <div className={ [this.props.mobileWidth, this.props.desktopWidth, this.props.className].join(' ') } id="vehicles-main">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>Vehicle List</span>
                                </div>
                                <div className="col-xs-2 col-md-2">
									<button onClick={ this.handleAdd.bind(this) }><i className="fa fa-plus" aria-hidden="true" /></button>
								</div>
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