import React from 'react';

class PropertyPaintsDropdown extends React.Component
{
	render() {
		let refName       = 'paint_' + this.props.index;
		let paintsOptions = this.props.paints.map((paint, paintIndex) => {
			return (
				<option key={ paintIndex } value={ paint.id }>{ paint.name }</option>
			);
		});

        return (
			<select
				ref={ refName }
				onChange={ this.props.onHandleWallsChange.bind(this, refName) }
				value={ this.props.wall.paint_id }
				className="form-control input-sm">
				<option value="">Select One</option>
				{ paintsOptions }
			</select>
        );
    }
}

export default PropertyPaintsDropdown;