import React from 'react';
import { PropTypes } from 'prop-types';
//import ConfigurationAction from '../../actions/Configuration-action';
//import ConfigurationStore from '../../stores/Configuration/store';
import Loader from '../../../helper/loader';

class VehiclesApiList extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			apiVehicles: [],
			isEditingMode: false,
			loader: true,
		};
	}

	componentWillMount() {
		/*ConfigurationStore.addChangeListener(this._onChange);
		ConfigurationStore.unsetStoreFlashMessage();*/
	}

	componentDidMount() {
		//ConfigurationAction.getVehiclesAndApiVehicles();
	}

	componentWillUnmount() {
		//ConfigurationStore.removeChangeListener(this._onChange);
	}

	/*
	_onChange() {
		let vehicles 		= VehiclesStore.getVehicles();
		let apiVehicles		= VehiclesStore.getApiVehicles();
		let flashMessage 	= VehiclesStore.getStoreFlashMessage();
		let isAuthenticated = VehiclesStore.isAuthenticated();
		let openRightPanel  = VehiclesStore.showRightPanel();

		if (!isAuthenticated){
			this.context.router.push("/auth/login");
			return false;
		}

		this.setState({
			vehicles: vehicles,
			apiVehicles: apiVehicles,
			showRightPanel: !!openRightPanel,
			flashMessage: flashMessage !== undefined ? flashMessage : null,
			loader: false,
			mainPanelColumnCss: {
				'mobileWidth': openRightPanel ? mainShrinkedMobileColumnWidth : mainDefaultMobileColumnWidth,
				'desktopWidth': openRightPanel ? mainShrinkedDesktopColumnWidth : mainDefaultDesktopColumnWidth
			}
		});
	}

	// Handle submit
	onHandleFormSubmit(vehicle) {
		if (!this.state.isEditingMode) {
			VehiclesAction.addVehicle(vehicle);
		} else {
			VehiclesAction.updateVehicle(vehicle);
		}
	}

	// Handle right panel
	onHandleRightPanel(id) {
		let isEditingMode = !!id;
		let vehicle = isEditingMode ?
			this.state.vehicles.find(obj => obj.id === id) :
			{
				id: '',
				mfg_id: '',
				mfg: '',
				model_id: '',
				model: '',
				year: '',
				color: '',
				vin: '',
				plate: '',
				assets: []
			}

		this.setState({
			vehicle: vehicle,
			isEditingMode: isEditingMode,
			showRightPanel: true,
			mainPanelColumnCss: {
				'mobileWidth': mainShrinkedMobileColumnWidth,
				'desktopWidth': mainShrinkedDesktopColumnWidth
			}
		});
	}

	// Handle delete
	onHandleRemove(id) {
		VehiclesAction.removeVehicle(id);
	}
	*/

	render() {
        let apiVehiclesHtml = '';

		// If loading is complete
        if (!this.state.loader) {
        	let apiVehicles  = this.state.apiVehicles;

        	if (!apiVehicles || apiVehicles.length === 0) {
				apiVehiclesHtml = <tr><td><span>There are no saved API vehicles.</span></td></tr>;
			} else {
				apiVehiclesHtml = apiVehicles.map((vehicle, vehicleIndex) => {
					return (
						<tr key={ vehicleIndex }>
							<td>{ vehicle.mfg }</td>
							<td>
							</td>
						</tr>
					);
				});
			}
        } else {
            apiVehiclesHtml = <tr><td><Loader /></td></tr>;
        }

        return (
			<div className="row" id="vehicles-list">
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
						<table className="table">
							<thead>
							<tr>
								<th>Manufacturer</th>
								<th>Actions</th>
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

VehiclesApiList.contextTypes = {
	router: PropTypes.object.isRequired
}

export default VehiclesApiList;