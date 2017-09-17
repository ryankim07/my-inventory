import React from 'react';
import _ from 'lodash';
import PropertyRoomsList from './list';
import PropertyRoomAdd from './add';
import PropertyRoomsStore from '../../../stores/properties/rooms-store';
import PropertiesRoomsAction from '../../../actions/properties-rooms-action';
import PropertyPaintsStore from '../../../stores/properties/paints-store';
import PropertiesPaintsAction from "../../../actions/properties-paints-action";
import FlashMessage from '../../helper/flash-message';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';

class PropertyRoomsDashboard extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			property_id: this.props.location.state.property_id,
			room: {
				id: '',
				property_id: this.props.location.state.property_id,
				name: '',
				total_area: '',
				description: '',
				walls: []
			},
			rooms: [],
			paints: [],
			nonAddedRooms: [],
			isEditingMode: false,
			newRoomAdded: false,
			disableAddWallsBtn: false,
			showRightPanel: false,
			flashMessage: null,
			loader: true,
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			}
		};

		this._onChange 		  = this._onChange.bind(this);
		this.setFlashMessage  = this.setFlashMessage.bind(this);
		this.closeRightPanel  = this.closeRightPanel.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleWallChange = this.handleWallChange.bind(this);
		this.setFlashMessage  = this.setFlashMessage.bind(this);
		this.closeRightPanel  = this.closeRightPanel.bind(this);
	}

	componentWillMount() {
		PropertyRoomsStore.addChangeListener(this._onChange);
		PropertyRoomsStore.unsetStoreFlashMessage();
	}

	componentDidMount() {
		PropertiesRoomsAction.getPropertyRooms(this.state.property_id);
		PropertiesRoomsAction.getNonAddedRooms(this.state.property_id);
		PropertiesPaintsAction.getPropertyPaints();
	}

	componentWillUnmount() {
		PropertyRoomsStore.removeChangeListener(this._onChange);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.location.action !== 'POP') {
			this.setState({
				columnCss: {
					'mobileWidth': mainDefaultMobileColumnWidth,
					'desktopWidth': mainDefaultDesktopColumnWidth
				},
				showRightPanel: false,
				flashMessage: null
			});
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		// Only redirect to list if new room is being added
		if (nextState.newRoomAdded || this.state.newRoomAdded) {
			PropertyRoomsStore.unFlagNewRoom();
			nextState.newRoomAdded = false;

			this.context.router.push({
				pathname: "/properties/rooms/dashboard",
				state: {
					property_id: this.state.property_id
				}
			});

			return false;
		}

		return true;
	}

	_onChange() {
		let rooms 	 		= PropertyRoomsStore.getRooms();
		let paints			= PropertyPaintsStore.getPropertyPaints();
		let nonAddedRooms	= PropertyRoomsStore.getNonAddedRooms();
		let isNewRoomAdded  = PropertyRoomsStore.isNewRoomAdded();
		let roomToUpdate    = PropertyRoomsStore.getRoomToUpdate();
		let flashMsg 		= PropertyRoomsStore.getStoreFlashMessage();
		let isAuthenticated = PropertyRoomsStore.isAuthenticated();
		let openRightPanel 	= PropertyRoomsStore.openRightPanel();
		let isEditingMode   = this.state.isEditingMode;
		let stateRoom       = this.state.room;

		if (!isAuthenticated){
			this.context.router.push("/auth/login");
			return false;
		}

		if (isNewRoomAdded) {
			stateRoom = {
				id: '',
				property_id: this.state.room.property_id,
				name: '',
				total_area: '',
				description: '',
				walls: []
			};
		}

		if (!_.every(_.values(roomToUpdate), function(v) {return !v;})) {
			stateRoom 	  = roomToUpdate;
			isEditingMode = true;
		}

		this.setState({
			room: stateRoom,
			rooms: rooms,
			paints: paints,
			nonAddedRooms: nonAddedRooms,
			isEditingMode: isEditingMode,
			newRoomAdded: isNewRoomAdded,
			disableAddWallsBtn: false,
			showRightPanel: !!openRightPanel,
			flashMessage: flashMsg !== undefined ? flashMsg : null,
			loader: false,
			columnCss: {
				'mobileWidth': openRightPanel ? mainShrinkedMobileColumnWidth : mainDefaultMobileColumnWidth,
				'desktopWidth': openRightPanel ? mainShrinkedDesktopColumnWidth : mainDefaultDesktopColumnWidth
			},
		});
	}

	handleFormChange(room) {
		this.setState({
			room: room
		});
	}

	// Handle appropriate action whenever wall fields are changed
	handleWallChange(walls, disableBtn) {
		this.setState({
			room: {
				id: this.state.room.id,
				property_id: this.state.room.property_id,
				name: this.state.room.name,
				total_area: this.state.room.total_area,
				description: this.state.room.description,
				walls: walls
			},
			disableAddWallsBtn: disableBtn
		});
	}

	setFlashMessage($msg) {
		this.setState({flashMessage: $msg})
	}

	closeRightPanel() {
		this.setState({
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			},
			showRightPanel: false
		});

		this.context.router.push({
			pathname: "/properties/rooms/dashboard",
			state: {
				property_id: this.state.property_id
			}
		});

		return false;
	}

	render() {
		return (
			<div className="row">
				{ !this.state.flashMessage ? null : <FlashMessage message={this.state.flashMessage} alertType="alert-success" />}
				<PropertyRoomsList
					state={ this.state }
					mobileWidth={this.state.columnCss.mobileWidth}
					desktopWidth={this.state.columnCss.desktopWidth}
					className="main-column" />
				{
					this.state.showRightPanel ? <PropertyRoomAdd
						state={this.state}
						onChange={this._onChange}
						submit={this.handleFormSubmit}
						formChange={this.handleFormChange}
						wallChange={this.handleWallChange}
						closeRightPanel={this.closeRightPanel}
					/> : null
				}
			</div>
		)
	}
}

PropertyRoomsDashboard.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default PropertyRoomsDashboard;