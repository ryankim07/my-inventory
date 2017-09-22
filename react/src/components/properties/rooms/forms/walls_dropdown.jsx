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

		return (
			<div className="form-group">
				<div className="col-xs-12 col-md-8">
					<label className="control-label">Wall Name</label>
					<button onClick={ this.props.removeWall.bind(this, this.props.index) }><i className="fa fa-trash" aria-hidden="true" /></button>
					<div className="input-group">
						<select
							ref={ refName }
							onChange={ this.props.handleFormChange.bind(this, refName) }
							value={ this.props.wall.name }
							className="form-control input-sm">
							<option value="">Select One</option>
							{ wallSidesOptions }
						</select>
					</div>
				</div>
			</div>
        );
    }
}

export default PropertyRoomWallsDropdown;