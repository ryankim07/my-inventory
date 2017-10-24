/**
 * Countries dropdown component
 */

import React from 'react';

class CountriesDropdown extends React.Component
{
    render() {
		let countries = [
			{ "key": "United States", "value": "United States" }
		];

		let countriesOptions = countries.map((country, countryIndex) => {
			return (
				<option key={ countryIndex } value={ country.key }>{ country.value }</option>
			);
		});

        return (
            <select
				className={ this.props.className }
				value={ this.props.value }
				onChange={ this.props.onHandleFormChange }
                required={ this.props.required }>
				<option value="">Select One</option>
				{ countriesOptions }
            </select>
        );
    }
}

export default CountriesDropdown;