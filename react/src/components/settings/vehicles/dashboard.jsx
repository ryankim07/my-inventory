import React from 'react';
import _ from 'lodash';
import { PropTypes } from 'prop-types';
import ManufacturersAction from '../../../actions/manufacturers-action';
import ManufacturersStore from '../../../stores/vehicles/mfgs-store';
import MainPanel from '../../helper/panels/main';
import DisplayPanel from '../../helper/panels/display';
import RightPanel from '../../helper/panels/right';
import SettingsManufacturersList from './../vehicles/api/manufacturers';
import SettingsManufacturerModelsList from './../vehicles/api/models';
import FlashMessage from '../../helper/flash_message';

const mainDefaultMobileColumnWidth = 'col-xs-12';
const mainDefaultDesktopColumnWidth = 'col-md-12';
const mainShrinkedMobileColumnWidth = 'col-xs-8';
const mainShrinkedDesktopColumnWidth = 'col-md-8';
const rightPanelMobileColumnWidth = 'col-xs-4';
const rightPanelDesktopColumnWidth = 'col-md-4';

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
			mainPanel: this.props.match.params.section,
			showRightPanel: false,
			flashMessage: null,
			mainPanelColumnCss: {
				mobileWidth: mainDefaultMobileColumnWidth,
				desktopWidth: mainDefaultDesktopColumnWidth
			},
			rightPanelColumnCss: {
				mobileWidth: rightPanelMobileColumnWidth,
				desktopWidth: rightPanelDesktopColumnWidth
			}
		};

		this._onChange 		 	= this._onChange.bind(this);
		this.onChangePage       = this.onChangePage.bind(this);
		this.onHandleSync 		= this.onHandleSync.bind(this);
		this.onHandleMainPanel 	= this.onHandleMainPanel.bind(this);
		this.onHandleRightPanel = this.onHandleRightPanel.bind(this);
		this.setFlashMessage 	= this.setFlashMessage.bind(this);
		this.onCloseRightPanel 	= this.onCloseRightPanel.bind(this);
	}

	componentWillMount() {
		ManufacturersStore.addChangeListener(this._onChange);
		ManufacturersStore.removeStoreStatus();
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
			loader: false
		});
	}

	onChangePage(page) {
		ManufacturersAction.getManufacturers(page);
		this.onCloseRightPanel();
	}


	// Sync API
	onHandleSync() {
		ManufacturersAction.sync();
	}

	// Handle main panel
	onHandleMainPanel(id) {
		this.setState({
			mfg: _.find(this.state.manufacturers, ['id', id]),
			showRightPanel: true,
			mainPanelColumnCss: {
				mobileWidth: mainShrinkedMobileColumnWidth,
				desktopWidth: mainShrinkedDesktopColumnWidth
			}
		});
	}

	// Handle right panel
	onHandleRightPanel(id) {
		let model = _.find(this.state.mfg.models, ['id', id]);

		this.setState({
			model: model,
			showRightPanel: true,
			mainPanelColumnCss: {
				mobileWidth: mainShrinkedMobileColumnWidth,
				desktopWidth: mainShrinkedDesktopColumnWidth
			}
		});
	}

	// Close right panel
	onCloseRightPanel() {
		this.setState({
			showRightPanel: false,
			mainPanelColumnCss: {
				mobileWidth: mainDefaultMobileColumnWidth,
				desktopWidth: mainDefaultDesktopColumnWidth
			}
		});
	}

	// Set flash message
	setFlashMessage(msg) {
		this.setState({ flashMessage: msg });
	}

	render() {
		// Main panel
		let mainPanelHtml = '';

		switch (this.state.mainPanel) {
			case 'manufacturers':
				mainPanelHtml =
					<DisplayPanel
						id="api-manufacturers-list"
						header="API Vehicle List"
						additionalHeader=""
						iconBtn="fa fa-cloud-download"
						onClick={ this.onHandleSync.bind(this) }
						showPreviousBtn={ false }
						previousRoute="">
						<SettingsManufacturersList
							loader={ this.state.loader }
							page={ this.state.page }
							totalCount={ this.state.totalCount }
							totalPages={ this.state.totalPages }
							limit={ this.state.limit }
							selectedItem={ this.state.manufacturers.id }
							manufacturers={ this.state.manufacturers }
							onChange={ this.onChangePage }
							onSync={ this.onHandleSync }
							onHandleMainPanel={ this.onHandleMainPanel }/>
					</DisplayPanel>;
			break;
		}

		let rightPanelHtml = this.state.showRightPanel ?
			<DisplayPanel
				id="manufacturers-models-list"
				header={ this.state.mfg.mfg + " Models List" }
				additionalHeader=""
				iconBtn="fa fa-window-close"
				onClick={ this.onCloseRightPanel }
				showPreviousBtn={ false }
				previousRoute="">
				<SettingsManufacturerModelsList
					selectedItem={ this.state.model.id }
					models={ this.state.mfg.models }
					onHandleRightPanel={ this.onHandleRightPanel }
					onCloseRightPanel={ this.onCloseRightPanel }/>
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

SettingsVehiclesDashboard.contextTypes = {
	router: PropTypes.object.isRequired
};

export default SettingsVehiclesDashboard;