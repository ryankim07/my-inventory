import React from 'react';
import PropertyRoomsList from './list';
import PropertyRoomAdd from './add';
import PropertyRoomsStore from '../../../stores/properties/rooms-store';
import PropertiesRoomsAction from '../../../actions/properties-rooms-action';
import PropertyPaintsStore from '../../../stores/properties/paints-store';
import PropertiesPaintsAction from "../../../actions/properties-paints-action";
import FlashMessage from '../../flash-message';

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
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			},
			disableAddWallsBtn: false,
			showRightPanel: false,
			flashMessage: null,
			loader: true
		};

		this._onChange 		  = this._onChange.bind(this);
		this.setFlashMessage  = this.setFlashMessage.bind(this);
		this.closeRightPanel  = this.closeRightPanel.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleWallChange = this.handleWallChange.bind(this);
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

	_onChange() {
		let rooms 	 		= PropertyRoomsStore.getRooms();
		let nonAddedRooms	= PropertyRoomsStore.getNonAddedRooms();
		let flashMsg 		= PropertyRoomsStore.getStoreFlashMessage();
		let isAuthenticated = PropertyRoomsStore.isAuthenticated();
		let openRightPanel 	= PropertyRoomsStore.openRightPanel();
		let paints			= PropertyPaintsStore.getPropertyPaints();

		if (!isAuthenticated){
			this.context.router.push("/auth/login");
			return false;
		}

		this.setState({
			rooms: rooms,
			paints: paints,
			nonAddedRooms: nonAddedRooms,
			columnCss: {
				'mobileWidth': openRightPanel ? mainShrinkedMobileColumnWidth : mainDefaultMobileColumnWidth,
				'desktopWidth': openRightPanel ? mainShrinkedDesktopColumnWidth : mainDefaultDesktopColumnWidth
			},
			showRightPanel: !!openRightPanel,
			flashMessage: flashMsg !== undefined ? flashMsg : null,
			loader: false
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

	render() {
		return (
			<div className="row">
				{ !this.state.flashMessage ? null : <FlashMessage message={this.state.flashMessage} alertType="alert-success" />}
				<PropertyRoomsList
					mobileWidth={this.state.columnCss.mobileWidth}
					desktopWidth={this.state.columnCss.desktopWidth}
					loader={this.state.loader}
					rooms={this.state.rooms}
					className="main-column" />
				{
					this.state.showRightPanel ? <PropertyRoomAdd
						room={this.state.room}
						paints={this.state.paints}
						disableAddWallsBtn={this.state.disableAddWallsBtn}
						nonAddedRooms={this.state.nonAddedRooms}
						handleFormChange={this.handleFormChange}
						handleWallChange={this.handleWallChange}
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