import React from 'react';
import AppDispatcher from '../../../dispatcher/app-dispatcher';
import ActionConstants from '../../../constants/action-constants';
import PropertiesRoomsAction from '../../../actions/properties-rooms-action';
import Loader from '../../loader';

class PropertyRoomsList extends React.Component
{
    constructor(props) {
        super(props);
    }

    handleAdd() {
		AppDispatcher.handleViewAction({
			actionType: ActionConstants.ADD_NEW_PROPERTY_ROOM
		});
	}

	handleEdit(data) {
		AppDispatcher.handleViewAction({
			actionType: ActionConstants.EDIT_PROPERTY_ROOM,
			room: data,
			openRightPanel: true
		});
	}

	handleRemove(id) {
		PropertiesRoomsAction.removeRoom(id);
	}

    render() {
        let roomsHtml = '';

		if (!this.props.state.loader) {
			roomsHtml = this.props.state.rooms.map((room) => {
				return (
					<tr key={ room.id }>
						<td>{ room.name }</td>
						<td>{ room.total_area }</td>
						<td>{ room.description }</td>
						<td>
							<button onClick={ this.handleRemove.bind(this, room.id) }><i className="fa fa-trash"></i></button>
							<button onClick={ this.handleEdit.bind(this, room) }><i className="fa fa-pencil"></i></button>
						</td>
					</tr>
				);
			});
		} else {
			roomsHtml = <tr><td><Loader /></td></tr>;
		}

        return (
            <div className={[this.props.mobileWidth, this.props.desktopWidth, this.props.className].join(' ')} id="rooms-main">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>Properties Rooms List</span>
                                </div>
                                <div className="col-xs-2 col-md-2">
									<button onClick={this.handleAdd.bind(this)}><i className="fa fa-plus">Add Room</i></button>
								</div>
                            </div>
                        </div>
                        <div className="panel-body">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Total Area</th>
                                    <th>Description</th>
                                </tr>
                                </thead>
                                <tbody>
                                { roomsHtml }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PropertyRoomsList;