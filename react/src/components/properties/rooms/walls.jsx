import React from 'react';
import PropertyPaintsDropdown from '../paints/dropdown';
import { upperFirstLetter } from "../../helper/utils"

class PropertyRoomWalls extends React.Component
{
	constructor(props) {
		super(props);

		this.handleFormChange = this.handleFormChange.bind(this);
		this.removeWall       = this.removeWall.bind(this);
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
		}

		this.props.wallChange(walls);
	}

	removeWall(index, event) {
		event.preventDefault();

		let walls = this.props.allWalls;
		walls.splice(index, 1);

		this.props.wallChange(walls);
	}

    render() {
		let index			 = this.props.index;
		let wallSides		 = ["left", "right", "front", "back", "ceiling", "all"];
		let refName 		 = 'wall_' + index;
		let wallSidesOptions = [];

		for (let i = 0, len = wallSides.length; i < len; i++) {
			if (index > 0 && wallSides[i] === "all") {
				continue;
			}

			wallSidesOptions.push(<option key={ wallSides[i] } value={ wallSides[i] }>{ upperFirstLetter(wallSides[i]) }</option>);
		}

        return (
            <div>
                <div className="form-group required">
                    <div className="col-xs-12 col-md-8">
                        <label className="control-label">Wall Name</label>
						<button onClick={ this.removeWall.bind(this, index) }><i className="fa fa-trash" aria-hidden="true" /></button>
                        <div className="input-group">
                            <select ref={ refName }
									onChange={ this.handleFormChange.bind(this, refName) }
									value={ this.props.wall.name }
									className="form-control input-sm"
									required="required">
								<option value="">Select One</option>
								{ wallSidesOptions }
							</select>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-12 col-md-8">
                        <label className="control-label">Paint Color</label>
						<PropertyPaintsDropdown
							index={ index }
							wallChange={ this.props.wallChange }
							allWalls={ this.props.allWalls }
							wall={ this.props.wall}
							paints={ this.props.paints }
						/>
                    </div>
                </div>
            </div>
        );
    }
}

export default PropertyRoomWalls;