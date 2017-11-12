import React from 'react';
import _ from 'lodash';
import { PropTypes } from 'prop-types'
import PropertiesAction from '../../actions/properties-action';
import PropertiesStore from '../../stores/properties/store';
import MainPanel from '../helper/panels/main';
import DisplayPanel from '../helper/panels/display';
import RightPanel from '../helper/panels/right';
import PropertyForm from './main/forms/property';
import PropertiesList from './address/list';
import PropertyInfoView from './info/view';
import PropertyFeaturesForm from './info/forms/features';
import PropertyRoomsList from './rooms/list';
import PropertyRoomForm from './rooms/forms/room';
import FlashMessage from '../helper/flash_message';
import { getSingleModifiedState, getNestedModifiedState } from "../helper/utils";
import { MAIN_DEFAULT_MOBILE_COLUMN_WIDTH,
		 MAIN_DEFAULT_DESKTOP_COLUMN_WIDTH,
		 MAIN_SHRINKED_MOBILE_COLUMN_WIDTH,
		 MAIN_SHRINKED_DESKTOP_COLUMN_WIDTH,
		 RIGHT_PANEL_MOBILE_COLUMN_WIDTH,
		 RIGHT_PANEL_DESKTOP_COLUMN_WIDTH,
		 FEATURES_PANEL,
		 EXTERIOR_FEATURES_PANEL,
		 INTERIOR_FEATURES_PANEL,
		 ADD_PANEL,
		 INFO_PANEL,
		 ROOM_PANEL,
		 ROOMS_LIST } from '../helper/constants';

// Get room walls initial state
const initialWallObj = {
	id: '',
	room_id: '',
	paint_id: '',
	name: ''
};

const initialRoomObj = {
	id: '',
	property_id: '',
	name: '',
	total_area: '',
	description: '',
	walls: [initialWallObj],
	assets: []
}

// Get property initial state
const initialPropertyObj = {
	id: '',
	style: '',
	beds: '',
	baths: '',
	finished_area: '',
	unfinished_area: '',
	total_area: '',
	floors: '',
	built: '',
	parcel_number: '',
	address: {
		id: '',
		property_id: '',
		street: '',
		city: '',
		state: '',
		zip: '',
		county: '',
		country: '',
		subdivision: ''
	},
	features: {},
	exteriorFeatures: {},
	interiorFeatures: {},
	rooms: [],
	assets: []
};

// Header and ID for features form
const content = {
	'features': {
		id: 'features-form',
		header: 'Features'
	},
	'exterior_features': {
		id: 'exterior-features-form',
		header: 'Exterior Features'
	},
	'interior_features': {
		id: 'interior-features-form',
		header: 'Interior Features'
	}
};

