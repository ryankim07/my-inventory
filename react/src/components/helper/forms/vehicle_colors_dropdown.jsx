/**
 * Counties dropdown component
 *
 * Required props:
 *
 * className: class name
 * value: the value to be selected
 * required: "required" or ""
 * onChange: handler for form changes
 */

import React from 'react';
import AbstractDropdown from './abstract_dropdown';

class VehicleColorsDropdown extends React.Component
{
	// Render
    render() {
		let colors = [
			{ "value": "white", "label": "White" },
			{ "value": "black", "label": "Black" },
			{ "value": "silver", "label": "Silver" },
			{ "value": "red", "label": "Red" },
			{ "value": "yellow", "label": "Yellow" },
			{ "value": "orange", "label": "Orange" }
		];

		let colorsOptions = colors.map((color, colorIndex) => {
			return (
				<option key={ colorIndex } value={ color.value }>{ color.label }</option>
			);
		});

        return (
			<AbstractDropdown inputProps={ this.props.inputProps }>
				<option value="">Select One</option>
				{ colorsOptions }
            </AbstractDropdown>
        );
    }
}

export default VehicleColorsDropdown;