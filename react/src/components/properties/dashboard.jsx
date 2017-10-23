import React from 'react';
import { PropTypes } from 'prop-types'
import PropertiesAction from '../../actions/properties-action';
import PropertiesStore from '../../stores/properties/store';
import MainPanel from '../helper/panels/main';
import DisplayPanel from '../helper/panels/display';
import RightPanel from '../helper/panels/right';
import PropertyForm from './main/forms/property';
import PropertiesList from './main/list';
import PropertyInfoView from './info/view';
import PropertyFeaturesForm from './info/forms/features';
import PropertyExteriorFeaturesForm from './info/forms/exterior_features';
import PropertyInteriorFeaturesForm from './info/forms/interior_features';
import PropertyRoomsList from './rooms/list';
import PropertyRoomForm from './rooms/forms/room';
import FlashMessage from '../helper/flash_message';

// Global properties
let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';
let rightPanelMobileColumnWidth = 'col-xs-4';
let rightPanelDesktopColumnWidth = 'col-md-4';

class PropertiesDashboard extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			properties: [],
			property: {},
			room: {},
			paints: [],
			isEditingMode: false,
			loader: true,
			mainPanel: null,
			rightPanel: null,
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

		this._onChange 		   	 	= this._onChange.bind(this);
		this.onHandleFormSubmit 	= this.onHandleFormSubmit.bind(this);
		this.onHandleRightPanel 	= this.onHandleRightPanel.bind(this);
		this.onHandleRightRoomPanel = this.onHandleRightRoomPanel.bind(this);
		this.onHandleMainPanel 		= this.onHandleMainPanel.bind(this);
		this.setFlashMessage    	= this.setFlashMessage.bind(this);
		this.closeRightPanel    	= this.closeRightPanel.bind(this);
	}

	// Get room walls initial state
	getWallState() {
		return {
			id: '',
			room_id: '',
			paint_id: '',
			name: ''
		}
	}

	// Get room initial state
	getRoomState(propertyId) {
		return {
			id: '',
			property_id: propertyId,
			name: '',
			total_area: '',
			description: '',
			walls: [this.getWallState()],
			assets: []
		}
	}

	// Mounting component
	componentWillMount() {
		PropertiesStore.addChangeListener(this._onChange);
		PropertiesStore.unsetStoreFlashMessage();
	}

	// Mounted component
	componentDidMount() {
		PropertiesAction.getPropertiesAndPaints();
	}

	// Unmount component
	componentWillUnmount() {
		PropertiesStore.removeChangeListener(this._onChange);
	}

	// When component from same route are unmounting and need to remount
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.action === 'REPLACE' || nextProps.location.action === 'PUSH') {
			let mainPanel = null;

			switch (nextProps.location.pathname) {
				case '/properties/info/view':
					mainPanel = 'info';
				break;
			}

			this.setState({
				mainPanel: mainPanel,
				showRightPanel: false,
				flashMessage: null,
				mainPanelColumnCss: {
					'mobileWidth': mainDefaultMobileColumnWidth,
					'desktopWidth': mainDefaultDesktopColumnWidth
				}
			});
		}
	}

	// State changes
	_onChange() {
		let property		= PropertiesStore.getProperty();
		let properties		= PropertiesStore.getProperties();
		let paints          = PropertiesStore.getPaints();
		let flashMessage 	= PropertiesStore.getStoreFlashMessage();
		let isAuthenticated = PropertiesStore.isAuthenticated();
		let openRightPanel 	= PropertiesStore.showRightPanel();

		if (!isAuthenticated){
			this.context.router.push("/auth/forms/login");
			return false;
		}

		this.setState({
			property: Object.keys(property).length === 0 ? {address: {}} : property,
			properties: properties,
			paints: paints,
			showRightPanel: !!openRightPanel,
			flashMessage: flashMessage !== undefined ? flashMessage : null,
			loader: false,
			mainPanelColumnCss: {
				'mobileWidth': openRightPanel ? mainShrinkedMobileColumnWidth : mainDefaultMobileColumnWidth,
				'desktopWidth': openRightPanel ? mainShrinkedDesktopColumnWidth : mainDefaultDesktopColumnWidth
			},
		});
	}

	// Handle submit
	onHandleFormSubmit(obj, type) {
		obj.obj_type = type;

		switch (type) {
			case 'features':
			case 'exterior_features':
			case 'interior_features':
				PropertiesAction.updateProperty(obj);
			break;

			default:
				if (!this.state.isEditingMode) {
					PropertiesAction.addProperty(obj);
				} else {
					PropertiesAction.updateProperty(obj);
				}
		}
	}

	// Handle delete
	onHandleRemove(id) {
		PropertiesAction.removeProperty(id);
	}

	// Handle delete
	onHandleRemoveRoom(propertyId, roomId) {
		PropertiesAction.removePropertyRoom(propertyId, roomId);
	}

	// Handle main panel
	// ID will determine the state in which next panel should display
	onHandleMainPanel(id, panel) {
		let property = id === this.state.property.id ?
			this.state.property : this.state.properties.find(obj => obj.id === id);

		this.setState({
			property: property,
			mainPanel: panel,
			showRightPanel: false,
			mainPanelColumnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			}
		});
	}

	// Handle default right panel
	onHandleRightPanel(property, isEditingMode, rightPanel) {
		this.setState({
			property: property,
			rightPanel: rightPanel,
			isEditingMode: isEditingMode,
			showRightPanel: true,
			mainPanelColumnCss: {
				'mobileWidth': mainShrinkedMobileColumnWidth,
				'desktopWidth': mainShrinkedDesktopColumnWidth
			}
		});
	}

	// Handle room right panel
	onHandleRightRoomPanel(id) {
		let isEditingMode = !!id;

		// If a particular room is edited without submit and user selects
		// a new room to edit, we need to restore old room values.  Therefore,
		// we need to clone object to stop js original object reference
		let rooms = JSON.parse(JSON.stringify(this.state.property.rooms));

		// Instantiate new object or load existing object if found
		let room = isEditingMode ?
			rooms.find(obj => obj.id === id) : this.getRoomState(this.state.property.id);

		if (isEditingMode && room.walls.length === 0) {
			room.walls.push(this.getWallState());
		}

		this.setState({
			room: room,
			rightPanel: 'room',
			isEditingMode: isEditingMode,
			showRightPanel: true,
			flashMessage: null,
			mainPanelColumnCss: {
				'mobileWidth': mainShrinkedMobileColumnWidth,
				'desktopWidth': mainShrinkedDesktopColumnWidth
			}
		});
	}

	// Close right panel
	closeRightPanel() {
		this.setState({
			mainPanel: this.state.mainPanel,
			showRightPanel: false,
			mainPanelColumnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			}
		});
	}

	// Set flash message
	setFlashMessage($msg) {
		this.setState({flashMessage: $msg})
	}

	// Render
	render() {
		// Main panel
		let mainPanelHtml = '';
		let additionalHeader = this.state.isEditingMode ? 'Add' : 'Edit';

		switch (this.state.mainPanel) {
			case 'info':
				mainPanelHtml =
					<DisplayPanel
						id="property-view"
						header="Property Information"
						additionalHeader=""
						iconBtn="fa fa-window-close"
						onClick=""
						previousRoute="/properties">
						<PropertyInfoView
							property={ this.state.property }
							onHandleRightPanel={ this.onHandleRightPanel }
							onHandleMainPanel={ this.onHandleMainPanel }/>
					</DisplayPanel>;
			break;

			case 'rooms-list':
				mainPanelHtml =
					<DisplayPanel
						id="rooms-main"
						header="Properties Rooms List"
						additionalHeader=""
						iconBtn="fa fa-plus"
						onClick={ this.onHandleRightRoomPanel.bind(this, false) }
						previousRoute="/properties/info/view">
						<PropertyRoomsList
							property={ this.state.property }
							onHandleRightRoomPanel={ this.onHandleRightRoomPanel }
							onHandleFormSubmit={ this.onHandleFormSubmit }
							onHandleRemoveRoom={ this.onHandleRemoveRoom }/>
					</DisplayPanel>;
			break;

			default:
				mainPanelHtml =
					<DisplayPanel
						id="properties-main"
						header="Properties List"
						additionalHeader=""
						iconBtn="fa fa-plus"
						onClick={ this.handleRightPanel.bind(this, false) }
						previousRoute="">
						<PropertiesList
							loader={ this.state.loader }
							property={ this.state.property }
							properties={ this.state.properties }
							onHandleMainPanel={ this.onHandleMainPanel }
							onHandleRightPanel={ this.onHandleRightPanel }
							onHandleRemove={ this.onHandleRemove }/>
					</DisplayPanel>;
		}

		// Right panel
		let rightPanelHtml = '';

		switch (this.state.rightPanel) {
			case 'features':
				rightPanelHtml =
					<DisplayPanel
						id="features-form"
						header="Features"
						additionalHeader={ additionalHeader }
						iconBtn="fa fa-window-close"
						onClick={ this.closeRightPanel }
						previousRoute="">
						<PropertyFeaturesForm
							property={ this.state.property }
							onHandleFormSubmit={ this.onHandleFormSubmit }
							closeRightPanel={ this.closeRightPanel }/>
					</DisplayPanel>;
				break;

			case 'exterior-features':
				rightPanelHtml =
					<DisplayPanel
						id="exterior-features-form"
						header="Exterior Features"
						additionalHeader={ additionalHeader }
						iconBtn="fa fa-window-close"
						onClick={ this.props.closeRightPanel }
						previousRoute="">
						<PropertyExteriorFeaturesForm
							property={ this.state.property }
							onHandleFormSubmit={ this.onHandleFormSubmit }
							closeRightPanel={ this.closeRightPanel }/>
					</DisplayPanel>;
			break;

			case 'interior-features':
				rightPanelHtml =
					<DisplayPanel
						id="interior-features-form"
						header="Interior Features"
						additionalHeader={ additionalHeader }
						iconBtn="fa fa-window-close"
						onClick={ this.props.closeRightPanel }
						previousRoute="">
						<PropertyInteriorFeaturesForm
							property={ this.state.property }
							onHandleFormSubmit={ this.onHandleFormSubmit }
							closeRightPanel={ this.closeRightPanel }/>
					</DisplayPanel>;
			break;

			case 'room':
				rightPanelHtml =
					<DisplayPanel
						id="room-form"
						header="Room"
						additionalHeader={ additionalHeader }
						iconBtn="fa fa-window-close"
						onClick={ this.props.closeRightPanel }
						previousRoute="">
						<PropertyRoomForm
							room={ this.state.room }
							nonAddedRooms={ this.state.property.non_added_rooms }
							paints={ this.state.paints }
							isEditingMode={ this.props.isEditingMode }
							onHandleFormSubmit={ this.onHandleFormSubmit }
							closeRightPanel={ this.closeRightPanel }/>
					</DisplayPanel>;
			break;

			// Add new property default right panel
			default:
				rightPanelHtml =
					<DisplayPanel
						id="property-form"
						header="Property"
						additionalHeader={ additionalHeader }
						iconBtn="fa fa-window-close"
						onClick={ this.props.closeRightPanel }
						previousRoute="">
						<PropertyForm
							property={ this.state.property }
							isEditingMode={ this.state.isEditingMode }
							onHandleFormSubmit={ this.onHandleFormSubmit }
							closeRightPanel={ this.closeRightPanel }/>
					</DisplayPanel>;
		}

		rightPanelHtml = this.state.showRightPanel ? rightPanelHtml : null;

		return (
			<div className="row">
				{ !this.state.flashMessage ? null : <FlashMessage message={this.state.flashMessage } alertType="alert-success"/> }

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

PropertiesDashboard.contextTypes = {
	router: PropTypes.object.isRequired
};

export default PropertiesDashboard;