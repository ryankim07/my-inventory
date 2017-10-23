import React from 'react';
import { PropTypes } from 'prop-types';
import VehiclesAction from '../../actions/vehicles-action';
import VehiclesStore from '../../stores/vehicles/store';
import MainPanel from '../helper/panels/main';
import DisplayPanel from '../helper/panels/display';
import RightPanel from '../helper/panels/right';
import VehicleForm from './forms/vehicle';
import VehiclesList from './list';
import FlashMessage from '../helper/flash_message';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';
let rightPanelMobileColumnWidth = 'col-xs-4';
let rightPanelDesktopColumnWidth = 'col-md-4';

class VehiclesDashboard extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			vehicles: [],
			vehicle: this.getVehicleState(),
			manufacturers: [],
			loader: true,
			isEditingMode: false,
			mainPanel: 'list',
			showRightPanel: false,
			flashMessage: null,
			showModal: false,
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
		this.onHandleModal 		= this.onHandleModal.bind(this);
		this.closeModal         = this.closeModal.bind(this);
		this.onHandleRemove 	= this.onHandleRemove.bind(this);
		this.setFlashMessage  	= this.setFlashMessage.bind(this);
		this.closeRightPanel  	= this.closeRightPanel.bind(this);
	}

	// Get vehicle initial state
	getVehicleState() {
		return {
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
	}

	// Mounting component
	componentWillMount() {
		VehiclesStore.addChangeListener(this._onChange);
		VehiclesStore.unsetStoreFlashMessage();

		if (this.props.params.section === "add") {
			this.setState({
				mainPanel: this.props.params.section,
				mainPanelColumnCss: {
					'mobileWidth': rightPanelMobileColumnWidth,
					'desktopWidth': rightPanelDesktopColumnWidth
				}
			});
		}
	}

	// Mounted component
	componentDidMount() {
		VehiclesAction.getVehiclesAndManufacturers();
	}

	// Unmount component
	componentWillUnmount() {
		VehiclesStore.removeChangeListener(this._onChange);
	}

	// Next state change
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.action === 'REPLACE' || nextProps.location.action === 'PUSH') {
			let mainPanel = null;

			switch (nextProps.location.pathname) {
				case '/vehicles/dashboard/add':
					mainPanel = 'add';
				break;

				case '/vehicles/dashboard/list':
					mainPanel = 'list';
				break;
			}

			this.setState({
				vehicle: this.getVehicleState(),
				mainPanel: mainPanel,
				showRightPanel: false,
				flashMessage: null,
				mainPanelColumnCss: {
					'mobileWidth': mainDefaultMobileColumnWidth,
					'desktopWidth': mainDefaultDesktopColumnWidth
				}
			});
		}
	}

	// Store change
	_onChange() {
		let vehicles 		= VehiclesStore.getVehicles();
		let manufacturers	= VehiclesStore.getManufacturers();
		let flashMessage 	= VehiclesStore.getStoreFlashMessage();
		let isAuthenticated = VehiclesStore.isAuthenticated();
		let openRightPanel  = VehiclesStore.showRightPanel();
		let loadList        = VehiclesStore.loadList();

		if (!isAuthenticated){
			this.context.router.push("/auth/forms/login");
			return false;
		}

		this.setState({
			vehicles: vehicles,
			manufacturers: manufacturers,
			mainPanel: loadList ? 'list' : this.state.mainPanel, // Need to set main panel if add new vehicle component is accessed from header
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
		let vehicle = isEditingMode ? this.state.vehicles.find(obj => obj.id === id) : this.getVehicleState();

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

	// Handle view
	onHandleModal(id) {
		let vehicle= this.state.vehicles.find(obj => obj.id === id);

		this.setState({
			vehicle: vehicle,
			showModal: !this.state.showModal
		});
	}

	// Close modal
	closeModal() {
		this.setState({
			showModal: !this.state.showModal
		});
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

	// Render
	render() {
		// Main panel
		let mainPanelHtml = '';

		switch (this.state.mainPanel) {
			case 'add':
				mainPanelHtml =
					<VehicleForm
						loader={ this.state.loader }
						vehicle={ this.state.vehicle }
						manufacturers={ this.state.manufacturers }
						isEditingMode={ false }
						onHandleFormSubmit={ this.onHandleFormSubmit }
						closeRightPanel=""
					/>;
				break;

			default:
				mainPanelHtml =
					<DisplayPanel
						id="vehicles-list"
						header="Vehicle List"
						iconBtn="fa fa-plus"
						onClick={ this.onHandleRightPanel.bind(this, false) }
						showPreviousBtn={ false }
						previousRoute="">
						<VehiclesList
							loader={ this.state.loader }
							vehicle={ this.state.vehicle }
							vehicles={ this.state.vehicles }
							showModal={ this.state.showModal }
							onHandleRightPanel={ this.onHandleRightPanel }
							onHandleRemove={ this.onHandleRemove }
							onHandleModal={ this.onHandleModal }
							closeModal={ this.closeModal }
						/>
					</DisplayPanel>;
		}

		// Right panel
		let rightPanelHtml = this.state.showRightPanel ?
			<DisplayPanel
				id="vehicle-form"
				header="Vehicle"
				additionalHeader={ additionalHeader }
				iconBtn="fa fa-window-close"
				onClick={ this.closeRightPanel }
				previousRoute="">
				<VehicleForm
					loader={ false }
					vehicle={ this.state.vehicle }
					manufacturers={ this.state.manufacturers }
					isEditingMode={ this.state.isEditingMode }
					onHandleFormSubmit={ this.onHandleFormSubmit }
					closeRightPanel={ this.closeRightPanel }
				/>
			</DisplayPanel> : null;

		return (
			<div className="row">
				{ !this.state.flashMessage ? null : <FlashMessage message={ this.state.flashMessage } alertType="alert-success"/>}

				<MainPanel mainPanelColumnCss={ this.state.mainPanelColumnCss }>
					{ mainPanelHtml }
				</MainPanel>
				<RightPanel rightPanelColumnCss={ this.state.rightPanelColumnCss }>
					{ rightPanelHtml }
				</RightPanel>
			</div>
		)
	}
}

VehiclesDashboard.contextTypes = {
	router: PropTypes.object.isRequired
}

export default VehiclesDashboard;