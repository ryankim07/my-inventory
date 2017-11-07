import React from 'react';
import _ from 'lodash';
import SearchField from '../../../helper/search_field';
import TogglingRows from '../../../helper/table/toggling_rows';
import Loader from '../../../helper/loader';
import Pagination from '../../../helper/pagination';

class SettingsManufacturersList extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			keyWords: '',
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
        let mfgsHtml 	   = [];
		let paginationHtml = null;

		// If loading is complete
        if (!this.props.loader) {
        	if (!this.props.manufacturers || this.props.manufacturers.length === 0) {
				mfgsHtml.push(<tr><td><span>Empty list.</span></td></tr>);

			} else {
				if (this.state.searchResults && this.state.keyWords !== '') {
					mfgsHtml.push(<tr key="z"><td><span>Found { this.state.manufacturers.length } matches</span></td></tr>);
				}

				let list = !_.isEmpty(this.state.searchResults) ? this.state.searchResults : this.props.manufacturers;
				let allMfgs = list.map((vehicle, vehicleIndex) => {
					return (
						<TogglingRows
							key={ vehicleIndex }
							selectedItem={ this.props.selectedItem === vehicle.id }
							columnValues={ [vehicle.mfg] }
							addViewBtn={ true }
							onView={ this.props.onHandleMainPanel.bind(this, vehicle.id) }
							addEditBtn={ false }
							addRemoveBtn={ false }
						/>
					);
				});

				mfgsHtml.push(allMfgs);

				// Pagination
				paginationHtml = this.props.manufacturers || this.props.manufacturers.length > 0 ?
					<Pagination
						page={ this.props.page }
						totalCount={ this.props.totalCount }
						totalPages={ this.props.totalPages }
						limit={ this.props.limit }
						onChange={ this.props.onChange }
					/> : null;
			}
        } else {
			mfgsHtml.push(<tr key="l" ><td><Loader/></td></tr>);
        }

        let searchField =
			<SearchField
				inputProps={
					{
						objs: this.props.manufacturers,
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
						<th>Actions</th>
					</tr>
					</thead>
					<tbody>
					{ mfgsHtml }
					</tbody>
				</table>
				{ paginationHtml }
			</div>
        )
    }
}

export default SettingsManufacturersList;