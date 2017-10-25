/**
 * States dropdown component
 *
 * Required props
 *
 * className: class name,
 * value: the value to be selected,
 * required: "required" or "",
 * onChange: handler for form changes
 */

import React from 'react';

class AbstractDropdown extends React.Component
{
	// Render
    render() {
		return (
            <select
				className={ this.props.inputProps.className }
				value={ this.props.inputProps.value }
				onChange={ this.props.inputProps.onChange }
                required={ this.props.inputProps.required }>
				{ this.props.children }
            </select>
        );
    }
}

export default AbstractDropdown;