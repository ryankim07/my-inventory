import React from 'react';
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
			manufacturers: this.props.manufacturers,
			clonedMfgs: JSON.parse(JSON.stringify(this.props.manufacturers))
		};
	}

	// Next state change
	componentWillReceiveProps(nextProps) {
		if (nextProps.manufacturers !== this.state.manufacturers) {
			this.setState({
				manufacturers: nextProps.manufacturers,
				clonedMfgs: JSON.parse(JSON.stringify(nextProps.manufacturers))
			});
		}
	}

	// Handle search
	onHandleSearch(results) {
		this.setState({
			manufacturers: results
		});
	}

	// Render
	render() {
        let mfgsHtml 	   = [];
		let paginationHtml = null;

		// If loading is complete
        if (!this.props.loader) {
        	let manufacturers = this.state.manufacturers;

        	if (!manufacturers || manufacturers.length === 0) {
				mfgsHtml.push(
					<tr key="x">
						<td><span>{ !this.state.isSearch ? 'Empty list.' : 'Found no matches.' }</span></td>
					</tr>
				);

			} else {
				if (this.state.isSearch && this.state.searchText !== '') {
					mfgsHtml.push(
						<tr key="z">
							<td><span>Found { this.state.manufacturers.length } matches</span></td>
						</tr>
					);
				}

				let allMfgs = manufacturers.map((vehicle, vehicleIndex) => {
					return (
						<TogglingRows
							key={ vehicleIndex }
							selectedItem={ this.props.mfg.id === vehicle.id }
							columnValues={ [vehicle.mfg] }
							addViewBtn={ true }
							addEditBtn={ false }
							addRemoveBtn={ false }
							handleViewPanel={ this.props.onHandleMainPanel.bind(this, vehicle.id) }
						/>
					);
				});

				mfgsHtml.push(allMfgs);

				// Pagination
				paginationHtml =
					<Pagination
						page={ this.props.page }
						totalCount={ this.props.totalCount }
						totalPages={ this.props.totalPages }
						limit={ this.props.limit }
						onChangePage={ this.props.onChangePage }
					/>;
			}
        } else {
			mfgsHtml.push(<tr key="l" ><td><Loader/></td></tr>);
        }

        return (
			<div>
				<div className="form-group">
					<div className="col-xs-12 col-lg-12">
						<SearchField
							inputProps={
								{
									objs: this.state.manufacturers,
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
						<th/>
					</tr>
					</thead>
					<tbody>
					{ mfgsHtml }
					</tbody>
				</table>
				{ this.state.isSearch ? null : paginationHtml }
			</div>
        )
    }
}

export default SettingsManufacturersList;