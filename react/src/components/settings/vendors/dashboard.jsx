import React from 'react';
import VendorsAction from '../../../actions/vendors-action';
import VendorsStore from '../../../stores/vendors/store';
import MainPanel from '../../helper/panels/main';
import DisplayPanel from '../../helper/panels/display';
import RightPanel from '../../helper/panels/right';
import SettingsVendorsList from './../vendors/list';
import SettingsVendor from './../vendors/forms/vendor';
import FlashMessage from '../../helper/flash_message';
import { MAIN_DEFAULT_MOBILE_COLUMN_WIDTH, MAIN_DEFAULT_DESKTOP_COLUMN_WIDTH, MAIN_SHRINKED_MOBILE_COLUMN_WIDTH,
		 MAIN_SHRINKED_DESKTOP_COLUMN_WIDTH, RIGHT_PANEL_MOBILE_COLUMN_WIDTH, RIGHT_PANEL_DESKTOP_COLUMN_WIDTH,
		 ADD_PANEL, LIST_PANEL } from '../../helper/constants';

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
			loader: true,
			isEditingMode: false,
			mainPanel: this.props.match.params.section,
			showRightPanel: false,
			flashMessage: null,
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

		this._onChange 		 	= this._onChange.bind(this);
		this.onHandleFormChange = this.onHandleFormChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
		this.onHandleRightPanel = this.onHandleRightPanel.bind(this);
		this.onHandleRemove 	= this.onHandleRemove.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
		this.setFlashMessage 	= this.setFlashMessage.bind(this);
		this.onCloseRightPanel 	= this.onCloseRightPanel.bind(this);
	}

	// Mounting component
	componentWillMount() {
		VendorsStore.addChangeListener(this._onChange);
		VendorsStore.removeStoreStatus();
	}

	// Mounted component
	componentDidMount() {
		VendorsAction.getVendors();
	}

	// Un-mounting component
	componentWillUnmount() {
		VendorsStore.removeChangeListener(this._onChange);

		if (this.props.match.params.section === ADD_PANEL) {
			this.setState({
				mainPanelColumnCss: {
					mobileWidth: RIGHT_PANEL_MOBILE_COLUMN_WIDTH,
					desktopWidth: RIGHT_PANEL_DESKTOP_COLUMN_WIDTH
				}
			});
		}
	}

	// Next state change
	componentWillReceiveProps(nextProps) {
		if (nextProps.history.action === 'REPLACE' || nextProps.history.action === 'PUSH') {
			let mainPanel = null;

			switch (nextProps.location.pathname) {
				case '/settings/vendors/dashboard/add':
					mainPanel = ADD_PANEL;
					break;

				case '/settings/vendors/dashboard/list':
					mainPanel = LIST_PANEL;
					break;
			}

			this.setState({
				vendor: initialUserObj,
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
		let vendors 		= VendorsStore.getVendors();
		let storeStatus 	= VendorsStore.getStoreStatus();
		let isAuthenticated = VendorsStore.isAuthenticated();
		let openRightPanel  = VendorsStore.showRightPanel();

		if (!isAuthenticated){
			this.props.history.push("/auth/forms/login");
			return false;
		}

		this.setState({
			vendors: vendors,
			showRightPanel: !!openRightPanel,
			flashMessage: storeStatus.msg !== null ? storeStatus.msg : null,
			alertType: storeStatus.type,
			loader: false,
			mainPanelColumnCss: {
				mobileWidth: openRightPanel ? MAIN_SHRINKED_MOBILE_COLUMN_WIDTH : MAIN_DEFAULT_MOBILE_COLUMN_WIDTH,
				desktopWidth: openRightPanel ? MAIN_SHRINKED_DESKTOP_COLUMN_WIDTH : MAIN_DEFAULT_DESKTOP_COLUMN_WIDTH
			}
		});
	}

	// Handle right panel
	onHandleRightPanel(id) {
		let isEditingMode = !!id;
		const vendor = isEditingMode ?
			this.state.vendors.find(obj => obj.id === id) : intialVendorObj;

		this.setState({
			vendor: vendor,
			isEditingMode: isEditingMode,
			showRightPanel: true,
			mainPanelColumnCss: {
				mobileWidth: MAIN_SHRINKED_MOBILE_COLUMN_WIDTH,
				desktopWidth: MAIN_SHRINKED_DESKTOP_COLUMN_WIDTH
			}
		});
	}

	// Handle form change
	onHandleFormChange(vendor) {
		this.setState({ vendor: vendor });
	}

	// Handle delete
	onHandleRemove(id) {
		VendorsAction.removeVendor(id);
	}

	// Handle submit
	onHandleSubmit(event) {
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
		this.setState({ flashMessage: msg });
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
		let mainPanelObjs = this.props.match.params.section === "add" ?
			{ id: "vendor-form",
				displayHeader: "Vendor",
				additionalHeader: !this.state.isEditingMode ? "Add" : "Edit",
				iconBtn: "fa fa-window-close",
				onClick: "",
				subForm:
					<SettingsVendor
						vendor={ this.state.vendor }
						onChange={ this.onHandleFormChange }
						onSubmit={ this.onHandleSubmit}
						onCloseRightPanel={ this.onCloseRightPanel }
					/>
			} :
			{
				id: "vendors-list",
				displayHeader: "Vendors List",
				additionalHeader: "",
				iconBtn: "fa fa-plus",
				onClick: this.onHandleRightPanel.bind(this, false),
				subForm:
					<SettingsVendorsList
						loader={ this.state.loader }
						selectedItem={ this.state.vendor.id }
						vendors={ this.state.vendors }
						onRemove={ this.onHandleRemove }
						onHandleRightPanel={ this.onHandleRightPanel }
					/>
			};

		let mainPanelHtml =
			<DisplayPanel
				id={ mainPanelObjs.id }
				header={ mainPanelObjs.header }
				additionalHeader={ mainPanelObjs.additionalHeader }
				iconBtn={ mainPanelObjs.iconBtn }
				onClick={ mainPanelObjs.onClick }>
				{ mainPanelObjs.subForm }
			</DisplayPanel>;

		// Right panel
		let rightPanelHtml = this.state.showRightPanel ?
			<DisplayPanel
				id="vendor-form"
				header="Vendor"
				additionalHeader={ !this.state.isEditingMode ? "Add" : "Edit" }
				iconBtn="fa fa-window-close"
				onClick={ this.onCloseRightPanel }>
				<SettingsVendor
					vendor={ this.state.vendor }
					onChange={ this.onHandleFormChange }
					onSubmit={ this.onHandleSubmit}
					onCloseRightPanel={ this.onCloseRightPanel }
				/>
			</DisplayPanel> : null;

		// Flash message
		let flashMessage = this.state.flashMessage ?
			<FlashMessage message={ this.state.flashMessage } alertType={ this.state.alertType }/> : null;

		return (
			<div className="row">
				{ flashMessage }

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

export default SettingsVendorsDashboard;