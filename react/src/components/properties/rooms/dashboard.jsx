import React from 'react';
import _ from 'lodash';
import PropertyRoomsList from './list';
import PropertyRoomAdd from './add';
import PropertyStore from '../../../stores/properties/store';
import PropertiesRoomsAction from '../../../actions/properties-rooms-action';
import PropertyPaintsStore from '../../../stores/properties/store';
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
			property_id: this.props.state.property.id,
			room: {},
			rooms: this.props.state.rooms,
			paints: [],
			nonAddedRooms: [],
			disableAddWallsBtn: false,
			showRightPanel: false,
			flashMessage: null,
			loader: true,
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			}
		};

		this._onChange 		  	= this._onChange.bind(this);
		this.setFlashMessage  	= this.setFlashMessage.bind(this);
		this.closeRightPanel  	= this.closeRightPanel.bind(this);
		this.handleFormChange 	= this.handleFormChange.bind(this);
		this.onHandleRightPanel = this.onHandleRightPanel.bind(this);
		this.onHandleRemove   	= this.onHandleRemove(this);
		this.handleWallChange 	= this.handleWallChange.bind(this);
		this.setFlashMessage  	= this.setFlashMessage.bind(this);
		this.closeRightPanel  	= this.closeRightPanel.bind(this);
	}

	componentWillMount() {
		PropertyStore.addChangeListener(this._onChange);
		PropertyStore.unsetStoreFlashMessage();
	}

	componentDidMount() {
		PropertiesRoomsAction.getNonAddedRooms(this.state.property_id);
		//PropertiesPaintsAction.getPropertyPaints();
	}

	componentWillUnmount() {
		PropertyStore.removeChangeListener(this._onChange);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.location.action !== 'POP') {
			this.setState({
				showRightPanel: false,
				flashMessage: null,
				columnCss: {
					'mobileWidth': mainDefaultMobileColumnWidth,
					'desktopWidth': mainDefaultDesktopColumnWidth
				}
			});
		}
	}

	_onChange() {
		//let paints			= PropertyPaintsStore.getPropertyPaints();
		let nonAddedRooms	= PropertyStore.getNonAddedRooms();
		let flashMessage 	= PropertyStore.getStoreFlashMessage();
		let isAuthenticated = PropertyStore.isAuthenticated();
		let openRightPanel 	= PropertyStore.openRightPanel();

		if (!isAuthenticated){
			this.context.router.push("/auth/login");
			return false;
		}

		this.setState({
			//paints: paints,
			nonAddedRooms: nonAddedRooms,
			disableAddWallsBtn: false,
			showRightPanel: !!openRightPanel,
			flashMessage: flashMessage !== undefined ? flashMessage : null,
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

	// Handle right panel
	onHandleRightPanel(property, isEditingMode) {
		this.setState({
			property: property,
			isEditingMode: isEditingMode,
			showRightPanel: true,
			columnCss: {
				'mobileWidth': mainShrinkedMobileColumnWidth,
				'desktopWidth': mainShrinkedDesktopColumnWidth
			}
		});
	}

	onHandleRemove(id) {
		PropertiesRoomsAction.removeRoom(id);
	}

	// Handle appropriate action whenever wall fields are changed
	handleWallChange(walls, disableBtn) {
		let room = this.state.room;
		room['walls'] = walls;
		//@TODO
		room.push({walls: walls});
		this.setState({
			room: room,
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
				property_id: this.state.room.property_id
			}
		});

		return false;
	}

	render() {
		return (
			<div className="row">
				{ !this.state.flashMessage ? null : <FlashMessage message={ this.state.flashMessage } alertType="alert-success" />}

				<PropertyRoomsList
					state={ this.state }
					onHandleRightPanel={ onHandleRightPanel }
					onHandleRemove={ onHandleRemove }
					className="main-column"
				/>

				{
					this.state.showRightPanel ?
						/*<PropertyRoomAdd
							state={this.state}
							onChange={this._onChange}
							submit={this.handleFormSubmit}
							formChange={this.handleFormChange}
							wallChange={this.handleWallChange}
							closeRightPanel={this.closeRightPanel}
						/> */
						<PropertyExteriorFeaturesAdd
							state={ this.state }
							onHandleFormSubmit={ this.onHandleFormSubmit }
							closeRightPanel={ this.closeRightPanel }
						/>
						: null
				}
			</div>
		)
	}
}

PropertyRoomsDashboard.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default PropertyRoomsDashboard;