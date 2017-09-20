import React from 'react';

class PropertyPaintsDropdown extends React.Component
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
			case 'paint':
				walls[id].paint_id = chosenValue;
				break;
		}

		this.props.wallChange(walls);
	}

    render() {
		let refName 	  = 'paint_' + this.props.index;
		let paintsOptions = this.props.paints.map((paint, paintIndex) => {
			return (
                <option key={paintIndex} value={paint.id}>{ paint.name }</option>
			);
		});

        return (
			<div className="input-group required">
				<select ref={refName}
						onChange={this.handleFormChange.bind(this, refName)}
						value={this.props.wall.paint_id}
						className="form-control input-sm"
						required="required">
					<option value="">Select One</option>
					{ paintsOptions }
				</select>
			</div>
        );
    }
}

export default PropertyPaintsDropdown;