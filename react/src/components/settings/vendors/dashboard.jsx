import React from 'react';
import { PropTypes } from 'prop-types';
import VendorsAction from '../../../actions/vendors-action';
import VendorsStore from '../../../stores/vendors/store';
import MainPanel from '../../helper/panels/main';
import DisplayPanel from '../../helper/panels/display';
import RightPanel from '../../helper/panels/right';
import SettingsVendorsList from './../vendors/list';
import SettingsVendor from './../vendors/forms/vendor';
import FlashMessage from '../../helper/flash_message';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';
let rightPanelMobileColumnWidth = 'col-xs-4';
let rightPanelDesktopColumnWidth = 'col-md-4';

const intialVendorObj = {
	id: '',
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
};

class SettingsVendorsDashboard extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			vendors: [],
			vendor: intialVendorObj,
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
		this.onHandleFormChange = this.onHandleFormChange.bind(this);
		this.onHandleSearch     = this.onHandleSearch.bind(this);
		this.onHandleFormSubmit = this.onHandleFormSubmit.bind(this);
		this.onHandleRightPanel = this.onHandleRightPanel.bind(this);
		this.onHandleRemove 	= this.onHandleRemove.bind(this);
		this.onHandleFormSubmit = this.onHandleFormSubmit.bind(this);
		this.setFlashMessage 	= this.setFlashMessage.bind(this);
		this.onCloseRightPanel 	= this.onCloseRightPanel.bind(this);
	}

	// Mounting component
	componentWillMount() {
		VendorsStore.addChangeListener(this._onChange);
		VendorsStore.unsetStoreFlashMessage();
	}

	// Mounted component
	componentDidMount() {
		VendorsAction.getVendorsAndCategories();
	}

	// Un-mounting component
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

	// Handle right panel
	onHandleRightPanel(id) {
		let isEditingMode = !!id;
		let vendor = isEditingMode ?
			this.state.vendors.find(obj => obj.id === id) : intialVendorObj;

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

	// Handle form change
	onHandleFormChange(vendor) {
		this.setState({vendor: vendor});
	}

	// Handle search
	onHandleSearch(vendors) {
		this.setState({vendors: vendors});
	}

	// Handle delete
	onHandleRemove(id) {
		VendorsAction.removeVendor(id);
	}

	// Handle submit
	onHandleFormSubmit(event) {
		event.preventDefault();

		let vendor = this.state.vendor;

		if (!this.state.isEditingMode) {
			VendorsAction.addVendor(vendor);
		} else {
			VendorsAction.updateVendor(vendor);
		}
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
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			}
		});
	}

	// Render
	render() {
		// Main panel
		let mainPanelHtml =
			<DisplayPanel
				id="vendors-list"
				header="Vendors List"
				additionalHeader=""
				iconBtn="fa fa-plus"
				onClick={ this.onHandleRightPanel.bind(this, false) }
				showPreviousBtn={ false }
				previousRoute="">
				<SettingsVendorsList
					loader={ this.state.loader }
					vendor={ this.state.vendor }
					vendors={ this.state.vendors }
					onChange={ this.onHandleFormChange }
					onSearch={ this.onHandleSearch }
					onHandleRightPanel={ this.onHandleRightPanel }
					onHandleRemove={ this.onHandleRemove }
				/>
			</DisplayPanel>;

		// Right panel
		let rightPanelHtml = this.state.showRightPanel ?
			<DisplayPanel
				id="vendor-form"
				header="Vendor"
				additionalHeader={ !this.state.isEditingMode ? "Add" : "Edit" }
				iconBtn="fa fa-window-close"
				onClick={ this.onCloseRightPanel }
				showPreviousBtn={ false }
				previousRoute="">
				<SettingsVendor
					vendor={ this.state.vendor }
					categories={ this.state.categories }
					onHandleFormSubmit={ this.onHandleFormSubmit }
					onCloseRightPanel={ this.onCloseRightPanel }
					onChange={ this.onHandleFormChange }
					onSubmit={ this.onHandleFormSubmit}
				/>
			</DisplayPanel> : null;

		return (
			<div className="row">
				{ !this.state.flashMessage ? null : <FlashMessage message={ this.state.flashMessage } alertType="alert-success"/> }

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

SettingsVendorsDashboard.contextTypes = {
	router: PropTypes.object.isRequired
};

export default SettingsVendorsDashboard;