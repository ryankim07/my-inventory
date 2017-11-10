import React from 'react';
import NonAddedRoomsDropdown from '../../../helper/forms/hybrid_field';
import PropertyRoomWallsDropdown from '../../../helper/forms/hybrid_field';
import PropertyPaintsDropdown from '../../../helper/forms/hybrid_field';
import Uploader from '../../../helper/uploader';
import { numberFormat,
		 upperFirstLetter,
		 arrayDiff,
		 getNestedModifiedState } from '../../../helper/utils';

class PropertyRoomForm extends React.Component
{
	// Constructor
    constructor(props) {
        super(props);

		this.state = {
			disableAddWallsBtn: this.props.isEditingMode,
			allWallSides: ["left", "right", "front", "back", "ceiling", "all"],
			wallSides: [],
			selectedItem: '',
			assets: []
		};

		this.onHandleFormChange = this.onHandleFormChange.bind(this);
        this.onHandleAddWall    = this.onHandleAddWall.bind(this);
		this.onHandleAssets     = this.onHandleAssets.bind(this);
		this.onHandleSubmit 	= this.onHandleSubmit.bind(this);
    }

	// Component mounting
    componentWillMount() {
		this.setState({
			disableAddWallsBtn: this.shouldDisableAddWallBtn(this.props.room.walls),
			wallSides: this.props.room.id === '' ? this.state.allWallSides : this.state.wallSides,
			/*selectedItem: this.paint.id,
			assets: this.props.paint.assets*/
		});
	}

	// Next state change
	/*componentWillReceiveProps(nextProps) {
    	if (nextProps.room.id !== this.state.selectedItem) {
			this.setState({
				room: nextProps.room,
				isEditingMode: nextProps.room.id === "" ? false : true,
				disableAddWallsBtn: this.shouldDisableAddWallBtn(nextProps.room.walls),
				selectedItem: nextProps.room.id,
				assets: nextProps.room.assets
			});
		}
	}*/

	// Handle input changes
	onHandleFormChange(event) {
		let fieldName 	= event.target.name;
		let chosenValue = event.target.value;
		let modifiedObj = {};

		switch (fieldName) {
			case 'total_area':
				if (chosenValue === 0) {
					alert('Please enter correct total area.');
				} else {
					modifiedObj[fieldName] = numberFormat(chosenValue);
				}
			break;

			default:
				modifiedObj[fieldName] = chosenValue;
		}

		this.props.onChange(getNestedModifiedState(this.props.room, modifiedObj));
	}

	// Handle assets
	onHandleAssets(assets) {
		this.setState({ assets: assets });
	}

	// Handle walls change
	onHandleWallsChange(propertyName, event) {
		let room        = this.props.room;
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
		let room = this.props.room;
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

		let room = this.props.room;
		room.walls.splice(index, 1);

		this.setState({
			room: room,
			disableAddWallsBtn: this.shouldDisableAddWallBtn(room.walls)
		});
	}

	// Submit
	onHandleSubmit(event) {
		event.preventDefault();

		this.props.onSubmit(this.props.room, 'rooms');
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
    	// Only show dropdown when entering new room
    	let roomNameField = !this.props.isEditingMode ?
			<NonAddedRoomsDropdown
				inputProps={
					{
						auto: false,
						others: { name: "name", className: "form-control" },
						list: this.props.nonAddedRooms,
						value: this.props.room.name,
						onChange: this.onHandleFormChange,
						required: true
					}
				}
			/> :
			<input
				type="text"
				value={ upperFirstLetter(this.props.room.name) }
				className="form-control input-sm"
				disabled="disabled"
			/>;

    	let wallDetailsFields = this.props.room.walls.map((wall, wallIndex) => {
    		// Room walls
			let roomWallsField = wall.name !== '' ?
				<input
					name={ "wall_" + wallIndex }
					type="text"
					value={ upperFirstLetter(wall.name) }
					className="form-control input-sm"
					disabled="disabled"
				/> :
				<PropertyRoomWallsDropdown
					inputProps={
						{
							auto: false,
							others: { name: 'wall_' + wallIndex, className: "form-control "},
							list: this.state.wallSides,
							isFlatArray: true,
							value: wall.name,
							onChange: this.onHandleWallsChange.bind(this, 'wall_' + wallIndex),
							required: true
						}
					}
				/>;

			// Paints
			let paintsField =
				<PropertyPaintsDropdown
					inputProps={
						{
							auto: false,
							others: {name: 'paint_'  + wallIndex, className: "form-control"},
							list: this.props.paints,
							value: wall.paint_id,
							label: "name",
							identifier: "id",
							onChange: this.onHandleWallsChange.bind(this, 'paint_'  + wallIndex),
							required: true
						}
					}
				/>;

			return (
				<div key={ wallIndex } className="walls-group">
					<div className="form-group">
						<div className="col-xs-12 col-md-8">
							<label className="control-label">Wall Name</label>
							<button onClick={ this.onHandleRemoveWall.bind(this, wallIndex) }><i className="fa fa-trash" aria-hidden="true"/></button>
							{ roomWallsField }
						</div>
					</div>
					<div className="form-group">
						<div className="col-xs-12 col-md-8">
							<label className="control-label">Paint Color</label>
							{ paintsField }
						</div>
					</div>
				</div>
			);
		});

		let roomForm =
			<form onSubmit={ this.onHandleSubmit }>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Photo</label>
						<Uploader
							inputProps={
								{   className: "input-group",
									assets: this.props.room.assets,
									onChange: this.onHandleAssets
								}
							}
						/>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Room Name</label>
						{ roomNameField }
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Total Area</label>
						<div className="input-group">
							<input
								name="total_area"
								type="text"
								onChange={ this.onHandleFormChange }
								value={ this.props.room.total_area }
								className="form-control input-sm"
							/>
						</div>
					</div>
				</div>

				{ wallDetailsFields }

				{ !this.state.disableAddWallsBtn ?
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
								name="description"
								rows="5"
								className="form-control"
								onChange={ this.onHandleFormChange }
								value={ this.props.room.description }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input type="hidden" value={ this.props.room.id }/>
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
			<div>{ roomForm }</div>
        );
    }
}

export default PropertyRoomForm;