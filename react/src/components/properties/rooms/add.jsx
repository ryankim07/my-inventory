import React from 'react';
import _ from 'lodash';
import PropertiesRoomStore from '../../../stores/properties-room-store';
import PropertiesRoomAction from '../../../actions/properties-room-action';
import { titleCase } from "../../helper/utils"

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
        PropertiesRoomStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
		PropertiesRoomStore.removeChangeListener(this._onChange);
		PropertiesRoomStore.unsetRoomToUpdate();
	}

    shouldComponentUpdate(nextProps, nextState) {
		// Only redirect to list if new room is being added
        if (nextState.newRoomAdded || this.state.newRoomAdded) {
			PropertiesRoomStore.unFlagNewRoom();
			nextState.newRoomAdded = false;
			this.context.router.push('/properties/dashboard');
			return false;
		}

		return true;
    }

    // Listen to changes in store, update it's own state
    _onChange() {
    	let addingNewRoom   = PropertiesRoomStore.isnewRoomAdded();
		let roomToUpdate    = PropertiesRoomStore.getRoomToUpdate();
		let isEditingMode   = this.state.isEditingMode;
		let stateRoom       = this.state.room;
		let flashMsg        = PropertiesRoomStore.getStoreFlashMessage();
		let isAuthenticated = PropertiesRoomStore.isAuthenticated();

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
        let room     = this.state.room;
        let chosenValue = event.target.value;

        switch (propertyName) {
            case 'street':
            case 'city':
            case 'subdivision':
                room[propertyName] = titleCase(chosenValue);
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
			PropertiesRoomAction.addRoom(this.state.room);
		} else {
			PropertiesRoomAction.updateRoom(this.state.room);

        	// Close the panel
            this.props.closeRightPanel();
        }
    }

	render() {
    	let allRooms = [];
        let bedroomOptions = [];
        let bathroomOptions = [];

		// Years options
		bedroomOptions.push(<option key="bedroom-0" value="master bedroom">Master Bedroom</option>);
		for (let i = 1; i <= 10; i++) {
			bedroomOptions.push(<option key={'bedroom-' + i} value=bedroom_{i}>Bedroom { i }</option>);
		}

		allRooms.push(bedroomOptions);

		bathroomOptions.push(<option key="bathroom-0" value="master bathroom">Master Bathroom</option>);
		for (let j = 1; j <= 10; j++) {
			bedroomOptions.push(<option key={'bathroom-' + j} value=bathroom_{j}>Bathroom { j }</option>);
		}

		allRooms.push(bathroomOptions);
		allRooms.push(<option value="powder">Powder</option>);
		allRooms.push(<option value="living">Living</option>);
		allRooms.push(<option value="family">Family</option>);
		allRooms.push(<option value="laundry">Laundry</option>);
		allRooms.push(<option value="kitchen">Kitchen</option>);
		allRooms.push(<option value="dining">Dining</option>);
		allRooms.push(<option value="home office">Study</option>);
		allRooms.push(<option value="bonus">Bonus</option>);
		allRooms.push(<option value="study">Study</option>);
		allRooms.push(<option value="game">Game</option>);
		allRooms.push(<option value="sun">Sun</option>);
		allRooms.push(<option value="mud">Mud Room</option>);

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
			<div className="form-group required">
				<div className="col-xs-12 col-md-8">
					<label className="control-label">Total Area</label>
					<div className="input-group">
						<input type="text"
							   ref="total_area"
							   onChange={this.handleFormChange.bind(this, 'total_area')}
							   value={this.state.room.total_area}
							   className="form-control input-sm"
							   required="required"/>
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