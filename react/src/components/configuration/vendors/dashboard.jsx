import React from 'react';
import { PropTypes } from 'prop-types';
import VendorsAction from '../../../actions/vendors-action';
import VendorsStore from '../../../stores/vendors/store';
import ConfigurationMainPanel from './../main_panel';
import ConfigurationRightPanel from './../right_panel';
import ConfigurationVendorsList from './../vendors/list';
import ConfigurationVendor from './../vendors/forms/vendor';
import FlashMessage from '../../helper/flash_message';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';
let rightPanelMobileColumnWidth = 'col-xs-4';
let rightPanelDesktopColumnWidth = 'col-md-4';

class ConfigurationVendorsDashboard extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			vendors: [],
			vendor: {},
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

	componentWillMount() {
		VendorsStore.addChangeListener(this._onChange);
		VendorsStore.unsetStoreFlashMessage();
	}

	componentDidMount() {
		VendorsAction.getVendorsAndCategories();
	}

	componentWillUnmount() {
		VendorsStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		let vendors 		= VendorsStore.getVendors();
		let categories		= VendorsStore.getCategories();
		let flashMessage 	= VendorsStore.getStoreFlashMessage();
		let isAuthenticated = VendorsStore.isAuthenticated();
		let openRightPanel  = VendorsStore.showRightPanel();

		if (!isAuthenticated){
			this.context.router.push("/auth/login");
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
			this.state.vendors.find(obj => obj.id === id) :
			{
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

		this.setState({
			vendor: vendor,
			isEditingMode: isEditingMode,
			showRightPanel: this.state.showRightPanel,
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
			showRightPanel: !this.state.showRightPanel,
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

				<ConfigurationMainPanel mainPanelColumnCss={ this.state.mainPanelColumnCss }>
					<ConfigurationVendorsList
						loader={ this.state.loader }
						vendor={ this.state.vendor }
						vendors={ this.state.vendors }
						onHandleRightPanel={ this.onHandleRightPanel }
						onHandleRemove={ this.onHandleRemove }
					/>
				</ConfigurationMainPanel>

				{
					this.state.showRightPanel ?
						<ConfigurationRightPanel rightPanelColumnCss={ this.state.rightPanelColumnCss }>
							<ConfigurationVendor
								vendor={ this.state.vendor }
								categories={ this.state.categories }
								onHandleFormSubmit={ this.onHandleFormSubmit }
								closeRightPanel={ this.closeRightPanel }
							/>
						</ConfigurationRightPanel> : null
				}
			</div>
		)
	}
}

ConfigurationVendorsDashboard.contextTypes = {
	router: PropTypes.object.isRequired
}

export default ConfigurationVendorsDashboard;