import React from 'react';
import { PropTypes } from 'prop-types';
import ConfigurationMainPanel from './../main_panel';
import ConfigurationRightPanel from './../right_panel';
import ConfigurationVehiclesApiList from './../vehicles/api/list';
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

		this.setFlashMessage = this.setFlashMessage.bind(this);
		this.closeRightPanel = this.closeRightPanel.bind(this);
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

	/*
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
		*/

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
		// Main panel
		let mainPanelHtml = '';

		switch (this.state.mainPanel) {
			case 'api-list':
				mainPanelHtml =
					<ConfigurationVehiclesApiList />;
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