/**
 * Dropdown abstract component
 */

import React from 'react';

class AbstractDropdown extends React.Component
{
	// Render
    render() {
		return (
            <select
				name={ this.props.inputProps.name }
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