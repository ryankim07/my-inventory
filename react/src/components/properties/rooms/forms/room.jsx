import React from 'react';
import NonAddedRoomsDropdown from '../../rooms/forms/non_added_rooms_dropdown';
import PropertyRoomWallsDropdown from '../../rooms/forms/walls_dropdown';
import PropertyPaintsDropdown from '../../rooms/forms/paints_dropdown';
import { numberFormat } from "../../../helper/utils";
import { upperFirstLetter } from "../../../helper/utils";

class PropertyRoomForm extends React.Component
{
    constructor(props) {
        super(props);

		this.state = {
			room: this.props.room,
			disableAddWallsBtn: this.props.isEditingMode,
			isEditingMode: this.props.isEditingMode
		};

		this.handleFormSubmit    = this.handleFormSubmit.bind(this);
        this.onHandleFormChange  = this.onHandleFormChange.bind(this);
        this.onHandleWallsChange = this.onHandleWallsChange.bind(this);
        this.onHandleAddWall     = this.onHandleAddWall.bind(this);
    }

    componentWillMount() {
		this.setState({
			disableAddWallsBtn: this.shouldDisableAddWallBtn(this.state.room.walls)
		});
	}

	componentWillReceiveProps(nextProps) {
    	if (nextProps.room !== this.props.room) {
			this.setState({
				room: nextProps.room,
				isEditingMode: nextProps.room.id === "" ? false : true,
				disableAddWallsBtn: this.shouldDisableAddWallBtn(nextProps.room.walls)
			});
		}
	}

	// Handle input changes
	onHandleFormChange(field, event) {
    	let room        = this.state.room;
		let chosenValue = event.target.value;

		switch (field) {
			case 'total_area':
				if (chosenValue === 0) {
					alert('Please enter correct total area.');
				} else {
					room[field] = numberFormat(chosenValue);
				}
			break;

			default:
				room[field] = chosenValue;
		}

		this.setState({room: room});
	}

	onHandleWallsChange(propertyName, event) {
		let room        = this.state.room;
		let walls       = room.walls
		let chosenValue = event.target.value;
		let id			= propertyName.match(/\d+$/)[0];
		let field 		= propertyName.split(/_(.*)/)[0];

		switch (field) {
			case 'wall':
				walls[id].name = chosenValue;
				break;

			case 'paint':
				walls[id].paint_id = chosenValue;
				break;
		}

		this.setState({
			room: room,
			disableAddWallsBtn: this.shouldDisableAddWallBtn(walls)
		});
	}

	// Add new wall div
	onHandleAddWall(event) {
    	event.preventDefault();

    	let room  	= this.state.room;
		let newWall = {
			id: '',
			room_id: '',
			paint_id: '',
			name: ''
		};

		room.walls.push(newWall);

		this.setState({
			room: room,
			disableAddWallsBtn: this.shouldDisableAddWallBtn(room.walls)
		});
	}

	onHandleRemoveWall(index, event) {
		event.preventDefault();

		let room = this.state.room;
		room.walls.splice(index, 1);

		this.setState({
			room: room,
			disableAddWallsBtn: this.shouldDisableAddWallBtn(room.walls)
		});
	}

	// Submit
	handleFormSubmit(event) {
		event.preventDefault();

		this.props.onHandleFormSubmit(this.state.room, 'rooms');
	}

	// Disable add walls button if one of the wall dropdowns
	// has already "All" selected or if all fields are empty
	shouldDisableAddWallBtn(walls) {
		let disable = false;

		walls.map((wall) => {
			if (wall.name === "all" ||
				wall.length === 0 ) {
				disable = true;
			} else if (wall.paint_id === "" && wall.room_id === "") {
				disable = true;
			} else {
				disable = false;
			}
		});

		return disable;
	}

	render() {
    	let room 			   = this.state.room;
    	let disableAddWallsBtn = this.state.disableAddWallsBtn;

    	let roomNameField = !this.state.isEditingMode ?
			<NonAddedRoomsDropdown
				room={ room }
				nonAddedRooms={ this.props.nonAddedRooms }
				onHandleFormChange={ this.onHandleFormChange }
			/> :
			<input
				type="text"
				value={ upperFirstLetter(room.name) }
				className="form-control input-sm"
				disabled="disabled"
			/>;

    	let wallDetailsFields = room.walls.map((wall, wallIndex) => {
			return (
				<div key={ wallIndex }>
					<div className="form-group">
						<div className="col-xs-12 col-md-8">
							<label className="control-label">Wall Name</label>
							<button onClick={ this.onHandleRemoveWall.bind(this, wallIndex) }><i className="fa fa-trash" aria-hidden="true" /></button>
							<div className="input-group">
								<PropertyRoomWallsDropdown
									index={ wallIndex }
									wall={ wall }
									onHandleWallsChange={ this.onHandleWallsChange }
								/>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="col-xs-12 col-md-8">
							<label className="control-label">Paint Color</label>
							<div className="input-group">
								<PropertyPaintsDropdown
									index={ wallIndex }
									wall={ wall }
									paints={ this.props.paints }
									onHandleWallsChange={ this.onHandleWallsChange }
								/>
							</div>
						</div>
					</div>
				</div>
			);
		});

		let roomForm =
			<form onSubmit={ this.handleFormSubmit }>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Room Name</label>
						<div className="input-group">
							{ roomNameField }
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Total Area</label>
						<div className="input-group">
							<input
								type="text"
								onChange={ this.onHandleFormChange.bind(this, 'total_area') }
								value={ room.total_area }
								className="form-control input-sm"
							/>
						</div>
					</div>
				</div>

				{ wallDetailsFields }

				{ !disableAddWallsBtn ?
					<div className="form-group">
						<div className="col-xs-12 col-md-12">
							<div className="clearfix">
								<button onClick={ this.onHandleAddWall }><i className="fa fa-plus" aria-hidden="true" /> Add Walls</button>
							</div>
						</div>
					</div> : null
				}

				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Description</label>
						<div className="input-group">
							<textarea
								rows="5"
								className="form-control"
								onChange={ this.onHandleFormChange.bind(this, 'description') }
								value={ room.description } />
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input type="hidden" value={ room.id } />
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