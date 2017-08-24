import React from 'react';
import _ from 'lodash';
import PropertyRoomsStore from '../../../stores/properties/rooms-store';
import PropertyRoomsAction from '../../../actions/properties-rooms-action';
import PropertyRoomWalls from '../../../components/properties/rooms/walls';
import Loader from '../../loader';
import { numberFormat, upperFirstLetter } from "../../helper/utils"

class PropertyRoomAdd extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            room: {
                id: '',
                property_id: this.props.location.state.property_id,
                name: '',
                total_area: '',
				description: '',
				walls: []
            },
			disableAddWallsBtn: false,
			nonAddedRooms: [],
			isEditingMode: false,
            newRoomAdded: false,
			loader: true,
			flashMessage: null
        };

        this._onChange 	      = this._onChange.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
		this.handleWallChange = this.handleWallChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.addWalls         = this.addWalls.bind(this);
    }

    componentWillMount() {
		PropertyRoomsStore.addChangeListener(this._onChange);
    }

	componentDidMount() {
		PropertyRoomsAction.getNonAddedRooms(this.state.room.property_id);
	}

    componentWillUnmount() {
		PropertyRoomsStore.removeChangeListener(this._onChange);
		PropertyRoomsStore.unsetRoomToUpdate();
	}

    shouldComponentUpdate(nextProps, nextState) {
		// Only redirect to list if new room is being added
        if (nextState.newRoomAdded || this.state.newRoomAdded) {
			PropertyRoomsStore.unFlagNewRoom();
			nextState.newRoomAdded = false;

			this.context.router.push({
				pathname: "/properties/rooms/dashboard",
				state: {property_id: this.state.room.property_id}
			});

			return false;
		}

		return true;
    }

    // Listen to changes in store, update it's own state
    _onChange() {
    	let addingNewRoom   = PropertyRoomsStore.isNewRoomAdded();
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
			nonAddedRooms: PropertyRoomsStore.getNonAddedRooms(),
			isEditingMode: isEditingMode,
			newRoomAdded: addingNewRoom,
			loader: false,
			flashMessage: flashMsg !== undefined ? flashMsg : null
		});
    }

    // Handle input changes
    handleFormChange(propertyName, event) {
        let room        = this.state.room;
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

        this.setState({
            room: room
        });
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

    	let disableBtn = filledFields === totalWalls ? false : true;

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

	// Add new wall div
    addWalls(event) {
		event.preventDefault();

		let roomWalls = this.state.room.walls;
		let newWall   = {
			name: '',
			paint_id: ''
		};

		roomWalls.push(newWall);

		this.setState({
			room: {
				id: this.state.room.id,
				property_id: this.state.room.property_id,
				name: this.state.room.name,
				total_area: this.state.room.total_area,
				description: this.state.room.description,
				walls: roomWalls
			},
			disableAddWallsBtn: true
		});
	}

	render() {
		let roomForm = '';
		let addWallsSection = '';

		// If loading is complete
		if (!this.state.loader) {
			addWallsSection = this.state.room.walls.map((wall, index) => {
				return (
					<PropertyRoomWalls key={index} index={index} roomWalls={this.state.room.walls} wall={wall} onChange={this.handleWallChange} />
				);
			});

			let roomsOptions = this.state.nonAddedRooms.map((rooms, roomIndex) => {
				return (
					<option key={roomIndex} value={rooms.value}>{ rooms.title }</option>
				);
			});

			roomForm = <form onSubmit={this.handleFormSubmit}>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Room Name</label>
						<div className="input-group">
							<select ref="name"
									onChange={this.handleFormChange.bind(this, 'name')}
									value={this.state.room.name}
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
								   value={this.state.room.total_area}
								   className="form-control input-sm"/>
						</div>
					</div>
				</div>

				<div className="walls">
					{ addWallsSection }
					{this.state.disableAddWallsBtn === false ? <button onClick={this.addWalls}><i className="fa fa-plus"></i> Walls</button> : ''}
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
							<input type="hidden" ref="id" value={this.state.room.id} />
							<input type="hidden" ref="property_id" value={this.state.room.property_id} />
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
		} else {
			roomForm = <Loader />;
		}

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
                                    { this.state.isEditingMode ? <button onClick={this.props.closeRightPanel} className="close close-viewer" value="Close"><span>&times;</span></button> : ''}
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