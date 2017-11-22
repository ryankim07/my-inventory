/**
 * Zip code input component
 *
 * Required props:
 *
 * name: name
 * type: type
 * className: class name
 * value: value to be set
 * onChange: handler for form changes
 * title: title (optional)
 * pattern: validator (optional)
 * required: "required" or ""
 */

import React from 'react';
import TextField from 'material-ui/TextField';

class InputZipCode extends React.Component
{
	// Render
	render() {
		return (
			<TextField
				name={ this.props.inputProps.name }
				type="text"
				className={ this.props.inputProps.className }
				value={ this.props.inputProps.value }
				onChange={ this.props.inputProps.onChange }
				title="Zip code should contain 5 digits"
				pattern="^\d{5}$"
				floatingLabelText="Zip code"
				required={ this.props.inputProps.required }
			/>
		);
	}
}

export default InputZipCode;