import React from 'react';
import ConfigurationVehiclesApiListItem from './item';
import Loader from '../../../helper/loader';

class ConfigurationVehiclesApiList extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			apiVehicles: this.props.apiVehicles,
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.apiVehicles !== this.props.apiVehicles) {
			this.setState({
				apiVehicles: nextProps.apiVehicles
			});
		}
	}

	// Handle input changes
	onHandleFormChange(propertyName, event) {
		let vehicles   = this.state.apiVehicles;
		let searchText = event.target.value;
		let results    = vehicles.filter(function(vehicle) {
			return vehicle.mfg.match(new RegExp( searchText , 'gi' ));
		});

		this.setState({
			apiVehicles: searchText === "" || searchText === undefined ? vehicles : results
		});
	}

	render() {
        let apiVehiclesHtml = '';

		// If loading is complete
        if (!this.props.loader) {
        	let vehicles 		= this.state.apiVehicles;
			let selectedVehicle = this.props.selectedVehicle ;

        	if (!vehicles || vehicles.length === 0) {
				apiVehiclesHtml = <tr><td><span>There are no saved API vehicles.</span></td></tr>;
			} else {
				apiVehiclesHtml = vehicles.map((vehicle, vehicleIndex) => {
					return (
						<ConfigurationVehiclesApiListItem
							key={ vehicleIndex }
							selectedVehicle={ selectedVehicle === vehicle.id }
							mfg={ vehicle.mfg }
							onHandleClick={ this.props.onHandleRightPanel.bind(this, vehicle.id) }
						/>
					);
				});
			}
        } else {
            apiVehiclesHtml = <tr><td><Loader /></td></tr>;
        }

        return (
			<div className="row" id="api-vehicles-list">
				<div className="panel panel-info">
					<div className="panel-heading">
						<div className="row">
							<div className="col-xs-10 col-md-10">
								<span>API Vehicle List</span>
							</div>
							<div className="col-xs-2 col-md-2">
								<button onClick={ this.props.onHandleSync.bind(this) }><i className="fa fa-cloud-download" aria-hidden="true" /> Sync</button>
							</div>
						</div>
					</div>
					<div className="panel-body">
						<div className="form-group">
							<div className="col-xs-12 col-lg-12">
								<div className="input-group col-lg-12">
									<input
										type="text"
										onChange={ this.onHandleFormChange.bind(this, 'search') }
										className="form-control"/>
								</div>
							</div>
						</div>
						<table className="table">
							<thead>
							<tr>
								<th>Manufacturer</th>
								<th />
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

export default ConfigurationVehiclesApiList;