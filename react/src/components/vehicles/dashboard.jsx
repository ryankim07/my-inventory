import React from 'react';
import VehiclesAction from '../../actions/vehicles-action';
import VehiclesStore from '../../stores/vehicles/store';
import VehicleAdd from './add';
import VehiclesList from './list';
import FlashMessage from '../helper/flash-message';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';
let mainColumnClassName = 'main-column';

class VehiclesDashboard extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			vehicle: {},
			vehicles: [],
			isEditingMode: false,
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
		this.onHandleRemove 	= this.onHandleRemove.bind(this);
		this.setFlashMessage  	= this.setFlashMessage.bind(this);
		this.closeRightPanel  	= this.closeRightPanel.bind(this);
	}

	componentWillMount() {
		VehiclesStore.addChangeListener(this._onChange);
		VehiclesStore.unsetStoreFlashMessage();
	}

	componentDidMount() {
		VehiclesAction.getVehicles();
	}

	componentWillUnmount() {
		VehiclesStore.removeChangeListener(this._onChange);
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

	_onChange() {
		let vehicles 		= VehiclesStore.getVehicles();
		let flashMessage 	= VehiclesStore.getStoreFlashMessage();
		let isAuthenticated = VehiclesStore.isAuthenticated();
		let openRightPanel  = VehiclesStore.showRightPanel();

		if (!isAuthenticated){
			this.context.router.push("/auth/login");
			return false;
		}

		this.setState({
			vehicles: vehicles,
			showRightPanel: !!openRightPanel,
			flashMessage: flashMessage !== undefined ? flashMessage : null,
			loader: false,
			columnCss: {
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

	// Handle delete
	onHandleRemove(id) {
		VehiclesAction.removeVehicle(id);
	}

	// Set flash message
	setFlashMessage(msg) {
		this.setState({flashMessage: msg});
	}

	// Close right panel
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
					onHandleRightPanel={ this.onHandleRightPanel }
					onHandleRemove={ this.onHandleRemove }
					className={ mainColumnClassName }
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