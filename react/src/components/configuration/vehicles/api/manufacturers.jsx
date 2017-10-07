import React from 'react';
import SearchField from '../../../helper/search_field';
import TogglingRows from '../../../helper/table/toggling_rows';
import Loader from '../../../helper/loader';

class ConfigurationManufacturers extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			manufacturers: this.props.manufacturers,
			clonedMfgs: JSON.parse(JSON.stringify(this.props.manufacturers)),
			searchText: '',
			isSearch: false
		}

		this.onHandleFormChange = this.onHandleFormChange.bind(this);
	}

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
		let mfgs    = this.state.clonedMfgs;
		let results = mfgs.filter(function (list) {
			return list.mfg.match(new RegExp(searchText, 'gi'));
		});

		this.setState({
			manufacturers: searchText.replace(/\s/g, '').length ? results : mfgs,
			searchText: searchText,
			isSearch: true
		});
	}

	render() {
        let mfgsHtml = [];

		// If loading is complete
        if (!this.props.loader) {
        	let manufacturers = this.state.manufacturers;

        	if (!manufacturers || manufacturers.length === 0) {
				let msg = !this.state.isSearch ? 'Empty list.' : 'Found no matches.';

				mfgsHtml.push(
					<tr>
						<td><span>Empty list.</span></td>
					</tr>
				);

			} else {
				if (this.state.isSearch && this.state.searchText !== '') {
					mfgsHtml.push(
						<tr key="b">
							<td><span>Found { this.state.manufacturers.length } matches</span></td>
						</tr>
					);
				}

				let allMfgs = manufacturers.map((vehicle, vehicleIndex) => {
					return (
						<TogglingRows
							key={ vehicleIndex }
							selectedItem={ this.props.selectedMfg.id === vehicle.id }
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
        } else {
			mfgsHtml.push(<tr key="l" ><td><Loader /></td></tr>);
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
								<button onClick={ this.props.onHandleSync.bind(this) }><i className="fa fa-cloud-download" aria-hidden="true" /> Sync</button>
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
								<th />
							</tr>
							</thead>
							<tbody>
								{ mfgsHtml }
							</tbody>
						</table>
					</div>
				</div>
			</div>
        )
    }
}

export default ConfigurationManufacturers;