import React from 'react';
import { PropTypes } from 'prop-types';
import ApiVehiclesAction from '../../../actions/api-vehicles-action';
import ApiVehiclesStore from '../../../stores/vehicles/api-store';
import ConfigurationMainPanel from './../main_panel';
import ConfigurationRightPanel from './../right_panel';
import ConfigurationVehiclesApiList from './../vehicles/api/list';
import ConfigurationVehicleModels from './../vehicles/api/models';
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
			apiVehicles: [],
			apiVehicle: {},
			selectedVehicle: null,
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
		let apiVehicles = ApiVehiclesStore.getApiVehicles();

		this.setState({
			apiVehicles: apiVehicles,
			loader: false,
			/*mainPanelColumnCss: {
				'mobileWidth': openRightPanel ? mainShrinkedMobileColumnWidth : mainDefaultMobileColumnWidth,
				'desktopWidth': openRightPanel ? mainShrinkedDesktopColumnWidth : mainDefaultDesktopColumnWidth
			}*/
		});
	}

	/*
		// Handle submit
		onHandleFormSubmit(vehicle) {
			if (!this.state.isEditingMode) {
				VehiclesAction.addVehicle(vehicle);
			} else {
				VehiclesAction.updateVehicle(vehicle);
			}
		}



		// Handle delete
		onHandleRemove(id) {
			VehiclesAction.removeVehicle(id);
		}
		*/


	// Sync API
	onHandleSync() {
		ApiVehiclesAction.sync();
	}

	onHandleMainPanel(id, panel) {
		console.log('ID: ' + id + ' Panel: ' + panel);
	}

	// Handle right panel
	onHandleRightPanel(id) {
		let apiVehicle = this.state.apiVehicles.find(obj => obj.id === id);

		this.setState({
			apiVehicle: apiVehicle,
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
		let mainPanelHtml = '';

		switch (this.state.mainPanel) {
			case 'api-list':
				mainPanelHtml =
					<ConfigurationVehiclesApiList
						loader={ this.state.loader }
						apiVehicles={ this.state.apiVehicles }
						selectedVehicle={ this.state.selectedVehicle }
						onHandleSync={ this.onHandleSync }
						onHandleRightPanel={ this.onHandleRightPanel }
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
							<ConfigurationVehicleModels
								apiVehicle={ this.state.apiVehicle }
								onHandleMainPanel={ this.onHandleMainPanel }
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