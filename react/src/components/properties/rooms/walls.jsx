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
		let walls 		= [];

		switch (property[0]) {
			case 'wall':
				walls[id]['name'] = chosenValue;
			break;

			case 'paint':
				walls[id]['paint_id'] = chosenValue;
			break;
		}

		this.props.onChange(walls);
	}

    render() {
		let refName = 'wall_' + this.props.index;

        return (
            <div>
                <div className="form-group required">
                    <div className="col-xs-12 col-md-8">
                        <label className="control-label">Wall Name</label>
                        <div className="input-group">
                            <select ref={refName}
									onChange={this.handleFormChange.bind(this, refName)}
									value={this.props.walls[this.props.index].name}
									className="form-control input-sm"
									required="required">
								<option value="">Select One</option>
								<option value="left">Left</option>
								<option value="right">Right</option>
								<option value="front">Front</option>
								<option value="back">Back</option>
								<option value="ceiling">Ceiling</option>
								<option value="all">All</option>
							</select>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-12 col-md-8">
                        <label className="control-label">Paint Color</label>
						<PropertyPaintsDropdown index={this.props.index} paints={this.props.walls} />
                    </div>
                </div>
            </div>
        );
    }
}

export default PropertyRoomWalls;