import React from 'react';
import ApiVehiclesAction from '../../../../actions/api-vehicles-action';
import ApiVehiclesStore from '../../../../stores/vehicles/api-store';
import Loader from '../../../helper/loader';

class ConfigurationVehiclesApiList extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			apiVehicles: [],
			loader: true
		};

		this._onChange = this._onChange.bind(this);
	}

	componentWillMount() {
		ApiVehiclesStore.addChangeListener(this._onChange);
		ApiVehiclesStore.unsetStoreFlashMessage();
	}

	componentDidMount() {
		ApiVehiclesAction.getApiVehicles();
	}

	componentWillUnmount() {
		ApiVehiclesStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		let apiVehicles = ApiVehiclesStore.getApiVehicles();

		this.setState({
			apiVehicles: apiVehicles,
			loader: false,
		});
	}

	// Handle input changes
	onHandleFormChange(propertyName, event) {
		let vehicles   = this.state.apiVehicles;
		let searchText = event.target.value;
		let results    = vehicles.filter(function(vehicle) {
			return vehicle.mfg.match(new RegExp( searchText , 'gi' ));
		});

		this.setState({apiVehicles: searchText === "" || searchText === undefined ? vehicles : results});
	}

	handleMouseOver(e) {
		this.setState({ isHidden: !this.state.isHidden });
	}

	render() {
        let apiVehiclesHtml = '';

		// If loading is complete
        if (!this.state.loader) {
        	let vehicles = this.state.apiVehicles;

        	if (!vehicles || vehicles.length === 0) {
				apiVehiclesHtml = <tr><td><span>There are no saved API vehicles.</span></td></tr>;
			} else {
				apiVehiclesHtml = vehicles.map((vehicle, vehicleIndex) => {
					return (
						<tr key={ vehicleIndex } onMouseOver={ this.handleMouseOver.bind(this) }>
							<td>{ vehicle.mfg }</td>
							<td ref={ 'action-' + vehicleIndex } className="deactive">
								{ !this.state.isHidden && <h1>actions</h1> }
							</td>
						</tr>
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
							<div className="col-xs-2 col-md-2" />
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