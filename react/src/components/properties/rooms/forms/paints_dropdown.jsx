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
			<div className="form-group">
				<div className="col-xs-12 col-md-8">
					<label className="control-label">Paint Color</label>
					<div className="input-group">
						<select
							ref={ refName }
							onChange={ this.props.onHandleWallsChange.bind(this, refName) }
							value={ this.props.wall.paint_id }
							className="form-control input-sm">
							<option value="">Select One</option>
							{ paintsOptions }
						</select>
					</div>
				</div>
			</div>
        );
    }
}

export default PropertyPaintsDropdown;