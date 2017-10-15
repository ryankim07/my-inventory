import React from 'react';
import { PropTypes } from 'prop-types';
import ManufacturersAction from '../../../actions/manufacturers-action';
import ManufacturersStore from '../../../stores/vehicles/mfgs-store';
import ConfigurationMainPanel from './../main_panel';
import ConfigurationRightPanel from './../right_panel';
import ConfigurationManufacturersList from './../vehicles/api/manufacturers';
import ConfigurationManufacturerModelsList from './../vehicles/api/models';
import FlashMessage from '../../helper/flash_message';

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
			mfg: {},
			model: {},
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
		ManufacturersStore.addChangeListener(this._onChange);
		ManufacturersStore.unsetStoreFlashMessage();
	}

	componentDidMount() {
		ManufacturersAction.getManufacturers();
	}

	componentWillUnmount() {
		ManufacturersStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		let manufacturers = ManufacturersStore.getManufacturers();

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
		ManufacturersAction.sync();
	}

	// Handle main panel
	onHandleMainPanel(id) {
		this.setState({
			mfg: this.state.manufacturers.find(obj => obj.id === id),
			showRightPanel: true,
			mainPanelColumnCss: {
				'mobileWidth': mainShrinkedMobileColumnWidth,
				'desktopWidth': mainShrinkedDesktopColumnWidth
			}
		});
	}

	// Handle right panel
	onHandleRightPanel(id) {
		let mfg   = this.state.mfg;
		let model = mfg.models.find(obj => obj.id === id);

		this.setState({
			model: model,
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
					<ConfigurationManufacturersList
						loader={ this.state.loader }
						manufacturers={ this.state.manufacturers }
						mfg={ this.state.mfg }
						onHandleSync={ this.onHandleSync }
						onHandleMainPanel={ this.onHandleMainPanel }
					/>;
			break;
		}

		return (
			<div className="row">
				{ !this.state.flashMessage ? null : <FlashMessage message={ this.state.flashMessage } alertType="alert-success"/>}

				<ConfigurationMainPanel mainPanelColumnCss={ this.state.mainPanelColumnCss }>
					{ mainPanelHtml }
				</ConfigurationMainPanel>

				{
					this.state.showRightPanel ?
						<ConfigurationRightPanel rightPanelColumnCss={ this.state.rightPanelColumnCss }>
							<ConfigurationManufacturerModelsList
								mfg={ this.state.mfg.mfg }
								models={ this.state.mfg.models }
								model={ this.state.model }
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