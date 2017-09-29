import React from 'react';
import { upperFirstLetter } from "../../../helper/utils"

class PropertyRoomWallsDropdown extends React.Component
{
	render() {
		let wallSides = ["left", "right", "front", "back", "ceiling", "all"];
		let refName   = 'wall_' + this.props.index;

		let wallSidesOptions = wallSides.map((wall, wallIndex) => {
			return (
				<option key={ wallIndex } value={ wall }>{ upperFirstLetter(wall) }</option>
			);
		});

		let wallDropDown = this.props.wall.name !== '' ?
			<input
				type="text"
				value={ upperFirstLetter(this.props.wall.name) }
				className="form-control input-sm"
				disabled="disabled"
			/> :
			<select
				onChange={ this.props.onHandleWallsChange.bind(this, refName) }
				value={ this.props.wall.name }
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