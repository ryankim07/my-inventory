/**
 * Url input component
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

class InputUrl extends React.Component
{
	// Render
	render() {
		return (
			<input
				name={ this.props.inputProps.name }
				type="url"
				className={ this.props.inputProps.className }
				value={ this.props.inputProps.value }
				onChange={ this.props.inputProps.onChange }
				required={ this.props.inputProps.required }
			/>
		);
	}
}

export default InputUrl;