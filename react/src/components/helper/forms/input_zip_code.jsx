import React from 'react';

class InputZipCode extends React.Component
{
	render() {
		return (
			<input
				type="text"
				className={ this.props.inputProps.className }
				onChange={ this.props.inputProps.onHandleFormChange }
				value={ this.props.inputProps.value }
				pattern="^\d{5}$"
				title="Zip code should contain 5 digits"
				required={ this.props.inputProps.required }
			/>
		);
	}
}

export default InputZipCode;