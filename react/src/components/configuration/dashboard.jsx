import React from 'react';

import ConfigurationMainPanel from './main_panel';
import ConfigurationRightPanel from './right_panel';
import VehiclesApiHome from './vehicles/home';
import VehiclesApiList from './vehicles/api/list';
import FlashMessage from '../helper/flash-message';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';
let rightPanelMobileColumnWidth = 'col-xs-4';
let rightPanelDesktopColumnWidth = 'col-md-4';

class ConfigurationDashboard extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			mainPanel: this.props.params.section,
			showRightPanel: false,
			flashMessage: null,
			leftPanelColumnCss: {
				'mobileWidth': leftPanelMobileColumnWidth,
				'desktopWidth': leftPanelDesktopColumnWidth
			},
			mainPanelColumnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			},
			rightPanelColumnCss: {
				'mobileWidth': rightPanelMobileColumnWidth,
				'desktopWidth': rightPanelDesktopColumnWidth
			}
		};

		/*
		this.setFlashMessage  	= this.setFlashMessage.bind(this);
		this.closeRightPanel  	= this.closeRightPanel.bind(this);*/
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.location.action === 'REPLACE') {
			this.setState({mainPanel: nextProps.params.section});
		}
	}

	/*

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
	}*/

	render() {
		// Main panel
		let mainPanelHtml = '';

		switch (this.state.mainPanel) {
			case 'vehicles-api-home':
				mainPanelHtml = <VehiclesApiHome/>;
			break;

			case 'vehicles-api-list':
				mainPanelHtml = <VehiclesApiList/>;
			break;
		}

		// Right panel
		let rightPanelHtml = '';

		switch (this.state.rightPanel) {
			default:
				rightPanelHtml = '';
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
							{ rightPanelHtml }
						</ConfigurationRightPanel> : null
				}
			</div>
		)
	}
}

export default ConfigurationDashboard;