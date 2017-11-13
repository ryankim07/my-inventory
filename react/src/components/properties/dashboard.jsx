import React from 'react';
import _ from 'lodash';
import { PropTypes } from 'prop-types';
import PropertiesAction from '../../actions/properties-action';
import PropertiesStore from '../../stores/properties/store';
import MainPanel from '../helper/panels/main';
import RightPanel from '../helper/panels/right';
import CenterPanel from '../helper/panels/center';
import DisplayPanel from '../helper/panels/display';
import PropertyForm from './main/forms/property';
import PropertiesList from './address/list';
import PropertyInfoView from './info/view';
import PropertyFeaturesForm from './info/forms/features';
import PropertyRoomsList from './rooms/list';
import PropertyRoomForm from './rooms/forms/room';
import FlashMessage from '../helper/flash_message';
import { getSingleModifiedState, getNestedModifiedState } from "../helper/utils";
import { MAIN_DEFAULT_MOBILE_COLUMN_WIDTH, MAIN_DEFAULT_DESKTOP_COLUMN_WIDTH, MAIN_SHRINKED_MOBILE_COLUMN_WIDTH,
		 MAIN_SHRINKED_DESKTOP_COLUMN_WIDTH, CENTER_PANEL_MOBILE_COLUMN_WIDTH, CENTER_PANEL_DESKTOP_COLUMN_WIDTH,
		 RIGHT_PANEL_MOBILE_COLUMN_WIDTH, RIGHT_PANEL_DESKTOP_COLUMN_WIDTH, FEATURES_PANEL, EXTERIOR_FEATURES_PANEL,
		 INTERIOR_FEATURES_PANEL, ADD_PANEL, INFO_PANEL, ROOM_PANEL, LIST_PANEL } from '../helper/constants';

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
};

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
			centerPanel: '',
			rightPanel: '',
			flashMessage: null,
			alertType: 'success',
			mainPanelColumnCss: {
				mobileWidth: MAIN_DEFAULT_MOBILE_COLUMN_WIDTH,
				desktopWidth: MAIN_DEFAULT_DESKTOP_COLUMN_WIDTH
			},
			centerPanelColumnCss: {
				mobileWidth: CENTER_PANEL_MOBILE_COLUMN_WIDTH,
				desktopWidth: CENTER_PANEL_DESKTOP_COLUMN_WIDTH
			},
			rightPanelColumnCss: {
				mobileWidth: RIGHT_PANEL_MOBILE_COLUMN_WIDTH,
				desktopWidth: RIGHT_PANEL_DESKTOP_COLUMN_WIDTH
			}
		};

		this._onChange 		   	 = this._onChange.bind(this);
		this.onHandleFormChange  = this.onHandleFormChange.bind(this);
		this.onHandleRoomChange  = this.onHandleRoomChange.bind(this);
		this.onHandlePanel 		 = this.onHandlePanel.bind(this);
		this.onHandleRoomPanel   = this.onHandleRoomPanel.bind(this);
		this.onHandleSubmit 	 = this.onHandleSubmit.bind(this);
		this.setFlashMessage     = this.setFlashMessage.bind(this);
		this.onCloseRightPanel   = this.onCloseRightPanel.bind(this);
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
		if (nextProps.history.action === 'REPLACE' || nextProps.history.action === 'PUSH') {
			let mainPanel = null;

			switch (nextProps.location.pathname) {
				case '/properties/dashboard/add':
					mainPanel = ADD_PANEL;
				break;

				case '/properties/info/view':
					mainPanel = INFO_PANEL;
				break;

				default:
					mainPanel = LIST_PANEL;
			}

			this.setState({
				mainPanel: mainPanel,
				centerPanel: '',
				rightPanel: '',
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
		//let property		= PropertiesStore.getProperty();
		let properties		= PropertiesStore.getProperties();
		let paints          = PropertiesStore.getPaints();
		let storeStatus 	= PropertiesStore.getStoreStatus();
		let isAuthenticated = PropertiesStore.isAuthenticated();
		let rightPanel 		= PropertiesStore.showRightPanel();

		if (!isAuthenticated){
			this.context.router.history.push("/auth/forms/login");
			return false;
		}

		this.setState({
			//property: Object.keys(property).length === 0 ? { address: {} } : property,
			properties: properties,
			paints: paints,
			rightPanel: rightPanel,
			flashMessage: storeStatus.msg !== '' ? storeStatus.msg : null,
			alertType: storeStatus.type,
			loader: false,
			mainPanelColumnCss: {
				mobileWidth: rightPanel ? MAIN_SHRINKED_MOBILE_COLUMN_WIDTH : MAIN_DEFAULT_MOBILE_COLUMN_WIDTH,
				desktopWidth: rightPanel ? MAIN_SHRINKED_DESKTOP_COLUMN_WIDTH : MAIN_DEFAULT_DESKTOP_COLUMN_WIDTH
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

	// Handle main, center, or right panels
	onHandlePanel(id, mainPanel, centerPanel, rightPanel) {
		let mainPanelMobile = MAIN_DEFAULT_MOBILE_COLUMN_WIDTH;
		let mainPanelDesktop = MAIN_DEFAULT_DESKTOP_COLUMN_WIDTH;
		let isEditingMode = !!id;
		let property = {};

		if (!_.isEmpty(mainPanel)) {
			property = id === this.state.property.id ?
				this.state.property : _.find(this.state.properties, ['id', id]);
		} else {
			property = isEditingMode ?
				_.find(this.state.properties, ['id', id]) : initialPropertyObj;
		}

		if (!_.isEmpty(centerPanel) || !_.isEmpty(rightPanel)) {
			mainPanelMobile  = MAIN_SHRINKED_MOBILE_COLUMN_WIDTH;
			mainPanelDesktop = MAIN_SHRINKED_DESKTOP_COLUMN_WIDTH;
		}

		this.setState({
			property: property,
			mainPanel: mainPanel,
			centerPanel: centerPanel,
			rightPanel: rightPanel,
			isEditingMode: isEditingMode,
			mainPanelColumnCss: {
				mobileWidth: mainPanelMobile,
				desktopWidth: mainPanelDesktop
			}
		});
	}

	// Handle room right panel
	onHandleRoomPanel(id) {
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
			mainPanel: INFO_PANEL,
			centerPanel: LIST_PANEL,
			rightPanel: ROOM_PANEL,
			isEditingMode: isEditingMode,
			flashMessage: null,
			mainPanelColumnCss: {
				mobileWidth: MAIN_SHRINKED_MOBILE_COLUMN_WIDTH,
				desktopWidth: MAIN_SHRINKED_DESKTOP_COLUMN_WIDTH
			}
		});
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

	// Set flash message
	setFlashMessage($msg) {
		this.setState({flashMessage: $msg})
	}

	// Close right panel
	onCloseRightPanel() {
		this.setState({
			mainPanel: this.state.mainPanel,
			rightPanel: '',
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
				console.log('add panel');
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
				};
			break;

			case INFO_PANEL:
				console.log('info panel');
				mainPanelObjs = {
					id: "property-view",
					displayHeader: "Property Information",
					iconBtn: "fa fa-window-close",
					previousRoute: "/properties",
					subForm:
						<PropertyInfoView
							property={ this.state.property }
							onHandlePanel={ this.onHandlePanel }
						/>
				};
			break;

			default:
				mainPanelObjs = {
					id: "properties-main",
					displayHeader: "Properties List",
					iconBtn: "fa fa-plus",
					onClick: this.onHandlePanel.bind(this, '', '', ''),
					previousRoute: "",
					subForm:
						<PropertiesList
							loader={ this.state.loader }
							selectedItem={ this.state.property.id }
							properties={ this.state.properties }
							onHandlePanel={ this.onHandlePanel }
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

		// Center panel
		let centerPanelHtml = this.state.centerPanel !== '' ?
			<DisplayPanel
				id="rooms-main"
				header="Properties Rooms List"
				additionalHeader={ this.state.isEditingMode ? 'Add' : 'Edit' }
				iconBtn="fa fa-window-close"
				onClick={ this.onHandleRoomPanel.bind(this, false) }>
				<PropertyRoomsList
					selectedItem={ this.state.room.id }
					rooms={ this.state.property.rooms }
					onHandleRoomPanel={ this.onHandleRoomPanel }
					onSubmit={ this.onHandleSubmit }
					onRemove={ this.onHandleRemoveRoom }
				/>
			</DisplayPanel> : null;

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

		let rightPanelHtml = this.state.rightPanel !== '' && typeof(this.state.rightPanel) !== "boolean" ?
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
				<CenterPanel centerPanelColumnCss={ this.state.centerPanelColumnCss }>
					{ centerPanelHtml }
				</CenterPanel>
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