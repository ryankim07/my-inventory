import React from 'react';
import AppDispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
import VehiclesAction from '../../actions/vehicles-action';
import Loader from '../loader';

class VehiclesList extends React.Component
{
    constructor(props) {
        super(props);

        this.editMyVehicle   = this.editMyVehicle.bind(this);
        this.removeMyVehicle = this.removeMyVehicle.bind(this);
    }

	handleAdd() {
		AppDispatcher.handleViewAction({
			actionType: ActionConstants.SHOW_VEHICLE_PANEL
        });
    }

    editMyVehicle(e) {
        // Set panel width
        let data = e.target.dataset;

		AppDispatcher.handleViewAction({
			actionType: ActionConstants.EDIT_MY_VEHICLE,
			vehicle: {
				id: data.id,
				mfg_id: data.mfgId,
				mfg: data.mfg,
				model_id: data.modelId,
				model: data.model,
				year: data.year,
				color: data.color.toLowerCase(),
				vin: data.vin,
				plate: data.plate,
				assets: {
					name: data.imageName,
					path: data.imagePath
				}
			}
		});
    }

    removeMyVehicle(e) {
        let id = e.target.dataset.id;
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
					let imageName = vehicle.assets[0] === undefined ? vehicle.assets.name : vehicle.assets[0].name;
					let imagePath = vehicle.assets[0] === undefined ? vehicle.assets.path : vehicle.assets[0].path;

					return (
						<tr key={vehicle.id}>
							<td>{vehicle.mfg}</td>
							<td>{vehicle.model}</td>
							<td>{vehicle.year}</td>
							<td>{vehicle.color}</td>
							<td>{vehicle.vin}</td>
							<td>{vehicle.plate}</td>
							<td>
								<button onClick={this.removeMyVehicle} data-id={vehicle.id}>×</button>
								<button onClick={this.editMyVehicle} data-id={vehicle.id} data-mfg={vehicle.mfg}
										data-mfg-id={vehicle.mfg_id}
										data-model={vehicle.model} data-model-id={vehicle.model_id}
										data-year={vehicle.year} data-color={vehicle.color}
										data-vin={vehicle.vin} data-plate={vehicle.plate} data-image-name={imageName}
										data-image-path={imagePath}>edit
								</button>
							</td>
						</tr>
					);
				});
			}
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
                                    <span>Vehicle List</span>
                                </div>
                                <div className="col-xs-2 col-md-2">
									<button onClick={this.handleAdd.bind(this)}><i className="fa fa-plus">Add Vehicle</i></button>
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