import React from 'react';
import _ from 'lodash';
import SearchField from '../helper/search_field';
import TogglingRows from '../helper/table/toggling_rows';
import Loader from '../helper/loader';

class VehiclesList extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			searchResults: []
		};

		this.onHandleSearch = this.onHandleSearch.bind(this);
	}

	// Handle search
	onHandleSearch(results) {
		this.setState({ searchResults: results });
	}

	// Render
	render() {
        let vehiclesHtml = null;

		// If loading is complete
        if (!this.props.loader) {
        	if (!this.props.vehicles || this.props.vehicles.length === 0) {
				vehiclesHtml = <tr><td><span>Empty list.</span></td></tr>;
			} else {
				let list = !_.isEmpty(this.state.searchResults) ? this.state.searchResults : this.props.vehicles;

				vehiclesHtml = list.map((vehicle, vehicleIndex) => {
					return (
						<TogglingRows
							key={ vehicleIndex }
							selectedItem={ this.props.selectedItem === vehicle.id }
							columnValues={ [
								vehicle.mfg,
								vehicle.model,
								vehicle.year,
								vehicle.color,
								vehicle.vin,
								vehicle.plate
							] }
							addViewBtn={ true }
							onView={ this.props.onModal.bind(this, vehicle.id) }
							addEditBtn={ true }
							onEdit={ this.props.onHandleRightPanel.bind(this, vehicle.id) }
							addRemoveBtn={ true }
							onRemove={ this.props.onRemove.bind(this, vehicle.id) }
						/>
					);
				});
			}
        } else {
            vehiclesHtml = <tr><td><Loader/></td></tr>;
        }

		let searchField =
			<SearchField
				inputProps={
					{
						objs: this.props.vehicles,
						searchType: "mfg",
						onSearch: this.onHandleSearch
					}
				}
			/>;

        return (
			<div>
				<div className="form-group">
					<div className="col-xs-12 col-lg-12">
						{ searchField }
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