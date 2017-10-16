import React from 'react';

class InputZipCode extends React.Component
{
	render() {
		return (
			<input
				type="text"
				className={ this.props.className }
				onChange={ this.props.handleFormChange }
				value={ this.props.value }
				pattern="^\d{5}$"
				title="5 digit zip code"
				required={ this.props.required }
			/>
		);
	}
}

export default InputZipCode;