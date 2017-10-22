import React from 'react';
import { PropTypes } from 'prop-types';
import PaintsAction from '../../../actions/paints-action';
import PaintsStore from '../../../stores/paints/store';
import MainPanel from '../../helper/panels/main';
import DisplayPanel from '../../helper/panels/display';
import RightPanel from '../../helper/panels/right';
import SettingsPaintsList from './../paints/list';
import SettingsPaint from './../paints/forms/paint';
import FlashMessage from '../../helper/flash_message';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';
let rightPanelMobileColumnWidth = 'col-xs-4';
let rightPanelDesktopColumnWidth = 'col-md-4';

class SettingsPaintsDashboard extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			paints: [],
			paint: this.getPaintState(),
			vendors: [],
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

		this._onChange 		 	= this._onChange.bind(this);
		this.onHandleFormSubmit = this.onHandleFormSubmit.bind(this);
		this.onHandleRightPanel = this.onHandleRightPanel.bind(this);
		this.setFlashMessage 	= this.setFlashMessage.bind(this);
		this.closeRightPanel 	= this.closeRightPanel.bind(this);
	}

	// Get paint initial state
	getPaintState() {
		return {
			id: '',
			vendor_id: '',
			brand: '',
			name: '',
			number: '',
			color: '',
			hex: '',
			rgb: '',
			notes: '',
			assets: []
		}
	}

	// Mounting component
	componentWillMount() {
		PaintsStore.addChangeListener(this._onChange);
		PaintsStore.unsetStoreFlashMessage();
	}

	// Mounted component
	componentDidMount() {
		PaintsAction.getPaintsAndVendors();
	}

	// Unmount component
	componentWillUnmount() {
		PaintsStore.removeChangeListener(this._onChange);
	}

	// Store change
	_onChange() {
		let paints		    = PaintsStore.getPaints();
		let vendors			= PaintsStore.getVendors();
		let flashMessage 	= PaintsStore.getStoreFlashMessage();
		let isAuthenticated = PaintsStore.isAuthenticated();
		let openRightPanel  = PaintsStore.showRightPanel();

		if (!isAuthenticated){
			this.context.router.push("/auth/forms/login");
			return false;
		}

		this.setState({
			paints: paints,
			vendors: vendors,
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
	onHandleFormSubmit(paint) {
		if (!this.state.isEditingMode) {
			PaintsAction.addPaint(paint);
		} else {
			PaintsAction.updatePaint(paint);
		}
	}

	// Handle right panel
	onHandleRightPanel(id) {
		let isEditingMode = !!id;
		let paint = isEditingMode ?
			this.state.paints.find(obj => obj.id === id) : this.getPaintState();


		this.setState({
			paint: paint,
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
		PaintsAction.removePaint(id);
	}

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

	// Render
	render() {
		// Main panel
		let mainPanelHtml =
			<DisplayPanel
				id="paints-list"
				header="Paints List"
				additionalHeader=""
				iconBtn="fa fa-plus"
				onClick={ this.onHandleRightPanel.bind(this, false) }
				showPreviousBtn={ false }
				previousRoute="">
				<SettingsPaintsList
					loader={ this.state.loader }
					paint={ this.state.paint }
					paints={ this.state.paints }
					onHandleRightPanel={ this.onHandleRightPanel }
					onHandleRemove={ this.onHandleRemove }
				/>
			</DisplayPanel>;

		// Right panel
		let rightPanelHtml = this.state.showRightPanel ?
			<DisplayPanel
				id="paint-form"
				header="Paint"
				additionalHeader={ !this.state.isEditingMode ? "Add" : "Edit" }
				iconBtn="fa fa-window-close"
				onClick={ this.closeRightPanel }
				showPreviousBtn={ false }
				previousRoute="">
				<SettingsPaint
					paint={ this.state.paint }
					vendors={ this.state.vendors }
					isEditingMode={ this.props.isEditingMode }
					onHandleFormSubmit={ this.onHandleFormSubmit }
					closeRightPanel={ this.closeRightPanel }
				/>
			</DisplayPanel> : null;

		return (
			<div className="row">
				{ !this.state.flashMessage ? null : <FlashMessage message={ this.state.flashMessage } alertType="alert-success"/>}

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

SettingsPaintsDashboard.contextTypes = {
	router: PropTypes.object.isRequired
};

export default SettingsPaintsDashboard;