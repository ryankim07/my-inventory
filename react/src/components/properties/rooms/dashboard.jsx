import React from 'react';
import PropertyRoomsList from './list';
import PropertiesRoomsAction from '../../../actions/properties-rooms-action';
import PropertyPaintsStore from '../../../stores/properties/store';
import PropertiesPaintsAction from "../../../actions/properties-paints-action";
import PropertyAddFeatures from '../../../components/properties/info/add_features';
import PropertyAddExteriorFeatures from '../../../components/properties/info/add_exterior_features';
import PropertyAddInteriorFeatures from '../../../components/properties/info/add_interior_features';
import PropertyRoomForm from './forms/add';
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
			property: this.props.state.property,
			room: {},
			paints: [],
			disableAddWallsBtn: false,
			showRightPanel: false,
			flashMessage: null,
			loader: true,
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			}
		};

		this.setFlashMessage  	= this.setFlashMessage.bind(this);
		this.closeRightPanel  	= this.closeRightPanel.bind(this);
		this.handleFormChange 	= this.handleFormChange.bind(this);
		this.onHandleRightPanel = this.onHandleRightPanel.bind(this);
		this.onHandleRemove   	= this.onHandleRemove(this);
		this.handleWallChange 	= this.handleWallChange.bind(this);
		this.setFlashMessage  	= this.setFlashMessage.bind(this);
		this.closeRightPanel  	= this.closeRightPanel.bind(this);
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
		/*let room = this.state.room;
		room['walls'] = walls;
		//@TODO
		room.push({walls: walls});
		this.setState({
			room: room,
			disableAddWallsBtn: disableBtn
		});*/
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

	render() {
		return (
			<div className="row">
				{ !this.state.flashMessage ? null : <FlashMessage message={ this.state.flashMessage } alertType="alert-success" />}

				<PropertyRoomsList
					state={ this.state }
					onHandleRightPanel={ this.onHandleRightPanel }
					onHandleRemove={ this.onHandleRemove }
					className="main-column"
				/>

				{
					this.state.showRightPanel ?
						<PropertyRoomForm
							state={this.state}
							submit={this.handleFormSubmit}
							formChange={this.handleFormChange}
							wallChange={this.handleWallChange}
							closeRightPanel={this.closeRightPanel}
						/> :
						<PropertyAddExteriorFeatures
							state={ this.state }
							onHandleFormSubmit={ this.onHandleFormSubmit }
							closeRightPanel={ this.closeRightPanel }
						/>
				}
			</div>
		)
	}
}

PropertyRoomsDashboard.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default PropertyRoomsDashboard;