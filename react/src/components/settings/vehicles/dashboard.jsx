import React from 'react';
import { PropTypes } from 'prop-types';
import ManufacturersAction from '../../../actions/manufacturers-action';
import ManufacturersStore from '../../../stores/vehicles/mfgs-store';
import SettingsMainPanel from './../main_panel';
import SettingsRightPanel from './../right_panel';
import SettingsManufacturersList from './../vehicles/api/manufacturers';
import SettingsManufacturerModelsList from './../vehicles/api/models';
import FlashMessage from '../../helper/flash_message';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';
let rightPanelMobileColumnWidth = 'col-xs-4';
let rightPanelDesktopColumnWidth = 'col-md-4';

class SettingsVehiclesDashboard extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			page: 1,
			totalCount: 0,
			totalPages: 0,
			limit: 0,
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
		this.onChangePage       = this.onChangePage.bind(this);
		this.onHandleSync 		= this.onHandleSync.bind(this);
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
		ManufacturersAction.getManufacturers(1);
	}

	componentWillUnmount() {
		ManufacturersStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		let manufacturers = ManufacturersStore.getManufacturers();
		let page          = ManufacturersStore.getPage();
		let totalCount    = ManufacturersStore.getTotalCount();
		let totalPages 	  = ManufacturersStore.getTotalPages();
		let limit         = ManufacturersStore.getLimit();

		this.setState({
			manufacturers: manufacturers,
			page: page,
			totalCount: totalCount,
			totalPages: totalPages,
			limit: limit,
			loader: false,
			/*mainPanelColumnCss: {
				'mobileWidth': openRightPanel ? mainShrinkedMobileColumnWidth : mainDefaultMobileColumnWidth,
				'desktopWidth': openRightPanel ? mainShrinkedDesktopColumnWidth : mainDefaultDesktopColumnWidth
			}*/
		});
	}

	onChangePage(page) {
		ManufacturersAction.getManufacturers(page);
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
		let mainPanelHtml = '';

		switch (this.state.mainPanel) {
			case 'manufacturers':
				mainPanelHtml =
					<SettingsManufacturersList
						loader={ this.state.loader }
						page={ this.state.page }
						totalCount={ this.state.totalCount }
						totalPages={ this.state.totalPages }
						limit={ this.state.limit }
						manufacturers={ this.state.manufacturers }
						mfg={ this.state.mfg }
						onChangePage={ this.onChangePage }
						onHandleSync={ this.onHandleSync }
						onHandleMainPanel={ this.onHandleMainPanel }
					/>;
			break;
		}

		return (
			<div className="row">
				{ !this.state.flashMessage ? null : <FlashMessage message={ this.state.flashMessage } alertType="alert-success"/>}

				<SettingsMainPanel mainPanelColumnCss={ this.state.mainPanelColumnCss }>
					{ mainPanelHtml }
				</SettingsMainPanel>

				{
					this.state.showRightPanel ?
						<SettingsRightPanel rightPanelColumnCss={ this.state.rightPanelColumnCss }>
							<SettingsManufacturerModelsList
								mfg={ this.state.mfg.mfg }
								models={ this.state.mfg.models }
								model={ this.state.model }
								onHandleRightPanel={ this.onHandleRightPanel }
								closeRightPanel={ this.closeRightPanel }
							/>
						</SettingsRightPanel> : null
				}
			</div>
		)
	}
}

SettingsVehiclesDashboard.contextTypes = {
	router: PropTypes.object.isRequired
};

export default SettingsVehiclesDashboard;