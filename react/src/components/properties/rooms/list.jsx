import React from 'react';
import Previous from '../../helper/previous';
import { upperFirstLetter } from "../../helper/utils";

class PropertyRoomsList extends React.Component
{
	// Render component again or not
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.property !== this.props.property;
	}

	// Render
	render() {
		let propertyId = this.props.property.id;
        let rooms      = this.props.property.rooms;

		let roomsHtml = !rooms || rooms.length === 0 ?
			<tr><td>Empty list.</td></tr> :
			rooms.map((room, roomIndex) => {
				return (
					<tr key={ roomIndex }>
						<td>{ upperFirstLetter(room.name) }</td>
						<td>{ room.total_area }</td>
						<td>{ room.description }</td>
						<td>
							<button onClick={ this.props.onHandleRightRoomPanel.bind(this, room.id) }><i className="fa fa-pencil" aria-hidden="true"/></button>
							<button onClick={ this.props.onHandleRemoveRoom.bind(this, propertyId, room.id) }><i className="fa fa-trash" aria-hidden="true"/></button>
						</td>
					</tr>
				);
			});

        return (
			<div>{ roomsHtml }</div>
        )
    }
}

export default PropertyRoomsList;