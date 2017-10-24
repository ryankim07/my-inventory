import React from 'react';

class InputZipCode extends React.Component
{
	render() {
		return (
			<input
				type="text"
				className={ this.props.className }
				onChange={ this.props.onHandleFormChange }
				value={ this.props.value }
				pattern="^\d{5}$"
				title="Zip code should contain 5 digits"
				required={ this.props.required }
			/>
		);
	}
}

export default InputZipCode;