/**
 * Counties dropdown component
 */

import React from 'react';

class CountiesDropdown extends React.Component
{
    render() {
		let counties = [
			{ "key": "Orange County", "value": "Orange County" },
			{ "key": "Los Angeles County", "value": "Los Angeles County" }
		];

		let countiesOptions = counties.map((county, countyIndex) => {
			return (
				<option key={ countyIndex } value={ county.key }>{ county.value }</option>
			);
		});

        return (
            <select
				className={ this.props.className }
				value={ this.props.value }
				onChange={ this.props.onHandleFormChange }
                required={ this.props.required }>
				<option value="">Select One</option>
				{ countiesOptions }
            </select>
        );
    }
}

export default CountiesDropdown;