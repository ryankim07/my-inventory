import React from 'react';

class NonAddedRoomsDropdown extends React.Component
{
    render() {
		let roomsOptions = this.props.nonAddedRooms.map((rooms, roomIndex) => {
			return (
				<option key={ roomIndex } value={ rooms.value }>{ rooms.title }</option>
			);
		});

        return (
			<div className="form-group required">
				<div className="col-xs-12 col-md-8">
					<label className="control-label">Room Name</label>
					<div className="input-group">
						<select
							ref="name"
							onChange={ this.props.onHandleFormChange.bind(this, 'name') }
							value={ this.props.room.name }
							className="form-control input-sm"
							required="required">
							<option value="">Select One</option>
							{ roomsOptions }
						</select>
					</div>
				</div>
			</div>
        );
    }
}

export default NonAddedRoomsDropdown;