import React from 'react';
import { upperFirstLetter, arrayDiff } from "../../../helper/utils";

class PropertyRoomWallsDropdown extends React.Component
{
	render() {
		let wallSides = ["left", "right", "front", "back", "ceiling", "all"];
		let refName   = 'wall_' + this.props.index;
		let wallName  = this.props.wall.name;

		if (wallName === '') {
			let currentWalls = [];
			this.props.existingWalls.map((wall) => {
				if (wall.name !== '') {
					currentWalls.push(wall.name);
				}
			});

			wallSides = arrayDiff(currentWalls, wallSides.filter(function(e) { return e !== 'all' }));
		}

		let wallSidesOptions = wallSides.map((name, wallIndex) => {
			return (
				<option key={ wallIndex } value={ name }>{ upperFirstLetter(name) }</option>
			);
		});

		let wallDropDown = wallName !== '' ?
			<input
				type="text"
				value={ upperFirstLetter(this.props.wall.name) }
				className="form-control input-sm"
				disabled="disabled"
			/> :
			<select
				onChange={ this.props.onHandleWallsChange.bind(this, refName) }
				value={ wallName }
				className="form-control input-sm">
				<option value="">Select One</option>
				{ wallSidesOptions }
			</select>;

		return (
			<div className="input-group">
				{ wallDropDown }
			</div>
        );
    }
}

export default PropertyRoomWallsDropdown;