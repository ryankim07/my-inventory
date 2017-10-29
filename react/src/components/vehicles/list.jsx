import React from 'react';
import SearchField from '../helper/search_field';
import TogglingRows from '../helper/table/toggling_rows';
import Loader from '../helper/loader';

class VehiclesList extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			vehicles: this.props.vehicles,
			clonedVehicles: JSON.parse(JSON.stringify(this.props.vehicles))
		};

		this.onHandleSearch = this.onHandleSearch.bind(this);
	}

	// Next state change
	componentWillReceiveProps(nextProps) {
		console.log('List next props' + nextProps.vehicles);
		console.log('List current state' + this.state.vehicles);
		if (nextProps.vehicles !== this.state.vehicles) {
			this.setState({
				vehicles: nextProps.vehicles,
				clonedVehicles: JSON.parse(JSON.stringify(nextProps.vehicles))
			});
		}
	}

	// Handle search
	onHandleSearch(results) {
		this.setState({
			vehicles: results
		});
	}

	render() {
        let vehiclesHtml = null;

		// If loading is complete
        if (!this.props.loader) {
        	let vehicles = this.state.vehicles;

        	if (!vehicles || vehicles.length === 0) {
				vehiclesHtml = <tr><td><span>Empty list.</span></td></tr>;
			} else {
        		// Show all vehicles
				vehiclesHtml = vehicles.map((vehicle, vehicleIndex) => {
					return (
						<TogglingRows
							key={ vehicleIndex }
							selectedItem={ this.props.vehicle.id === vehicle.id }
							columnValues={ [
								vehicle.mfg,
								vehicle.model,
								vehicle.year,
								vehicle.color,
								vehicle.vin,
								vehicle.plate
							] }
							addViewBtn={ true }
							handleViewPanel={ this.props.onHandleModal.bind(this, vehicle.id) }
							addEditBtn={ true }
							handleEditPanel={ this.props.onHandleRightPanel.bind(this, vehicle.id) }
							addRemoveBtn={ true }
							onRemove={ this.props.onRemove.bind(this, vehicle.id) }
						/>
					);
				});
			}
        } else {
            vehiclesHtml = <tr><td><Loader/></td></tr>;
        }

        return (
			<div>
				<div className="form-group">
					<div className="col-xs-12 col-lg-12">
						<SearchField
							inputProps={
								{
									objs: this.state.vehicles,
									searchType: "mfg",
									onChange: this.onHandleSearch.bind(this)
								}
							}
						/>
					</div>
				</div>
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
        )
    }
}

export default VehiclesList;