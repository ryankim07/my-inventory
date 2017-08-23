import React from 'react';
import PropertyPaintsDropdown from '../../../components/properties/paints/dropdown';

class PropertyRoomWalls extends React.Component
{
	constructor(props) {
		super(props);

		this.handleFormChange = this.handleFormChange.bind(this);
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

		this.props.onChange(walls);
	}

	removeWall(index, event) {
		let walls = this.props.allWalls;

		walls.splice(index, 1);

		this.props.onChange(walls);
	}

    render() {
		let index			 = this.props.index;
		let refName 		 = 'wall_' + index;
		let wallSides		 = ["left", "right", "front", "back", "ceiling", "all"];
		let wallSidesOptions = [];

		for (let i = 0, len = wallSides.length; i < len; i++) {
			if (index > 0 && wallSides[i] === "all") {
				continue;
			}

			wallSidesOptions.push(<option key={wallSides[i]} value={wallSides[i]}>{ wallSides[i].charAt(0).toUpperCase() + wallSides[i].slice(1)}</option>);
		}

        return (
            <div>
                <div className="form-group required">
                    <div className="col-xs-12 col-md-8">
                        <label className="control-label">Wall Name</label>
						<button onClick={this.removeWall.bind(this, index)}><i className="fa fa-trash"></i></button>
                        <div className="input-group">
                            <select ref={refName}
									onChange={this.handleFormChange.bind(this, refName)}
									value={this.props.wall.name}
									className="form-control input-sm"
									required="required">
								<option value="">Select One</option>
								{wallSidesOptions}
							</select>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-12 col-md-8">
                        <label className="control-label">Paint Color</label>
						<PropertyPaintsDropdown index={index} onChange={this.handleFormChange} paints={this.props.wall} />
                    </div>
                </div>
            </div>
        );
    }
}

export default PropertyRoomWalls;