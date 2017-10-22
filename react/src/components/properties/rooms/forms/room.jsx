import React from 'react';
import DisplayPanel from '../../../helper/panels/display';
import NonAddedRoomsDropdown from '../../rooms/forms/non_added_rooms_dropdown';
import PropertyRoomWallsDropdown from '../../rooms/forms/walls_dropdown';
import PropertyPaintsDropdown from '../../rooms/forms/paints_dropdown';
import Uploader from '../../../helper/uploader';
import { numberFormat, upperFirstLetter, arrayDiff } from '../../../helper/utils';

class PropertyRoomForm extends React.Component
{
	// Constructor
    constructor(props) {
        super(props);

		this.state = {
			room: this.props.room,
			disableAddWallsBtn: this.props.isEditingMode,
			isEditingMode: this.props.isEditingMode,
			allWallSides: ["left", "right", "front", "back", "ceiling", "all"],
			wallSides: []
		};

		this.handleFormSubmit    = this.handleFormSubmit.bind(this);
        this.onHandleFormChange  = this.onHandleFormChange.bind(this);
        this.onHandleWallsChange = this.onHandleWallsChange.bind(this);
        this.onHandleAddWall     = this.onHandleAddWall.bind(this);
		this.setAssets     		 = this.setAssets.bind(this);
    }

	// Component mounting
    componentWillMount() {
		this.setState({
			disableAddWallsBtn: this.shouldDisableAddWallBtn(this.state.room.walls),
			wallSides: this.state.room.id === '' ? this.state.allWallSides : this.state.wallSides
		});
	}

	// Next state change
	componentWillReceiveProps(nextProps) {
    	if (nextProps.room !== this.props.room) {
			this.setState({
				room: nextProps.room,
				isEditingMode: nextProps.room.id === "" ? false : true,
				disableAddWallsBtn: this.shouldDisableAddWallBtn(nextProps.room.walls)
			});
		}
	}

	// Handle assets
	setAssets(assets) {
		let room = this.state.room;
		room['assets'] = assets;

		this.setState({
			room: room
		});
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

	// Handle walls change
	onHandleWallsChange(propertyName, event) {
		let room        = this.state.room;
		let walls       = room.walls;
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

		let newWall = {
			id: '',
			room_id: '',
			paint_id: '',
			name: ''
		};
		let room = this.state.room;
		let walls = room.walls;
		let allWallSides = this.state.allWallSides;
		let wallSides = [];

		// All walls were selected
		if (walls.length === 0) {
			walls.push(newWall);
			wallSides = allWallSides;
		} else {
			let currentWalls = [];
			walls.map((wall) => {
				if (wall.name !== '') {
					currentWalls.push(wall.name);
				}
			});

			// Remove all option
			wallSides = arrayDiff(currentWalls, allWallSides.filter(function (e) {
				return e !== 'all'
			}));

			walls.push(newWall);
		}

		this.setState({
			room: room,
			disableAddWallsBtn: true,
			wallSides: wallSides
		});
	}

	// Remove wall
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

		// If all walls are filled up, no need to add additional walls
		// Needs to subtract 1 from all wall sides due to "all" option
		if (walls.length === this.state.allWallSides.length - 1) {
			disable = true;
		} else {
			walls.map((wall) => {
				if (wall.name === "all" ||
					wall.length === 0) {
					disable = true;
				} else if (wall.paint_id === "" && wall.room_id === "") {
					disable = true;
				} else {
					disable = false;
				}
			});
		}

		return disable;
	}

	// Render
	render() {
    	let room 			   = this.state.room;
    	let disableAddWallsBtn = this.state.disableAddWallsBtn;

    	// Only show dropdown when entering new room
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
				<div key={ wallIndex } className="walls-group">
					<div className="form-group">
						<div className="col-xs-12 col-md-8">
							<label className="control-label">Wall Name</label>
							<button onClick={ this.onHandleRemoveWall.bind(this, wallIndex) }><i className="fa fa-trash" aria-hidden="true"/></button>
							<PropertyRoomWallsDropdown
								index={ wallIndex }
								wall={ wall }
								wallSides={ this.state.wallSides }
								onHandleWallsChange={ this.onHandleWallsChange }
							/>
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
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Image</label>
						<div className="input-group">
							<Uploader
								assets={ room.assets }
								isEditingMode={ this.props.isEditingMode }
								setAssets={ this.setAssets }
							/>
						</div>
					</div>
				</div>
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
								<button onClick={ this.onHandleAddWall }><i className="fa fa-plus" aria-hidden="true"/> Add Walls</button>
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
								value={ room.description }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input type="hidden" value={ room.id }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-12">
						<div className="clearfix">
							<button type="submit" value="Save"><i className="fa fa-floppy-o"/> Save</button>
						</div>
					</div>
				</div>
			</form>;

        return (
			{ roomForm }
        );
    }
}

export default PropertyRoomForm;