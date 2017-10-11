import React from 'react';
import { PropTypes } from 'prop-types';
import VehiclesAction from '../../actions/vehicles-action';
import VehiclesStore from '../../stores/vehicles/store';
import VehiclesMainPanel from './main_panel';
import VehiclesRightPanel from './right_panel';
import VehicleForm from './main/forms/vehicle';
import VehiclesList from './main/list';
import FlashMessage from '../helper/flash_message';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';
let rightPanelMobileColumnWidth = 'col-xs-4';
let rightPanelDesktopColumnWidth = 'col-md-4';

class VehiclesDashboard extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			vehicles: [],
			vehicle: {},
			manufacturers: [],
			isEditingMode: false,
			loader: true,
			showRightPanel: false,
			flashMessage: null,
			mainPanelColumnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			},
			rightPanelColumnCss: {
				'mobileWidth': rightPanelMobileColumnWidth,
				'desktopWidth': rightPanelDesktopColumnWidth
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
		VehiclesAction.getVehiclesAndManufacturers();
	}

	componentWillUnmount() {
		VehiclesStore.removeChangeListener(this._onChange);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.location.action !== 'POP') {
			this.setState({
				mainPanelColumnCss: {
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
		let manufacturers	= VehiclesStore.getManufacturers();
		let flashMessage 	= VehiclesStore.getStoreFlashMessage();
		let isAuthenticated = VehiclesStore.isAuthenticated();
		let openRightPanel  = VehiclesStore.showRightPanel();

		if (!isAuthenticated){
			this.context.router.push("/auth/login");
			return false;
		}

		this.setState({
			vehicles: vehicles,
			manufacturers: manufacturers,
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

	// Set flash message
	setFlashMessage(msg) {
		this.setState({flashMessage: msg});
	}

	// Close right panel
	closeRightPanel() {
		this.setState({
			showRightPanel: false,
			mainPanelColumnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			}
		});
	}

	render() {
		return (
			<div className="row">
				{ !this.state.flashMessage ? null : <FlashMessage message={ this.state.flashMessage } alertType="alert-success" />}

				<VehiclesMainPanel mainPanelColumnCss={ this.state.mainPanelColumnCss }>
					<VehiclesList
						loader={ this.state.loader }
						vehicle={ this.state.vehicle }
						vehicles={ this.state.vehicles }
						onHandleRightPanel={ this.onHandleRightPanel }
						onHandleRemove={ this.onHandleRemove }
					/>
				</VehiclesMainPanel>

				{
					this.state.showRightPanel ?
						<VehiclesRightPanel rightPanelColumnCss={ this.state.rightPanelColumnCss }>
							<VehicleForm
								vehicle={ this.state.vehicle }
								manufacturers={ this.state.manufacturers }
								isEditingMode={ this.state.isEditingMode }
								onHandleFormSubmit={ this.onHandleFormSubmit }
								closeRightPanel={ this.closeRightPanel }
							/>
						</VehiclesRightPanel> : null
				}
			</div>
		)
	}
}

VehiclesDashboard.contextTypes = {
	router: PropTypes.object.isRequired
}

export default VehiclesDashboard;