class PropertiesDashboard extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			properties: [],
			property: initialPropertyObj,
			room: {},
			paints: [],
			isEditingMode: false,
			loader: true,
			mainPanel: this.props.match.params.section,
			rightPanel: false,
			showRightPanel: false,
			flashMessage: null,
			alertType: 'success',
			mainPanelColumnCss: {
				mobileWidth: MAIN_DEFAULT_MOBILE_COLUMN_WIDTH,
				desktopWidth: MAIN_DEFAULT_DESKTOP_COLUMN_WIDTH
			},
			rightPanelColumnCss: {
				mobileWidth: RIGHT_PANEL_MOBILE_COLUMN_WIDTH,
				desktopWidth: RIGHT_PANEL_DESKTOP_COLUMN_WIDTH
			}
		};

		this._onChange 		   	 	= this._onChange.bind(this);
		this.onHandleFormChange 	= this.onHandleFormChange.bind(this);
		this.onHandleRoomChange     = this.onHandleRoomChange.bind(this);
		this.onHandleSubmit 		= this.onHandleSubmit.bind(this);
		this.onHandleRightPanel 	= this.onHandleRightPanel.bind(this);
		this.onHandleRightRoomPanel = this.onHandleRightRoomPanel.bind(this);
		this.onHandleMainPanel 		= this.onHandleMainPanel.bind(this);
		this.setFlashMessage    	= this.setFlashMessage.bind(this);
		this.onCloseRightPanel    	= this.onCloseRightPanel.bind(this);
	}

	// Mounting component
	componentWillMount() {
		PropertiesStore.addChangeListener(this._onChange);
		PropertiesStore.removeStoreStatus();

		if (this.props.match.params.section === "add") {
			this.setState({
				mainPanel: this.props.match.params.section,
				mainPanelColumnCss: {
					mobileWidth: RIGHT_PANEL_MOBILE_COLUMN_WIDTH,
					desktopWidth: RIGHT_PANEL_DESKTOP_COLUMN_WIDTH
				}
			});
		}
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
				case '/properties/dashboard/add':
					mainPanel = ADD_PANEL;
				break;

				case '/properties/info/view':
					mainPanel = INFO_PANEL;
				break;
			}

			this.setState({
				mainPanel: mainPanel,
				showRightPanel: false,
				flashMessage: null,
				mainPanelColumnCss: {
					mobileWidth: MAIN_DEFAULT_MOBILE_COLUMN_WIDTH,
					desktopWidth: MAIN_DEFAULT_DESKTOP_COLUMN_WIDTH
				}
			});
		}
	}

	// State changes
	_onChange() {
		let property		= PropertiesStore.getProperty();
		let properties		= PropertiesStore.getProperties();
		let paints          = PropertiesStore.getPaints();
		let storeStatus 	= PropertiesStore.getStoreStatus();
		let isAuthenticated = PropertiesStore.isAuthenticated();
		let openRightPanel 	= PropertiesStore.showRightPanel();

		if (!isAuthenticated){
			this.context.router.history.push("/auth/forms/login");
			return false;
		}

		this.setState({
			property: Object.keys(property).length === 0 ? { address: {} } : property,
			properties: properties,
			paints: paints,
			showRightPanel: !!openRightPanel,
			flashMessage: storeStatus.msg !== '' ? storeStatus.msg : null,
			alertType: storeStatus.type,
			loader: false,
			mainPanelColumnCss: {
				mobileWidth: openRightPanel ? MAIN_SHRINKED_MOBILE_COLUMN_WIDTH : MAIN_DEFAULT_MOBILE_COLUMN_WIDTH,
				desktopWidth: openRightPanel ? MAIN_SHRINKED_DESKTOP_COLUMN_WIDTH : MAIN_DEFAULT_DESKTOP_COLUMN_WIDTH
			},
		});
	}

	// Handle form change
	onHandleFormChange(property) {
		this.setState({ property: property });
	}

	onHandleRoomChange(room) {
		this.setState({ room: room });
	}

	// Handle delete
	onHandleRemove(id) {
		PropertiesAction.removeProperty(id);
	}

	// Handle delete
	onHandleRemoveRoom(propertyId, roomId) {
		PropertiesAction.removePropertyRoom(propertyId, roomId);
	}

	// Handle submit
	onHandleSubmit(obj, type) {
		obj.obj_type = type;

		switch (type) {
			case FEATURES_PANEL:
			case EXTERIOR_FEATURES_PANEL:
			case INTERIOR_FEATURES_PANEL:
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

	// Handle main panel
	// ID will determine the state in which next panel should display
	onHandleMainPanel(id, panel) {
		let property = id === this.state.property.id ?
			this.state.property : _.find(this.state.properties, ['id', id]);

		this.setState({
			property: property,
			mainPanel: panel,
			showRightPanel: false,
			mainPanelColumnCss: {
				mobileWidth: MAIN_DEFAULT_MOBILE_COLUMN_WIDTH,
				desktopWidth: MAIN_DEFAULT_DESKTOP_COLUMN_WIDTH
			}
		});
	}

	// Handle default right panel
	onHandleRightPanel(id, rightPanel) {
		let isEditingMode = !!id;
		let property = isEditingMode ?
			_.find(this.state.properties, ['id', id]) : initialPropertyObj;

		this.setState({
			property: property,
			rightPanel: rightPanel,
			isEditingMode: isEditingMode,
			showRightPanel: true,
			mainPanelColumnCss: {
				mobileWidth: MAIN_SHRINKED_MOBILE_COLUMN_WIDTH,
				desktopWidth: MAIN_SHRINKED_DESKTOP_COLUMN_WIDTH
			}
		});
	}

	// Handle room right panel
	onHandleRightRoomPanel(id) {
		let isEditingMode = !!id;

		// If a particular room is edited without submit and user selects
		// a new room to edit, we need to restore old room values.  Therefore,
		// we need to clone object to stop js original object reference
		let rooms = getNestedModifiedState(this.state.property.rooms, this.state.property.rooms);

		// Instantiate new object or load existing object if found
		let room = isEditingMode ?
			_.find(rooms, ['id', id]) : getSingleModifiedState(initialRoomObj, 'property_id', this.state.property.id);

		if (isEditingMode && room.walls.length === 0) {
			room.walls.push(initialWallObj);
		}

		this.setState({
			room: room,
			rightPanel: ROOM_PANEL,
			isEditingMode: isEditingMode,
			showRightPanel: true,
			flashMessage: null,
			mainPanelColumnCss: {
				mobileWidth: MAIN_SHRINKED_MOBILE_COLUMN_WIDTH,
				desktopWidth: MAIN_SHRINKED_DESKTOP_COLUMN_WIDTH
			}
		});
	}

	// Set flash message
	setFlashMessage($msg) {
		this.setState({flashMessage: $msg})
	}

	// Close right panel
	onCloseRightPanel() {
		this.setState({
			mainPanel: this.state.mainPanel,
			showRightPanel: false,
			mainPanelColumnCss: {
				mobileWidth: MAIN_DEFAULT_MOBILE_COLUMN_WIDTH,
				desktopWidth: MAIN_DEFAULT_DESKTOP_COLUMN_WIDTH
			}
		});
	}

	// Render
	render() {
		// Main panel
		let mainPanelObjs = {};

		switch (this.state.mainPanel) {
			case ADD_PANEL:
				mainPanelObjs = {
					id: "property-form",
					displayHeader: "Property",
					iconBtn: "",
					subForm:
						<PropertyForm
							loader={false}
							property={this.state.property}
							onChange={this.onHandleFormChange}
							onSubmit={this.onHandleSubmit}
						/>
				}
			break;

			case INFO_PANEL:
				mainPanelObjs = {
					id: "property-view",
					displayHeader: "Property Information",
					iconBtn: "fa fa-window-close",
					previousRoute: "/properties" + this.state.property.id,
					subForm:
						<PropertyInfoView
							property={ this.state.property }
							onHandleRightPanel={ this.onHandleRightPanel }
							onMainPanel={ this.onHandleMainPanel }
						/>
				};
			break;

			case ROOMS_LIST:
				mainPanelObjs = {
					id: "rooms-main",
					displayHeader: "Properties Rooms List",
					iconBtn: "fa fa-plus",
					onClick: this.onHandleRightRoomPanel.bind(this, false),
					previousRoute: "/properties/dashboard/info",
					subForm:
						<PropertyRoomsList
							selectedItem={ this.state.room.id }
							rooms={ this.state.property.rooms }
							onHandleRightRoomPanel={ this.onHandleRightRoomPanel }
							onSubmit={ this.onHandleSubmit }
							onRemove={ this.onHandleRemoveRoom }
						/>
				};
			break;

			default:
				mainPanelObjs = {
					id: "properties-main",
					displayHeader: "Properties List",
					iconBtn: "fa fa-plus",
					onClick: this.onHandleRightPanel.bind(this, false),
					previousRoute: "",
					subForm:
						<PropertiesList
							loader={ this.state.loader }
							selectedItem={ this.state.property.id }
							properties={ this.state.properties }
							onMainPanel={ this.onHandleMainPanel }
							onRightPanel={ this.onHandleRightPanel }
							onRemove={ this.onHandleRemove }
						/>
				};
		}

		let mainPanelHtml =
			<DisplayPanel
				id={ mainPanelObjs.id }
				header={ mainPanelObjs.header }
				additionalHeader={ mainPanelObjs.additionalHeader }
				iconBtn={ mainPanelObjs.iconBtn }
				onClick={ mainPanelObjs.onClick }
				previousRoute={ mainPanelObjs.previousRoute }>
				{ mainPanelObjs.subForm }
			</DisplayPanel>;

		// Right panel
		let rightPanelObjs = {};

		switch (this.state.rightPanel) {
			case FEATURES_PANEL:
			case EXTERIOR_FEATURES_PANEL:
			case INTERIOR_FEATURES_PANEL:
				rightPanelObjs = {
					id: content[this.state.rightPanel]['id'],
					header: content[this.state.rightPanel]['header'],
					subForm:
						<PropertyFeaturesForm
							property={ this.state.property }
							featuresType={ this.state.rightPanel }
							onChange={ this.onHandleFormChange }
							onSubmit={ this.onHandleSubmit }
						/>
				};
			break;

			case ROOM_PANEL:
				rightPanelObjs = {
					id: "room-form",
					header: "Room",
					subForm:
						<PropertyRoomForm
							room={ this.state.room }
							nonAddedRooms={ this.state.property.non_added_rooms }
							paints={ this.state.paints }
							isEditingMode={ this.state.isEditingMode }
							onChange={ this.onHandleRoomChange }
							onSubmit={ this.onHandleSubmit }
						/>
				};
			break;

			// Add new property default right panel
			default:
				rightPanelObjs = {
					id: "property-form",
					header: "Property",
					subForm:
						<PropertyForm
							loader={false}
							property={ this.state.property }
							onChange={ this.onHandleFormChange }
							onSubmit={ this.onHandleSubmit }
						/>
				};
		}

		let rightPanelHtml = this.state.showRightPanel ?
			<DisplayPanel
				id={ rightPanelObjs.id }
				header={ rightPanelObjs.header }
				additionalHeader={ this.state.isEditingMode ? 'Add' : 'Edit' }
				iconBtn="fa fa-window-close"
				onClick={ this.onCloseRightPanel }
				previousRoute="">
				{ rightPanelObjs.subForm }
			</DisplayPanel> : null;

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

PropertiesDashboard.contextTypes = {
	router: PropTypes.object.isRequired
};

export default PropertiesDashboard;