import React from 'react';
import Loader from '../../../helper/loader';

class VehiclesApiList extends React.Component
{
	render() {
        let apiVehiclesHtml = '';

		// If loading is complete
        if (!this.props.loader) {
        	let apiVehicles  = this.props.apiVehicles;

        	if (!apiVehicles || apiVehicles.length === 0) {
				apiVehiclesHtml = <tr><td><span>There are no saved API vehicles.</span></td></tr>;
			} else {
				apiVehiclesHtml = apiVehicles.map((vehicle, vehicleIndex) => {
					return (
						<tr key={ vehicleIndex }>
							<td>{ vehicle.mfg }</td>
							<td>
							</td>
						</tr>
					);
				});
			}
        } else {
            apiVehiclesHtml = <tr><td><Loader /></td></tr>;
        }

        return (
			<div className="row" id="vehicles-list">
				<div className="panel panel-info">
					<div className="panel-heading">
						<div className="row">
							<div className="col-xs-10 col-md-10">
								<span>API Vehicle List</span>
							</div>
							<div className="col-xs-2 col-md-2" />
						</div>
					</div>
					<div className="panel-body">
						<table className="table">
							<thead>
							<tr>
								<th>Manufacturer</th>
								<th>Actions</th>
							</tr>
							</thead>
							<tbody>
							{ apiVehiclesHtml }
							</tbody>
						</table>
					</div>
				</div>
			</div>
        )
    }
}

export default VehiclesApiList;