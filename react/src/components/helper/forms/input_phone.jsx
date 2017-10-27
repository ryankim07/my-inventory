/**
 * Phone input component
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

class InputPhone extends React.Component
{
	// Render
	render() {
		return (
			<input
				name={ this.props.inputProps.name }
				type="tel"
				className={ this.props.inputProps.className }
				value={ this.props.inputProps.value }
				onChange={ this.props.inputProps.onChange }
				title="Phone should contain the following pattern: (XXX) XXX-XXXX"
				pattern="^[0-9\-\+\s\(\)]*$"
				required={ this.props.inputProps.required }
			/>
		);
	}
}

export default InputPhone;