import React from 'react';
import _ from 'lodash';
import { PropTypes } from 'prop-types';
import PaintsAction from '../../../actions/paints-action';
import PaintsStore from '../../../stores/paints/store';
import MainPanel from '../../helper/panels/main';
import DisplayPanel from '../../helper/panels/display';
import RightPanel from '../../helper/panels/right';
import SettingsPaintsList from './../paints/list';
import SettingsPaint from './../paints/forms/paint';
import FlashMessage from '../../helper/flash_message';

const mainDefaultMobileColumnWidth = 'col-xs-12';
const mainDefaultDesktopColumnWidth = 'col-md-12';
const mainShrinkedMobileColumnWidth = 'col-xs-8';
const mainShrinkedDesktopColumnWidth = 'col-md-8';
const rightPanelMobileColumnWidth = 'col-xs-4';
const rightPanelDesktopColumnWidth = 'col-md-4';

// Get paint initial state
const initialPaintObj = {
	id: '',
	brand: '',
	name: '',
	number: '',
	color: '',
	hex: '',
	rgb: '',
	notes: '',
	vendors: [],
	assets: []
};

class SettingsPaintsDashboard extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			paints: [],
			paint: initialPaintObj,
			vendors: [],
			isEditingMode: false,
			loader: true,
			mainPanel: this.props.params.section,
			showRightPanel: false,
			flashMessage: null,
			showModal: false,
			alertType: 'success',
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
		this.onHandleFormChange = this.onHandleFormChange.bind(this);
		this.onHandleSearch     = this.onHandleSearch.bind(this);
		this.onHandleSubmit     = this.onHandleSubmit.bind(this);
		this.onHandleRightPanel = this.onHandleRightPanel.bind(this);
		this.setFlashMessage 	= this.setFlashMessage.bind(this);
		this.onCloseRightPanel 	= this.onCloseRightPanel.bind(this);
		this.onCloseModal 		= this.onCloseModal.bind(this);
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

	// Un-mounting component
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
			showModal: false,
			mainPanelColumnCss: {
				mobileWidth: openRightPanel ? mainShrinkedMobileColumnWidth : mainDefaultMobileColumnWidth,
				desktopWidth: openRightPanel ? mainShrinkedDesktopColumnWidth : mainDefaultDesktopColumnWidth
			}
		});
	}

	// Handle right panel
	onHandleRightPanel(id) {
		let isEditingMode = !!id;
		let paint = isEditingMode ?
			this.state.paints.find(obj => obj.id === id) : initialPaintObj;


		this.setState({
			paint: paint,
			isEditingMode: isEditingMode,
			showRightPanel: true,
			mainPanelColumnCss: {
				mobileWidth: mainShrinkedMobileColumnWidth,
				desktopWidth: mainShrinkedDesktopColumnWidth
			}
		});
	}
	// Handle form change
	onHandleFormChange(paint) {
		this.setState({ paint: paint });
	}

	// Handle search
	onHandleSearch(paints) {
		this.setState({ paints: paints });
	}

	// Handle delete
	onHandleRemove(id) {
		PaintsAction.removePaint(id);
	}

	// Handle submit
	onHandleSubmit(event) {
		event.preventDefault();

		let paint = this.state.paint;

		if (!_.find(this.state.vendors, { "company": paint.vendor })) {
			this.setState({
				flashMessage: 'The vendor you entered is invalid.  Please choose an existing vendor or configure a new one.',
				alertType: 'danger'
			});

			return;
		}

		if (!this.state.isEditingMode) {
			PaintsAction.addPaint(paint);
		} else {
			PaintsAction.updatePaint(paint);
		}
	}

	// Close modal
	onCloseModal() {
		this.setState({
			showModal: false
		});
	}

	// Set flash message
	setFlashMessage(msg) {
		this.setState({flashMessage: msg});
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
					onRemove={ this.onHandleRemove }
					onSearch={ this.onHandleSearch }
					onHandleRightPanel={ this.onHandleRightPanel }
				/>
			</DisplayPanel>;

		// Right panel
		let rightPanelHtml = this.state.showRightPanel ?
			<DisplayPanel
				id="paint-form"
				header="Paint"
				additionalHeader={ !this.state.isEditingMode ? "Add" : "Edit" }
				iconBtn="fa fa-window-close"
				onClick={ this.onCloseRightPanel }
				showPreviousBtn={ false }
				previousRoute="">
				<SettingsPaint
					paint={ this.state.paint }
					vendors={ this.state.vendors }
					isEditingMode={ this.state.isEditingMode }
					onHandleSubmit={ this.onHandleSubmit }
					onCloseRightPanel={ this.onCloseRightPanel }
					onChange={ this.onHandleFormChange }
					onSubmit={ this.onHandleSubmit }
				/>
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

SettingsPaintsDashboard.contextTypes = {
	router: PropTypes.object.isRequired
};

export default SettingsPaintsDashboard;