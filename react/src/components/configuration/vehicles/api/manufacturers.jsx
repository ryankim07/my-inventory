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
			searchText: ''
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.manufacturers !== this.props.manufacturers) {
			this.setState({
				manufacturers: nextProps.manufacturers,
				searchText: ''
			});
		}
	}

	/*shouldComponentUpdate(nextProps, nextState) {
		return this.state.manufacturers !== nextState.manufacturers;
	}*/

	// Handle input changes
	onHandleFormChange(results, searchText) {
		this.setState({
			models: results,
			searchText: searchText
		});
	}

	render() {
		console.log('mfgs');
        let mfgsHtml = '';

		// If loading is complete
        if (!this.props.loader) {
        	let manufacturers = this.state.manufacturers;

        	if (!manufacturers || manufacturers.length === 0) {
				mfgsHtml = <tr><td><span>There are no saved manufacturers.</span></td></tr>;
			} else {
				mfgsHtml = manufacturers.map((vehicle, vehicleIndex) => {
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
			}
        } else {
            mfgsHtml = <tr><td><Loader /></td></tr>;
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
									onHandleFormChange={ this.onHandleFormChange.bind(this) }
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