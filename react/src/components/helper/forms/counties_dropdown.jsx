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

class CountiesDropdown extends React.Component
{
	// Render
    render() {
		let counties = [
			{ "value": "Orange County", "label": "Orange County" },
			{ "value": "Los Angeles County", "label": "Los Angeles County" }
		];

		let countiesOptions = counties.map((county, countyIndex) => {
			return (
				<option key={ countyIndex } value={ county.value }>{ county.label }</option>
			);
		});

        return (
			<AbstractDropdown inputProps={ this.props.inputProps }>
				<option value="">Select One</option>
				{ countiesOptions }
            </AbstractDropdown>
        );
    }
}

export default CountiesDropdown;