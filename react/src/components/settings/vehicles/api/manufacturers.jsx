import React from 'react';
import SearchField from '../../../helper/search_field';
import TogglingRows from '../../../helper/table/toggling_rows';
import Loader from '../../../helper/loader';
import Pagination from "../../../helper/pagination";

class SettingsManufacturersList extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			manufacturers: this.props.manufacturers,
			clonedMfgs: JSON.parse(JSON.stringify(this.props.manufacturers)),
			searchText: '',
			isSearch: false
		};

		this.onHandleFormChange = this.onHandleFormChange.bind(this);
	}

	// Next state change
	componentWillReceiveProps(nextProps) {
		if (nextProps.manufacturers !== this.state.manufacturers) {
			this.setState({
				manufacturers: nextProps.manufacturers,
				clonedMfgs: JSON.parse(JSON.stringify(nextProps.manufacturers)),
				searchText: '',
				isSearch: false
			});
		}
	}

	// Handle input changes
	onHandleFormChange(event) {
		let searchText = event.target.value;
		let mfgs       = this.state.clonedMfgs;
		let results    = mfgs.filter(function (list) {
			return list.mfg.match(new RegExp(searchText, 'gi'));
		});

		this.setState({
			manufacturers: searchText.replace(/\s/g, '').length ? results : mfgs,
			searchText: searchText,
			isSearch: searchText === "" ? false : true
		});
	}

	// Render
	render() {
        let mfgsHtml = [];
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
			}

			paginationHtml =
				<Pagination
					page={ this.props.page }
					totalCount={ this.props.totalCount }
					totalPages={ this.props.totalPages }
					limit={ this.props.limit }
					onChangePage={ this.props.onChangePage }
				/>;
        } else {
			mfgsHtml.push(<tr key="l" ><td><Loader/></td></tr>);
        }

        return (
			<div className="row" id="api-manufacturers-list">
				<div className="panel panel-info">
					<div className="panel-heading">
						<div className="row">
							<div className="col-xs-10 col-md-10">
								<span>API Vehicle List</span>
							</div>
							<div className="col-xs-2 col-md-2">
								<button onClick={ this.props.onHandleSync.bind(this) }><i className="fa fa-cloud-download" aria-hidden="true"/> Sync</button>
							</div>
						</div>
					</div>
					<div className="panel-body">
						<div className="form-group">
							<div className="col-xs-12 col-lg-12">
								<SearchField
									objs={ this.state.manufacturers }
									objKey="mfg"
									searchType="manufacturers"
									searchText={ this.state.searchText }
									onHandleFormChange={ this.onHandleFormChange }
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
				</div>
			</div>
        )
    }
}

export default SettingsManufacturersList;