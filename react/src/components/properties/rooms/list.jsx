import React from 'react';
import PropertiesRoomsAction from '../../../actions/properties-rooms-action';
import PropertyRoomsStore from '../../../stores/properties/rooms-store';
import AppDispatcher from '../../../dispatcher/app-dispatcher';
import ActionConstants from '../../../constants/action-constants';
import Loader from '../../loader';

class PropertyRoomsList extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
        	propertyId: this.props.propertyId,
            rooms: [],
            room: {},
			loader: true,
			flashMessage: null
        };

        this._onChange     = this._onChange.bind(this);
		this.handleActions = this.handleActions.bind(this);
    }

	componentDidMount() {
		PropertiesRoomsAction.getPropertyRooms(this.state.propertyId);
	}

    componentWillMount() {
        PropertyRoomsStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        PropertyRoomsStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        let rooms 	 = PropertyRoomsStore.getRooms();
		let flashMsg = PropertyRoomsStore.getStoreFlashMessage();

        this.setState({
			rooms: rooms,
			loader: false,
			flashMessage: flashMsg !== undefined ? flashMsg : null
        });
    }

    handleActions(e) {
    	e.preventDefault();

		let data   = e.target.dataset;
		let action = data.action;

		switch (action) {
			case 'add':
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.ADD_NEW_PROPERTY_ROOM
				});
			break;

			case 'edit':
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.EDIT_PROPERTY_ROOM,
					room: {
						id: data.id,
						property_id: data.property_id,
						name: data.name,
						total_area: data.total_area,
						description: data.description
					},
					openRightPanel: true
				});
			break;

			case 'remove':
				ProperyRoomsAction.removeRoom(e.target.dataset.id);
			break;
		}
	}

    render() {
        let roomsHtml = '';

		if (!this.state.loader) {
			roomsHtml = this.state.rooms.map((room) => {
				return (
					<tr key={ room.id }>
						<td>{ room.name }</td>
						<td>{ room.total_area }</td>
						<td>{ room.description }</td>
						<td>
							<button onClick={this.handleActions}><i data-action="remove" data-id={room.id} className="fa fa-trash"></i></button>
							<button onClick={this.handleActions}>
								<i className="fa fa-pencil"
								   data-action="edit"
								   data-id={room.id}
								   data-name={room.name}
								   data-total-area={room.total_area}
								   data-description={room.description}>View Details
								</i>
							</button>
						</td>
					</tr>
				);
			});
		} else {
			roomsHtml = <tr><td><Loader /></td></tr>;
		}

        return (
            <div className="col-xs-4 col-md-4" id="rooms-main">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>Properties Rooms List</span>
                                </div>
                                <div className="col-xs-2 col-md-2">
									<button onClick={this.handleActions}><i data-action="add" className="fa fa-plus">Add Room</i></button>
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