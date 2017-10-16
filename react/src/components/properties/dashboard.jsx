import React from 'react';
import { PropTypes } from 'prop-types'
import PropertiesAction from '../../actions/properties-action';
import PropertiesStore from '../../stores/properties/store';
import PropertiesMainPanel from './main_panel';
import PropertiesRightPanel from './right_panel';
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

	componentWillMount() {
		PropertiesStore.addChangeListener(this._onChange);
		PropertiesStore.unsetStoreFlashMessage();
	}

	componentDidMount() {
		PropertiesAction.getPropertiesAndPaints();
	}

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

		if (!this.state.isEditingMode) {
			PropertiesAction.addProperty(obj);
		} else {
			PropertiesAction.updateProperty(obj);
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

	// Handle right panel
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

	// Handle add and edit from rooms list
	onHandleRightRoomPanel(id) {
		let isEditingMode = !!id;

		// If a particular room is edited without submit and user selects
		// a new room to edit, we need to restore old room values.  Therefore,
		// we need to clone object to stop js original object reference
		let rooms = JSON.parse(JSON.stringify(this.state.property.rooms));

		let wallObj  = {
			id: '',
			room_id: '',
			paint_id: '',
			name: ''
		};

		// Instantiate new object or load existing object if found
		let room = isEditingMode ?
			rooms.find(obj => obj.id === id) :
			{
				id: '',
				property_id: this.state.property.id,
				name: '',
				total_area: '',
				description: '',
				walls: [wallObj],
				room_assets: []
			};

		if (isEditingMode && room.walls.length === 0) {
			room.walls.push(wallObj);
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

		switch (this.state.mainPanel) {
			case 'info':
				mainPanelHtml =
					<PropertyInfoView
						property={ this.state.property }
						onHandleRightPanel={ this.onHandleRightPanel }
						onHandleMainPanel={ this.onHandleMainPanel }
					/>;
			break;

			case 'rooms-list':
				mainPanelHtml =
					<PropertyRoomsList
						property={ this.state.property }
						onHandleRightRoomPanel={ this.onHandleRightRoomPanel }
						onHandleFormSubmit={ this.onHandleFormSubmit }
						onHandleRemoveRoom={ this.onHandleRemoveRoom }
					/>;
			break;

			default:
				mainPanelHtml =
					<PropertiesList
						loader={ this.state.loader }
						property={ this.state.property }
						properties={ this.state.properties }
						onHandleMainPanel={ this.onHandleMainPanel }
						onHandleRightPanel={ this.onHandleRightPanel }
						onHandleRemove={ this.onHandleRemove }
					/>;
		}

		// Right panel
		let rightPanelHtml = '';

		switch (this.state.rightPanel) {
			case 'features':
				rightPanelHtml =
					<PropertyFeaturesForm
						property={ this.state.property }
						isEditingMode={ this.state.isEditingMode }
						onHandleFormSubmit={ this.onHandleFormSubmit }
						closeRightPanel={ this.closeRightPanel }
					/>;
				break;

			case 'exterior-features':
				rightPanelHtml =
					<PropertyExteriorFeaturesForm
						property={ this.state.property }
						isEditingMode={ this.state.isEditingMode }
						onHandleFormSubmit={ this.onHandleFormSubmit }
						closeRightPanel={ this.closeRightPanel }
					/>;
			break;

			case 'interior-features':
				rightPanelHtml =
					<PropertyInteriorFeaturesForm
						property={ this.state.property }
						isEditingMode={ this.state.isEditingMode }
						onHandleFormSubmit={ this.onHandleFormSubmit }
						closeRightPanel={ this.closeRightPanel }
					/>;
			break;

			case 'room':
				rightPanelHtml =
					<PropertyRoomForm
						room={ this.state.room }
						nonAddedRooms={ this.state.property.non_added_rooms }
						paints={ this.state.paints }
						isEditingMode={ this.state.isEditingMode }
						onHandleFormSubmit={ this.onHandleFormSubmit }
						closeRightPanel={ this.closeRightPanel }
					/>;
			break;

			// Add new property default right panel
			default:
				rightPanelHtml =
					<PropertyForm
						property={ this.state.property }
						isEditingMode={ this.state.isEditingMode }
						onHandleFormSubmit={ this.onHandleFormSubmit }
						closeRightPanel={ this.closeRightPanel }
					/>;
		}

		return (
			<div className="row">
				{ !this.state.flashMessage ? null : <FlashMessage message={this.state.flashMessage } alertType="alert-success"/>}

				<PropertiesMainPanel mainPanelColumnCss={ this.state.mainPanelColumnCss }>
					{ mainPanelHtml }
				</PropertiesMainPanel>

				{
					this.state.showRightPanel ?
						<PropertiesRightPanel rightPanelColumnCss={ this.state.rightPanelColumnCss }>
							{ rightPanelHtml }
						</PropertiesRightPanel> : null
				}
			</div>
		)
	}
}

PropertiesDashboard.contextTypes = {
	router: PropTypes.object.isRequired
};

export default PropertiesDashboard;