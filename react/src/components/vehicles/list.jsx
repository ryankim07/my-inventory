import React from 'react';
import _ from 'lodash';
import SearchField from '../helper/search_field';
import MaterialUiTable from '../helper/table/material_ui_table';
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
				vehiclesHtml = <div><span>Empty list.</span></div>;
			} else {
				let list = !_.isEmpty(this.state.searchResults) ? this.state.searchResults : this.props.vehicles;

				vehiclesHtml =
					<MaterialUiTable
						inputProps={
							{
								list: list,
								exclude: 'id|assets',
								onView: this.props.onModal,
								onEdit: this.props.onHandleRightPanel,
								onRemove: this.props.onRemove
							}
						}
					/>;
			}
        } else {
            vehiclesHtml = <div><Loader/></div>;
        }

		let searchField =
			<SearchField
				inputProps={
					{
						list: this.props.vehicles,
						searchType: "mfg",
						onSearch: this.onHandleSearch
					}
				}
			/>;

        return (
			<div>
				{ searchField }
				{ vehiclesHtml }
			</div>
        )
    }
}

export default VehiclesList;