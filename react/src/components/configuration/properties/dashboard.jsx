import React from 'react';
import { PropTypes } from 'prop-types';
import PaintsAction from '../../../actions/paints-action';
import PaintsStore from '../../../stores/paints/store';
import ConfigurationMainPanel from './../main_panel';
import ConfigurationRightPanel from './../right_panel';
import ConfigurationPropertiesPaintList from './paints/list';
import FlashMessage from '../../helper/flash-message';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';
let rightPanelMobileColumnWidth = 'col-xs-4';
let rightPanelDesktopColumnWidth = 'col-md-4';

class ConfigurationPropertiesDashboard extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			paints: [],
			isEditingMode: false,
			loader: true,
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

		this._onChange 			= this._onChange.bind(this);
		this.setFlashMessage  	= this.setFlashMessage.bind(this);
		this.closeRightPanel  	= this.closeRightPanel.bind(this);
	}

	componentWillMount() {
		PaintsStore.addChangeListener(this._onChange);
		PaintsStore.unsetStoreFlashMessage();
	}

	componentDidMount() {
		PaintsAction.getPaints();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.location.action === 'REPLACE') {
			this.setState({mainPanel: nextProps.params.section});
		}
	}

	componentWillUnmount() {
		PaintsStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		let paints		    = PaintsStore.getPaints();
		let flashMessage 	= PaintsStore.getStoreFlashMessage();
		let isAuthenticated = PaintsStore.isAuthenticated();
		let openRightPanel  = PaintsStore.showRightPanel();

		if (!isAuthenticated){
			this.context.router.push("/auth/login");
			return false;
		}

		this.setState({
			paints: paints,
			showRightPanel: !!openRightPanel,
			flashMessage: flashMessage !== undefined ? flashMessage : null,
			loader: false,
			mainPanelColumnCss: {
				'mobileWidth': openRightPanel ? mainShrinkedMobileColumnWidth : mainDefaultMobileColumnWidth,
				'desktopWidth': openRightPanel ? mainShrinkedDesktopColumnWidth : mainDefaultDesktopColumnWidth
			}
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
			case 'paints-list':
				mainPanelHtml =
					<ConfigurationPropertiesPaintList
						paints={ this.state.paints }
						loader={ this.state.loader }
					/>;
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

ConfigurationPropertiesDashboard.contextTypes = {
	router: PropTypes.object.isRequired
}

export default ConfigurationPropertiesDashboard;