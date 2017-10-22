import React from 'react';
import { PropTypes } from 'prop-types';
import VendorsAction from '../../../actions/vendors-action';
import VendorsStore from '../../../stores/vendors/store';
import SettingsMainPanel from './../main_panel';
import SettingsRightPanel from './../right_panel';
import SettingsVendorsList from './../vendors/list';
import SettingsVendor from './../vendors/forms/vendor';
import FlashMessage from '../../helper/flash_message';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';
let rightPanelMobileColumnWidth = 'col-xs-4';
let rightPanelDesktopColumnWidth = 'col-md-4';

class SettingsVendorsDashboard extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			vendors: [],
			vendor: this.getVendorState(),
			categories: [],
			loader: true,
			isEditingMode: false,
			mainPanel: this.props.params.section,
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

		this._onChange 		 	= this._onChange.bind(this);
		this.onHandleFormSubmit = this.onHandleFormSubmit.bind(this);
		this.onHandleRightPanel = this.onHandleRightPanel.bind(this);
		this.onHandleRemove 	= this.onHandleRemove.bind(this);
		this.setFlashMessage 	= this.setFlashMessage.bind(this);
		this.closeRightPanel 	= this.closeRightPanel.bind(this);
	}

	// Get vendor initial state
	getVendorState() {
		return {
			id: '',
			category_id: '',
			company: '',
			street: '',
			city: '',
			state: '',
			zip: '',
			country: '',
			phone: '',
			contact: '',
			url: '',
			notes: ''
		}
	}

	// When mounting component
	componentWillMount() {
		VendorsStore.addChangeListener(this._onChange);
		VendorsStore.unsetStoreFlashMessage();
	}

	// Mounted component
	componentDidMount() {
		VendorsAction.getVendorsAndCategories();
	}

	// When un-mounting component
	componentWillUnmount() {
		VendorsStore.removeChangeListener(this._onChange);
	}

	// Store change
	_onChange() {
		let vendors 		= VendorsStore.getVendors();
		let categories		= VendorsStore.getCategories();
		let flashMessage 	= VendorsStore.getStoreFlashMessage();
		let isAuthenticated = VendorsStore.isAuthenticated();
		let openRightPanel  = VendorsStore.showRightPanel();

		if (!isAuthenticated){
			this.context.router.push("/auth/forms/login");
			return false;
		}

		this.setState({
			vendors: vendors,
			categories: categories,
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
			VendorsAction.addVendor(vehicle);
		} else {
			VendorsAction.updateVendor(vehicle);
		}
	}

	// Handle right panel
	onHandleRightPanel(id) {
		let isEditingMode = !!id;
		let vendor = isEditingMode ?
			this.state.vendors.find(obj => obj.id === id) : this.getVendorState();

		this.setState({
			vendor: vendor,
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
		VendorsAction.removeVendor(id);
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
		let mainPanelHtml =
			<SettingsVendorsList
				loader={ this.state.loader }
				vendor={ this.state.vendor }
				vendors={ this.state.vendors }
				onHandleRightPanel={ this.onHandleRightPanel }
				onHandleRemove={ this.onHandleRemove }
			/>;

		// Right panel
		let rightPanelHtml = this.state.showRightPanel ?
			<SettingsVendor
				vendor={ this.state.vendor }
				categories={ this.state.categories }
				isEditingMode={ this.state.isEditingMode }
				onHandleFormSubmit={ this.onHandleFormSubmit }
				closeRightPanel={ this.closeRightPanel }
			/> : null;

		return (
			<div className="row">
				{ !this.state.flashMessage ? null : <FlashMessage message={ this.state.flashMessage } alertType="alert-success"/>}

				<SettingsMainPanel mainPanelColumnCss={ this.state.mainPanelColumnCss }>
					{ mainPanelHtml }
				</SettingsMainPanel>
				<SettingsRightPanel rightPanelColumnCss={ this.state.rightPanelColumnCss }>
					{ rightPanelHtml }
				</SettingsRightPanel>
			</div>
		)
	}
}

SettingsVendorsDashboard.contextTypes = {
	router: PropTypes.object.isRequired
};

export default SettingsVendorsDashboard;