import React from 'react';
import _ from 'lodash';
import VehiclesAction from '../../actions/vehicles-action';
import VehiclesStore from '../../stores/vehicles/store';
import MainPanel from '../helper/panels/main';
import DisplayPanel from '../helper/panels/display';
import RightPanel from '../helper/panels/right';
import VehicleForm from './forms/vehicle';
import VehiclesList from './list';
import Modal from '../helper/modal';
import FlashMessage from '../helper/flash_message';
import { MAIN_DEFAULT_MOBILE_COLUMN_WIDTH, MAIN_DEFAULT_DESKTOP_COLUMN_WIDTH, MAIN_SHRINKED_MOBILE_COLUMN_WIDTH,
		 MAIN_SHRINKED_DESKTOP_COLUMN_WIDTH, RIGHT_PANEL_MOBILE_COLUMN_WIDTH, RIGHT_PANEL_DESKTOP_COLUMN_WIDTH,
	     ADD_PANEL, LIST_PANEL } from '../helper/constants';

// Get vehicle initial state
const initialVehicleObj = {
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
};

class VehiclesDashboard extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			vehicles: [],
			vehicle: initialVehicleObj,
			manufacturers: [],
			loader: true,
			isEditingMode: false,
			mainPanel: this.props.match.params.section,
			showRightPanel: false,
			flashMessage: null,
			showModal: false,
			alertType: 'success',
			mainPanelColumnCss: {
				mobileWidth: MAIN_DEFAULT_MOBILE_COLUMN_WIDTH,
				desktopWidth: MAIN_DEFAULT_DESKTOP_COLUMN_WIDTH
			},
			rightPanelColumnCss: {
				mobileWidth: RIGHT_PANEL_MOBILE_COLUMN_WIDTH,
				desktopWidth: RIGHT_PANEL_DESKTOP_COLUMN_WIDTH
			}
		};

		this._onChange 		  	= this._onChange.bind(this);
		this.onHandleFormChange = this.onHandleFormChange.bind(this);
		this.onHandleSubmit 	= this.onHandleSubmit.bind(this);
		this.onHandleRightPanel = this.onHandleRightPanel.bind(this);
		this.onHandleModal 		= this.onHandleModal.bind(this);
		this.onHandleCloseModal = this.onHandleCloseModal.bind(this);
		this.onHandleRemove 	= this.onHandleRemove.bind(this);
		this.setFlashMessage  	= this.setFlashMessage.bind(this);
		this.onCloseRightPanel  = this.onCloseRightPanel.bind(this);
	}



	// Mounting component
	componentWillMount() {
		VehiclesStore.addChangeListener(this._onChange);
		VehiclesStore.removeStoreStatus();

		if (this.props.match.params.section === ADD_PANEL) {
			this.setState({
				mainPanel: this.props.match.params.section,
				mainPanelColumnCss: {
					mobileWidth: RIGHT_PANEL_MOBILE_COLUMN_WIDTH,
					desktopWidth: RIGHT_PANEL_DESKTOP_COLUMN_WIDTH
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
					mainPanel = ADD_PANEL;
				break;

				case '/vehicles/dashboard/list':
					mainPanel = LIST_PANEL;
				break;
			}

			this.setState({
				vehicle: initialVehicleObj,
				mainPanel: mainPanel,
				showRightPanel: false,
				flashMessage: null,
				mainPanelColumnCss: {
					mobileWidth: MAIN_DEFAULT_MOBILE_COLUMN_WIDTH,
					desktopWidth: MAIN_DEFAULT_DESKTOP_COLUMN_WIDTH
				}
			});
		}
	}

	// Store change
	_onChange() {
		let vehicles 		= VehiclesStore.getVehicles();
		let manufacturers	= VehiclesStore.getManufacturers();
		let storeStatus 	= VehiclesStore.getStoreStatus();
		let isAuthenticated = VehiclesStore.isAuthenticated();
		let openRightPanel  = VehiclesStore.showRightPanel();
		let loadList        = VehiclesStore.loadList();

		if (!isAuthenticated){
			this.props.history.push("/auth/forms/login");
			return false;
		}

		this.setState({
			vehicles: vehicles,
			manufacturers: manufacturers,
			mainPanel: loadList ? LIST_PANEL : this.state.mainPanel, // Need to set main panel if add new vehicle component is accessed from header
			showRightPanel: !!openRightPanel,
			flashMessage: storeStatus.msg !==  null ? storeStatus.msg : null,
			alertType: storeStatus.type,
			loader: false,
			mainPanelColumnCss: {
				mobileWidth: openRightPanel ? MAIN_SHRINKED_MOBILE_COLUMN_WIDTH : MAIN_DEFAULT_MOBILE_COLUMN_WIDTH,
				desktopWidth: openRightPanel ? MAIN_SHRINKED_DESKTOP_COLUMN_WIDTH : MAIN_DEFAULT_DESKTOP_COLUMN_WIDTH
			}
		});
	}

	// Handle form change
	onHandleFormChange(vehicle) {
		this.setState({ vehicle: vehicle });
	}

	// Handle delete
	onHandleRemove(id) {
		VehiclesAction.removeVehicle(id);
	}

	// Handle submit
	onHandleSubmit(vehicle) {
		if (!this.state.isEditingMode) {
			VehiclesAction.addVehicle(vehicle);
		} else {
			VehiclesAction.updateVehicle(vehicle);
		}
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
	onHandleCloseModal() {
		this.setState({ showModal: !this.state.showModal });
	}

	// Handle right panel
	onHandleRightPanel(id) {
		let isEditingMode = !!id;
		const vehicle = isEditingMode ?
			_.find(this.state.vehicles, ['id', id]) : initialVehicleObj;

		this.setState({
			vehicle: vehicle,
			isEditingMode: isEditingMode,
			showRightPanel: true,
			mainPanelColumnCss: {
				mobileWidth: MAIN_SHRINKED_MOBILE_COLUMN_WIDTH,
				desktopWidth: MAIN_SHRINKED_DESKTOP_COLUMN_WIDTH
			}
		});
	}

	// Set flash message
	setFlashMessage(msg) {
		this.setState({flashMessage: msg});
	}

	// Close right panel
	onCloseRightPanel() {
		this.setState({
			showRightPanel: false,
			mainPanelColumnCss: {
				mobileWidth: MAIN_DEFAULT_MOBILE_COLUMN_WIDTH,
				desktopWidth: MAIN_DEFAULT_DESKTOP_COLUMN_WIDTH
			}
		});
	}

	// Render
	render() {
		// Main panel
		let mainPanelHtml = '';

		switch (this.state.mainPanel) {
			case ADD_PANEL:
				mainPanelHtml =
					<DisplayPanel
						id="vehicle-form"
						header="Vehicle"
						additionalHeader="Add"
						iconBtn=""
						onClick="">
						<VehicleForm
							loader={ this.state.loader }
							vehicle={ this.state.vehicle }
							manufacturers={ this.state.manufacturers }
							onChange={ this.onHandleFormChange }
							onSubmit={ this.onHandleSubmit }
							onCloseRightPanel=""
						/>
					</DisplayPanel>;
			break;

			default:
				mainPanelHtml =
					<DisplayPanel
						id="vehicles-list"
						header="Vehicle List"
						additionalHeader=""
						iconBtn="fa fa-plus"
						onClick={ this.onHandleRightPanel.bind(this, false) }>
						<VehiclesList
							loader={ this.state.loader }
							selectedItem={ this.state.vehicle.id }
							vehicles={ this.state.vehicles }
							onRemove={ this.onHandleRemove }
							onSearch={ this.onHandleSearch }
							onModal={ this.onHandleModal }
							onHandleRightPanel={ this.onHandleRightPanel }
						/>
					</DisplayPanel>;
		}

		// Right panel
		let rightPanelHtml = this.state.showRightPanel ?
			<DisplayPanel
				id="vehicle-form"
				header="Vehicle"
				additionalHeader={ !this.state.isEditingMode ? "Add" : "Edit" }
				iconBtn="fa fa-window-close"
				onClick={ this.onCloseRightPanel }>
				<VehicleForm
					loader={ false }
					vehicle={ this.state.vehicle }
					manufacturers={ this.state.manufacturers }
					onChange={ this.onHandleFormChange }
					onSubmit={ this.onHandleSubmit }
					onCloseRightPanel={ this.onCloseRightPanel }
				/>
			</DisplayPanel> : null;

		// Modal window
		let modalWindowHtml = this.state.showModal ?
			<Modal
				id="view-vehicle"
				header={ this.state.vehicle.mfg + " " + this.state.vehicle.model }
				onClose={ this.onHandleCloseModal }>
				<h1>{ this.state.vehicle.mfg }</h1>
			</Modal> : null;

		let flashMessage = this.state.flashMessage ?
			<FlashMessage message={ this.state.flashMessage } alertType={ this.state.alertType }/> : null;

		return (
			<div className="row">
				{ flashMessage }

				<MainPanel mainPanelColumnCss={ this.state.mainPanelColumnCss }>
					{ mainPanelHtml }
					{ modalWindowHtml }
				</MainPanel>
				<RightPanel rightPanelColumnCss={ this.state.rightPanelColumnCss }>
					{ rightPanelHtml }
				</RightPanel>
			</div>
		)
	}
}

export default VehiclesDashboard;