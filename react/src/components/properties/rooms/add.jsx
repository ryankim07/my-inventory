import React from 'react';
import _ from 'lodash';
import PropertyRoomsStore from '../../../stores/properties/rooms-store';
import PropertyRoomWalls from '../../../components/properties/rooms/walls';
import Loader from '../../loader';
import { numberFormat } from "../../helper/utils"

class PropertyRoomAdd extends React.Component
{
    constructor(props) {
        super(props);

        this._onChange 	      = this._onChange.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
		this.handleWallChange = this.handleWallChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.addWalls         = this.addWalls.bind(this);
    }

    componentWillMount() {
		PropertyRoomsStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
		PropertyRoomsStore.removeChangeListener(this._onChange);
		PropertyRoomsStore.unsetRoomToUpdate();
	}

    shouldComponentUpdate(nextProps, nextState) {
		// Only redirect to list if new room is being added
        /*if (nextState.newRoomAdded || this.state.newRoomAdded) {
			PropertyRoomsStore.unFlagNewRoom();
			nextState.newRoomAdded = false;
			this.context.router.push({
				pathname: "/properties/rooms/dashboard",
				state: {
					property_id: this.state.room.property_id
				}
			});

			return false;
		}*/

		return true;
    }

    // Listen to changes in store, update it's own state
    _onChange() {
    	/*let addingNewRoom   = PropertyRoomsStore.isNewRoomAdded();
		let roomToUpdate    = PropertyRoomsStore.getRoomToUpdate();
		let isEditingMode   = this.state.isEditingMode;
		let stateRoom       = this.state.room;
		let flashMsg        = PropertyRoomsStore.getStoreFlashMessage();
		let isAuthenticated = PropertyRoomsStore.isAuthenticated();

		if (!isAuthenticated){
			this.context.router.push("/auth/login");
			return false;
		}

		if (!_.every(_.values(roomToUpdate), function(v) {return !v;})) {
			stateRoom = roomToUpdate;
			isEditingMode = true;
		}

		this.setState({
		    room: stateRoom,
			isEditingMode: isEditingMode,
			newRoomAdded: addingNewRoom,
			loader: false,
			flashMessage: flashMsg !== undefined ? flashMsg : null,
			disableAddWallsBtn: this.state.disableAddWallsBtn
		});*/
    }

	// Submit
	handleFormSubmit(event) {
		event.preventDefault();

		if (!this.state.isEditingMode) {
			PropertyRoomsAction.addRoom(this.state.room);
		} else {
			PropertyRoomsAction.updateRoom(this.state.room);

			// Close the panel
			this.props.closeRightPanel();
		}
	}

	// Handle input changes
	handleFormChange(propertyName, event) {
		let room        = this.props.room;
		let chosenValue = event.target.value;

		switch (propertyName) {
			case 'total_area':
				if (chosenValue === 0) {
					alert('Please enter correct total area.');
				} else {
					room[propertyName] = numberFormat(chosenValue);
				}
				break;

			default:
				room[propertyName] = chosenValue;
		}

		this.props.handleFormChange(room);
	}

    // Handle appropriate action whenever wall fields are changed
	handleWallChange(walls) {
		let totalWalls = walls.length;
		let filledFields = 0;

		walls.map((wall, index) => {
			if (wall.name === "all" || index === 4) {
				filledFields = 0;
			} else if (wall.name !== "" && wall.paint_id !== "") {
				filledFields++;
			}
		});

		let disableBtn = !!filledFields === totalWalls;

		this.props.handleWallChange(walls, disableBtn);
	}

	// Add new wall div
    addWalls(event) {
    	event.preventDefault();
		let walls = this.props.room.walls;
		let newWall   = {
			name: '',
			paint_id: ''
		};

		walls.push(newWall);

		this.props.handleWallChange(walls,  true);
	}

	render() {
    	const disableAddWallsBtn = this.props.disableAddWallsBtn;

		let addWallsSection = this.props.room.walls.map((wall, index) => {
			return (
				<PropertyRoomWalls
					key={index} index={index}
					walls={this.props.room.walls}
					handleWallChange={this.handleWallChange}
					paints={this.props.paints}
				/>
			);
		});

		let roomsOptions = this.props.nonAddedRooms.map((rooms, roomIndex) => {
			return (
				<option key={roomIndex} value={rooms.value}>{ rooms.title }</option>
			);
		});

		let roomForm = <form onSubmit={this.handleFormSubmit}>
			<div className="form-group required">
				<div className="col-xs-12 col-md-8">
					<label className="control-label">Room Name</label>
					<div className="input-group">
						<select ref="name"
								onChange={this.handleFormChange.bind(this, 'name')}
								value={this.props.room.name}
								className="form-control input-sm"
								required="required">
							<option value="">Select One</option>
							{ roomsOptions }
						</select>
					</div>
				</div>
			</div>
			<div className="form-group">
				<div className="col-xs-12 col-md-8">
					<label className="control-label">Total Area</label>
					<div className="input-group">
						<input type="text"
							   ref="total_area"
							   onChange={this.handleFormChange.bind(this, 'total_area')}
							   value={this.props.room.total_area}
							   className="form-control input-sm"/>
					</div>
				</div>
			</div>

			<div className="walls">
				{ addWallsSection }
				{ disableAddWallsBtn === false ? <button onClick={this.addWalls}><i className="fa fa-plus"></i> Walls</button> : '' }
			</div>

			<div className="form-group">
				<div className="col-xs-12 col-md-8">
					<label className="control-label">Description</label>
					<div className="input-group">
							<textarea ref="description"
									  rows="5"
									  className="form-control">
							</textarea>
					</div>
				</div>
			</div>
			<div className="form-group">
				<div className="col-xs-12 col-md-8">
					<div className="input-group">
						<input type="hidden" ref="id" value={this.props.room.id} />
						<input type="hidden" ref="property_id" value={this.props.room.property_id} />
					</div>
				</div>
			</div>
			<div className="form-group">
				<div className="col-xs-12 col-md-12">
					<div className="clearfix">
						<input type="submit" value="Submit" className="btn"/>
					</div>
				</div>
			</div>
		</form>

        return (
            <div className="col-xs-4 col-md-4" id="room-add">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>Add Room</span>
                                </div>
                                <div className="col-xs-2 col-md-2">
                                    <button onClick={this.props.closeRightPanel} className="close close-viewer" value="Close"><span>&times;</span></button>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">
                            { roomForm }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PropertyRoomAdd.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default PropertyRoomAdd;