import React from 'react';
import _ from 'lodash';
import PropertyRoomsStore from '../../../stores/properties/rooms-store';
import PropertyRoomsAction from '../../../actions/properties-rooms-action';
import { numberFormat } from "../../helper/utils"

class PropertyRoomAdd extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            room: {
                id: '',
                property_id: '',
                name: '',
                total_area: '',
				description: ''
            },
			isEditingMode: false,
            newRoomAdded: false,
			flashMessage: null
        };

        this._onChange = this._onChange.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentWillMount() {
		if (this.props.location.state.property_id) {
			this.setState({
				room: {
					id: '',
					property_id: this.props.location.state.property_id,
					name: '',
					total_area: '',
					description: ''
				},
				isEditingMode: false,
				newRoomAdded: false,
				flashMessage: null
			});
		}

        PropertyRoomsStore.addChangeListener(this._onChange);
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
			this.context.router.push('/properties/dashboard');
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
			isEditingMode: isEditingMode,
			newRoomAdded: addingNewRoom,
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
            room: room,
			isEditingMode: this.state.isEditingMode,
			newRoomAdded: this.state.newRoomAdded,
			flashMessage: this.state.flashMessage
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

	render() {
    	let allRooms = [];
        let bedroomOptions = [];
        let bathroomOptions = [];

		for (let i = 0; i <= 10; i++) {
			if (i == 0) {
				bedroomOptions.push(<option key="be-0" value="master bedroom">Master Bedroom</option>);
				continue;
			}

			bedroomOptions.push(<option key={'bedroom ' + i} value={'bedroom ' + i}>Bedroom { i }</option>);
		}

		allRooms.push(bedroomOptions);

		for (let j = 0; j <= 10; j++) {
			if (j == 0) {
				bathroomOptions.push(<option key="master bathroom" value="master bathroom">Master Bathroom</option>);
				continue;
			}

			bathroomOptions.push(<option key={'bathroom ' + j} value={'bathroom ' + j}>Bathroom { j }</option>);
		}

		allRooms.push(bathroomOptions)

		allRooms.push(<option key="powder" value="powder">Powder</option>);
		allRooms.push(<option key="living" value="living">Living</option>);
		allRooms.push(<option key="family" value="family">Family</option>);
		allRooms.push(<option key="laundry" value="laundry">Laundry</option>);
		allRooms.push(<option key="kitchen" value="kitchen">Kitchen</option>);
		allRooms.push(<option key="dining" value="dining">Dining</option>);
		allRooms.push(<option key="home office" value="home office">Study</option>);
		allRooms.push(<option key="bonus" value="bonus">Bonus</option>);
		allRooms.push(<option key="study" value="study">Study</option>);
		allRooms.push(<option key="game" value="game">Game</option>);
		allRooms.push(<option key="sun" value="sun">Sun</option>);
		allRooms.push(<option key="mud" value="mud">Mud Room</option>);

		let roomForm = <form onSubmit={this.handleFormSubmit}>
			<div className="form-group required">
				<div className="col-xs-12 col-md-8">
					<label className="control-label">Room Name</label>
					<div className="input-group">
						<select ref="state"
								onChange={this.handleFormChange.bind(this, 'name')}
								value={this.state.room.name}
								className="form-control input-sm"
								required="required">
							<option value="">Select One</option>
							{ allRooms }
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
			<div className="form-group">
				<div className="col-xs-12 col-md-8">
					<label className="control-label">Description</label>
					<div className="input-group">
						<textarea ref="county"
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

        return (
            <div className="col-xs-4 col-md-4" id="room-add">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>room</span>
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