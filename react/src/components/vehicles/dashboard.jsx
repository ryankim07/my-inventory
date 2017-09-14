import React from 'react';
import VehiclesAction from '../../actions/vehicles-action';
import ApiVehiclesStore from '../../stores/vehicles/api-store';
import MyVehiclesStore from '../../stores/vehicles/store';
import VehicleAdd from './add';
import VehiclesList from './list';
import FlashMessage from '../flash-message';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';

class VehiclesDashboard extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			vehicle: {},
			vehicles: [],
			manufacturers: [],
			isEditingMode: false,
			newVehicleAdded: false,
			loader: true,
			showRightPanel: false,
			flashMessage: null,
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			}
		};

		this._onChange 		  	= this._onChange.bind(this);
		this.onHandleFormSubmit = this.onHandleFormSubmit.bind(this);
		this.onHandleRightPanel = this.onHandleRightPanel.bind(this);
		this.setFlashMessage  	= this.setFlashMessage.bind(this);
		this.closeRightPanel  	= this.closeRightPanel.bind(this);
	}

	componentWillMount() {
		MyVehiclesStore.addChangeListener(this._onChange);
		MyVehiclesStore.unsetStoreFlashMessage();
	}

	componentDidMount() {
		VehiclesAction.getApiVehicles();
		VehiclesAction.getMyVehicles();
	}

	componentWillUnmount() {
		MyVehiclesStore.removeChangeListener(this._onChange);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.location.action !== 'POP') {
			this.setState({
				columnCss: {
					'mobileWidth': mainDefaultMobileColumnWidth,
					'desktopWidth': mainDefaultDesktopColumnWidth
				},
				showRightPanel: false,
				flashMessage: null
			});
		}
	}

	/*shouldComponentUpdate(nextProps, nextState) {
		// Check here and don't render component again if it's an image upload action
		let emptyObj = _.every(_.values(nextState.vehicle), function(v) {return !v;});

		if (nextState.vehicle.assets !== '' && emptyObj) {
			return false;
		}

		// Only redirect to list if new vehicle is being added
		if (nextState.newVehicleAdded || this.state.newVehicleAdded) {
			MyVehiclesStore.unFlagNewVehicle();
			nextState.newVehicleAdded = false;
			this.context.router.push('/vehicles/dashboard');

			return false;
		}

		return true;
	}*/

	_onChange() {
		let vehicles 		= MyVehiclesStore.getMyVehicles();
		let manufacturers 	= ApiVehiclesStore.getApiVehicles();
		let newVehicleAdded = MyVehiclesStore.isNewVehicleAdded();
		let flashMsg 		= MyVehiclesStore.getStoreFlashMessage();
		let isAuthenticated = MyVehiclesStore.isAuthenticated();
		let showRightPanel  = MyVehiclesStore.showRightPanel();

		if (!isAuthenticated){
			this.context.router.push("/auth/login");
			return false;
		}

		this.setState({
			vehicles: vehicles,
			manufacturers: manufacturers,
			newVehicleAdded: newVehicleAdded,
			showRightPanel: !!showRightPanel,
			flashMessage: flashMsg !== undefined ? flashMsg : null,
			loader: false,
			columnCss: {
				'mobileWidth': openRightPanel ? mainShrinkedMobileColumnWidth : mainDefaultMobileColumnWidth,
				'desktopWidth': openRightPanel ? mainShrinkedDesktopColumnWidth : mainDefaultDesktopColumnWidth
			}
		});
	}

	onHandleFormSubmit(vehicle) {
		if (!this.state.isEditingMode) {
			VehiclesAction.addMyVehicle(vehicle);
		} else {
			VehiclesAction.updateMyVehicle(vehicle);
		}

		// Close the panel
		this.closeRightPanel();
	}

	onHandleRightPanel(vehicle, isEditingMode) {
		this.setState({
			vehicle: vehicle,
			isEditingMode: isEditingMode,
			showRightPanel: true,
			columnCss: {
				'mobileWidth': mainShrinkedMobileColumnWidth,
				'desktopWidth': mainShrinkedDesktopColumnWidth
			}
		});
	}

	setFlashMessage(msg) {
		this.setState({flashMessage: msg})
	}

	closeRightPanel() {
		this.setState({
			showRightPanel: false,
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			}
		});
	}

	render() {
		return (
			<div className="row">
				{ !this.state.flashMessage ? null : <FlashMessage message={ this.state.flashMessage } alertType="alert-success" />}
				<VehiclesList
					state={ this.state }
					handleFormChange={ this.handleFormChange }
					onHandleRightPanel={ this.onHandleRightPanel }
					className="main-column"
				/>
				{
					this.state.showRightPanel ?
						<VehicleAdd
							state={ this.state }
							onHandleFormSubmit={ this.onHandleFormSubmit }
							closeRightPanel={ this.closeRightPanel }
						/> : null
				}
			</div>
		)
	}
}

VehiclesDashboard.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default VehiclesDashboard;