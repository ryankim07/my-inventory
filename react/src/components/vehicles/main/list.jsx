import React from 'react';
import SearchField from '../../helper/search_field';
import TogglingRows from '../../helper/table/toggling_rows';
import Loader from '../../helper/loader';

class VehiclesList extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			vehicles: this.props.vehicles,
			clonedVehicles: JSON.parse(JSON.stringify(this.props.vehicles)),
			searchText: '',
			isSearch: false,
		};

		this.onHandleFormChange = this.onHandleFormChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.vehicles !== this.state.vehicles) {
			this.setState({
				vehicles: nextProps.vehicles,
				clonedVehicles: JSON.parse(JSON.stringify(nextProps.vehicles)),
				searchText: '',
				isSearch: false
			});
		}
	}

	// Handle input changes
	onHandleFormChange(event) {
		let searchText = event.target.value;
		let vehicles   = this.state.clonedVehicles;
		let results = vehicles.filter(function (list) {
			return list.mfg.match(new RegExp(searchText, 'gi'));
		});

		this.setState({
			vehicles: searchText.replace(/\s/g, '').length ? results : vehicles,
			searchText: searchText,
			isSearch: true
		});
	}

	render() {
        let vehiclesHtml = '';

		// If loading is complete
        if (!this.props.loader) {
        	let vehicles = this.state.vehicles;

        	if (!vehicles || vehicles.length === 0) {
				vehiclesHtml = <tr><td><span>Empty list.</span></td></tr>;
			} else {
				vehiclesHtml = vehicles.map((vehicle, vehicleIndex) => {
					return (
						<TogglingRows
							selectedItem={ this.props.vehicle.id === vehicle.id }
							columnValues={ [
								vehicle.mfg,
								vehicle.model,
								vehicle.year,
								vehicle.color,
								vehicle.vin,
								vehicle.plate
							] }
							addEditBtn={ true }
							handleEditPanel={ this.props.onHandleRightPanel.bind(this, vehicle.id) }
							addRemoveBtn={ true }
							handleRemove={ this.props.onHandleRemove.bind(this, vehicle.id) }
						/>
					);
				});
			}
        } else {
            vehiclesHtml = <tr><td><Loader /></td></tr>;
        }

        return (
			<div className="row" id="vehicles-list">
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
						<div className="form-group">
							<div className="col-xs-12 col-lg-12">
								<SearchField
									objs={ this.state.vehicles }
									objKey="name"
									searchType="vehicles"
									searchText={ this.state.searchText }
									onHandleFormChange={ this.onHandleFormChange }
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
				</div>
			</div>
        )
    }
}

export default VehiclesList;