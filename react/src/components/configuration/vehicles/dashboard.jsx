import React from 'react';
import { PropTypes } from 'prop-types';
import ApiVehiclesAction from '../../../actions/api-vehicles-action';
import ApiVehiclesStore from '../../../stores/vehicles/api-store';
import ConfigurationMainPanel from './../main_panel';
import ConfigurationRightPanel from './../right_panel';
import ConfigurationManufacturers from './../vehicles/api/manufacturers';
import ConfigurationManufacturerModels from './../vehicles/api/models';
import FlashMessage from '../../helper/flash-message';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';
let rightPanelMobileColumnWidth = 'col-xs-4';
let rightPanelDesktopColumnWidth = 'col-md-4';

class ConfigurationVehiclesDashboard extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			manufacturers: [],
			selectedMfg: {},
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
		ApiVehiclesStore.addChangeListener(this._onChange);
		ApiVehiclesStore.unsetStoreFlashMessage();
	}

	componentDidMount() {
		ApiVehiclesAction.getApiVehicles();
	}

	componentWillUnmount() {
		ApiVehiclesStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		let manufacturers = ApiVehiclesStore.getApiVehicles();

		this.setState({
			manufacturers: manufacturers,
			loader: false,
			/*mainPanelColumnCss: {
				'mobileWidth': openRightPanel ? mainShrinkedMobileColumnWidth : mainDefaultMobileColumnWidth,
				'desktopWidth': openRightPanel ? mainShrinkedDesktopColumnWidth : mainDefaultDesktopColumnWidth
			}*/
		});
	}

	// Sync API
	onHandleSync() {
		ApiVehiclesAction.sync();
	}

	// Handle main panel
	onHandleMainPanel(id) {
		this.setState({
			selectedMfg: this.state.manufacturers.find(obj => obj.id === id),
			showRightPanel: true,
			mainPanelColumnCss: {
				'mobileWidth': mainShrinkedMobileColumnWidth,
				'desktopWidth': mainShrinkedDesktopColumnWidth
			}
		});
	}

	// Handle right panel
	onHandleRightPanel(id) {
		let mfg   = this.state.selectedMfg;
		let model = mfg.models.find(obj => obj.id === id);

		this.setState({
			selectedModel: model,
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
			case 'manufacturers':
				mainPanelHtml =
					<ConfigurationManufacturers
						loader={ this.state.loader }
						manufacturers={ this.state.manufacturers }
						selectedMfg={ this.state.selectedMfg }
						onHandleSync={ this.onHandleSync }
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
							<ConfigurationManufacturerModels
								mfg={ this.state.selectedMfg.mfg }
								models={ this.state.selectedMfg.models }
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

ConfigurationVehiclesDashboard.contextTypes = {
	router: PropTypes.object.isRequired
}

export default ConfigurationVehiclesDashboard;