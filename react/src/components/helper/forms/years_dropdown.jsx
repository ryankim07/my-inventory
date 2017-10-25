/**
 * States dropdown component
 *
 * Required props
 *
 * fromYear: the year to start,
 * toYear: the year to end,
 * className: class name,
 * value: the value to be selected,
 * required: "required" or "",
 * onChange: handler for form changes
 */

import React from 'react';
import AbstractDropdown from './abstract_dropdown';
import { yearsGenerator } from "../../helper/utils";

class YearsDropdown extends React.Component
{
	// Render
    render() {
		let yearsOptions = [];
		let fromYear = this.props.inputProps.fromYear;
		let toYear   = this.props.inputProps.toYear;

		for (let i = fromYear; i <= toYear; i++) {
			yearsOptions.push(<option key={ 'y-' + i } value={ i }>{ i }</option>)
		}

        return (
			<AbstractDropdown inputProps={ this.props.inputProps }>
				<option value="">Select One</option>
				{ yearsOptions }
            </AbstractDropdown>
        );
    }
}

export default YearsDropdown;