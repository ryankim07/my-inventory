import React from 'react';
import Loader from '../../helper/loader';

class VehiclesList extends React.Component
{
	render() {
		let columnCss = this.props.state.columnCss;
        let vehiclesHtml = '';

		// If loading is complete
        if (!this.props.state.loader) {
        	let vehicles  = this.props.state.vehicles;

        	if (!vehicles || vehicles.length === 0) {
				vehiclesHtml = <tr><td><span>There are no saved vehicles.</span></td></tr>;
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
								<button onClick={ this.props.onHandleRightPanel.bind(this, vehicle.id) }><i className="fa fa-pencil" aria-hidden="true" /></button>
								<button onClick={ this.props.onHandleRemove.bind(this, vehicle.id) }><i className="fa fa-trash" aria-hidden="true" /></button>
							</td>
						</tr>
					);
				});
			}
        } else {
            vehiclesHtml = <tr><td><Loader /></td></tr>;
        }

        return (
            <div className={ [columnCss.mobileWidth, columnCss.desktopWidth, this.props.className].join(' ') } id="vehicles-main">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>Vehicle List</span>
                                </div>
                                <div className="col-xs-2 col-md-2">
									<button onClick={ this.props.onHandleRightPanel.bind(this, false) }><i className="fa fa-plus" aria-hidden="true" /></button>
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