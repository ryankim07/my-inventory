import React from 'react';
import NonAddedRoomsDropdown from '../../rooms/forms/non_added_rooms_dropdown';
import PropertyRoomWallsDropdown from '../../rooms/forms/walls_dropdown';
import PropertyPaintsDropdown from '../../rooms/forms/paints_dropdown';
import { numberFormat } from "../../../helper/utils"

class PropertyRoomForm extends React.Component
{
    constructor(props) {
        super(props);

		this.state = {
			room: this.props.state.room,
			disableAddWallsBtn: false,
		};

		this.handleFormSubmit 	= this.handleFormSubmit.bind(this);
        this.onHandleFormChange = this.onHandleFormChange.bind(this);
		this.handleWallChange 	= this.handleWallChange.bind(this);
		this.addWalls         	= this.addWalls.bind(this);
		this.removeWall         = this.removeWall.bind(this);
    }

	// Handle input changes
	onHandleFormChange(propertyName, event) {
		let room        = this.props.state.room;
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

		this.setState({room: room});
	}

	// Handle form changes
	handleFormChange(propertyName, event) {
		let id    		= propertyName.match(/\d/);
		let property 	= propertyName.split(/_(.*)/);
		let chosenValue = event.target.value;
		let walls 		= this.props.allWalls;

		switch (property[0]) {
			case 'wall':
				walls[id].name = chosenValue;
				break;

			case 'paint':
				walls[id].paint_id = chosenValue;
				break;
		}

		this.handleWallChange(walls);
	}

	// Submit
	handleFormSubmit(event) {
		event.preventDefault();

		/*if (!this.props.state.isEditingMode) {
			PropertiesRoomsAction.addRoom(this.props.state.room);
		} else {
			PropertiesRoomsAction.updateRoom(this.props.state.room);
		}*/
	}

    // Handle appropriate action whenever wall fields are changed
	handleWallChange(walls) {
		let room = this.state.room;
		let totalWalls = walls.length;
		let filledFields = 0;

		walls.map((wall, index) => {
			if (wall.name === "all" || index === 4) {
				filledFields = 0;
			} else if (wall.name !== "" && wall.paint_id !== "") {
				filledFields++;
			}
		});

		room.push({walls: walls});

		this.setState({
			room: room,
			disableAddWallsBtn: filledFields === totalWalls ? false : true
		});
	}

	// Add new wall div
    addWalls(event) {
    	event.preventDefault();
		let walls = this.props.state.room.walls;
		let newWall   = {
			name: '',
			paint_id: ''
		};

		walls.push(newWall);

		this.props.wallChange(walls,  true);
	}

	removeWall(index, event) {
		event.preventDefault();

		let walls = this.props.allWalls;
		walls.splice(index, 1);

		this.props.wallChange(walls);
	}

	render() {
    	let room 			   = this.state.room;
    	let disableAddWallsBtn = this.state.disableAddWallsBtn;

    	let wallDetails = room.walls.map((wall, wallIndex) => {
			return (
				<div key={ wallIndex }>
					<PropertyRoomWallsDropdown
						index={ wallIndex }
						wall={ wall }
						handleFormChange={ this.handleFormChange }
						removeWall={ this.removeWall }
					/>
					<PropertyPaintsDropdown
						index={ wallIndex }
						wall={ wall }
						paints={ this.props.state.paints }
						handleFormChange={ this.handleFormChange }
					/>
				</div>
			);
		});

		let roomForm = <form onSubmit={ this.handleFormSubmit }>
			<NonAddedRoomsDropdown
				room={ this.state.room }
				nonAddedRooms={ this.props.state.property.non_added_rooms }
				onHandleFormChange={ this.onHandleFormChange }
			/>
			<div className="form-group">
				<div className="col-xs-12 col-md-8">
					<label className="control-label">Total Area</label>
					<div className="input-group">
						<input
							type="text"
							ref="total_area"
							onChange={ this.onHandleFormChange.bind(this, 'total_area') }
							value={ room.total_area }
							className="form-control input-sm"
						/>
					</div>
				</div>
			</div>

			{ wallDetails }

			{ disableAddWallsBtn === false ?
				<div className="form-group">
					<div className="col-xs-12 col-md-12">
						<div className="clearfix">
							<button onClick={ this.addWalls }><i className="fa fa-plus" aria-hidden="true" /> Add Walls</button>
						</div>
					</div>
				</div> : null
			}

			<div className="form-group">
				<div className="col-xs-12 col-md-8">
					<label className="control-label">Description</label>
					<div className="input-group">
						<textarea
							ref="description"
							rows="5"
							className="form-control">
						</textarea>
					</div>
				</div>
			</div>
			<div className="form-group">
				<div className="col-xs-12 col-md-8">
					<div className="input-group">
						<input type="hidden" ref="id" value={ room.id } />
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
                                    <button onClick={ this.props.closeRightPanel } className="close close-viewer" value="Close"><span>&times;</span></button>
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

export default PropertyRoomForm;