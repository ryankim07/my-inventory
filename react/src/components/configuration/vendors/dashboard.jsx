import React from 'react';
import { PropTypes } from 'prop-types';
import VendorsAction from '../../../actions/vendors-action';
import VendorsStore from '../../../stores/vendors/store';
import ConfigurationMainPanel from './../main_panel';
import ConfigurationRightPanel from './../right_panel';
import ConfigurationVendorsList from './../vendors/list';
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
			selectedVendor: {},
			selectedModel: {},
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
		this.onHandleMainPanel 	= this.onHandleMainPanel.bind(this);
		this.onHandleRightPanel = this.onHandleRightPanel.bind(this);
		this.setFlashMessage 	= this.setFlashMessage.bind(this);
		this.closeRightPanel 	= this.closeRightPanel.bind(this);
	}

	componentWillMount() {
		VendorsStore.addChangeListener(this._onChange);
		VendorsStore.unsetStoreFlashMessage();
	}

	componentDidMount() {
		VendorsAction.getVendors();
	}

	componentWillUnmount() {
		VendorsStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		let vendors = VendorsStore.getVendors();

		this.setState({
			vendors: vendors,
			loader: false,
			/*mainPanelColumnCss: {
				'mobileWidth': openRightPanel ? mainShrinkedMobileColumnWidth : mainDefaultMobileColumnWidth,
				'desktopWidth': openRightPanel ? mainShrinkedDesktopColumnWidth : mainDefaultDesktopColumnWidth
			}*/
		});
	}

	// Handle main panel
	onHandleMainPanel(id) {
		this.setState({
			selectedVendor: this.state.vendors.find(obj => obj.id === id),
			showRightPanel: true,
			mainPanelColumnCss: {
				'mobileWidth': mainShrinkedMobileColumnWidth,
				'desktopWidth': mainShrinkedDesktopColumnWidth
			}
		});
	}

	// Handle right panel
	onHandleRightPanel(id) {
		let vendor = this.state.vendors.find(obj => obj.id === id);

		this.setState({
			selectedModel: vendor,
			showRightPanel: true,
			mainPanelColumnCss: {
				'mobileWidth': mainShrinkedMobileColumnWidth,
				'desktopWidth': mainShrinkedDesktopColumnWidth
			}
		});
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

	// Set flash message
	setFlashMessage(msg) {
		this.setState({flashMessage: msg});
	}

	render() {
		// Main panel
		console.log('vehicles dashboard');
		let mainPanelHtml = '';

		switch (this.state.mainPanel) {
			case 'vendors':
				mainPanelHtml =
					<ConfigurationVendorsList
						loader={ this.state.loader }
						vendors={ this.state.vendors }
						selectedVendor={ this.state.selectedVendor }
						onHandleMainPanel={ this.onHandleMainPanel }
					/>;
			break;
		}

		return (
			<div className="row">
				{ !this.state.flashMessage ? null : <FlashMessage message={ this.state.flashMessage } alertType="alert-success" />}

				<ConfigurationMainPanel mainPanelColumnCss={ this.state.mainPanelColumnCss }>
					{ mainPanelHtml }
				</ConfigurationMainPanel>

				{
					this.state.showRightPanel ?
						<ConfigurationRightPanel rightPanelColumnCss={ this.state.rightPanelColumnCss }>
							<ConfigurationVendorsList
								vendor={ this.state.selectedVendor.company }
								models={ this.state.vendors }
								selectedModel={ this.state.selectedModel }
								onHandleRightPanel={ this.onHandleRightPanel }
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