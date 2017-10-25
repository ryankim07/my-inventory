/**
 * Countries dropdown component
 *
 * Required props
 *
 * className: class name,
 * value: the value to be selected,
 * required: "required" or "",
 * onChange: handler for form changes
 */

import React from 'react';
import AbstractDropdown from './abstract_dropdown';

class CountriesDropdown extends React.Component
{
	// Render
    render() {
		let countries = [
			{ "value": "United States", "label": "United States" },
			{ "value": "South Korea", "label": "South Korea" },
			{ "value": "Brazil", "label": "Brazil" },
		];

		let countriesOptions = countries.map((country, countryIndex) => {
			return (
				<option key={ countryIndex } value={ country.value }>{ country.label }</option>
			);
		});

        return (
			<AbstractDropdown inputProps={ this.props.inputProps }>
				<option value="">Select One</option>
				{ countriesOptions }
            </AbstractDropdown>
        );
    }
}

export default CountriesDropdown;