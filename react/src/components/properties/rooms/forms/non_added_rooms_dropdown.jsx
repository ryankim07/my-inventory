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
			<select
				onChange={ this.props.onHandleFormChange.bind(this, 'name') }
				value={ this.props.room.name }
				className="form-control input-sm"
				required="required">
				<option value="">Select One</option>
				{ roomsOptions }
			</select>
        );
    }
}

export default NonAddedRoomsDropdown;