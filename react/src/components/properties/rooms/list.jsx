import React from 'react';
import PropertyRoomsStore from '../../../stores/properties/rooms-store';
import PropertyRoomsAction from '../../../actions/properties-rooms-action';
import AppDispatcher from '../../../dispatcher/app-dispatcher';
import ActionConstants from '../../../constants/action-constants';
import Loader from '../../loader';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';
let mainClassName = 'main-column';

class PropertiesRoomsList extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            room: {},
            loader: true
        };

        this._onChange  = this._onChange.bind(this);
		this.addRoom    = this.addRoom.bind(this);
        this.editRoom   = this.editRoom.bind(this);
        this.removeRoom = this.removeRoom.bind(this);
    }

    componentWillMount() {
        PropertyRoomsStore.addChangeListener(this._onChange);
    }

	componentDidMount() {
		PropertyRoomsAction.getPropertyRooms(this.props.propertyId);
	}

    componentWillUnmount() {
        PropertyRoomsStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        let rooms = PropertyRoomsStore.getRooms();

        this.setState({
            rooms: rooms,
			room: {},
            loader: false
        });
    }

	addRoom(e) {
		// Forward to view route by passing ID
		this.context.router.push({
			pathname: "/property/rooms/add",
			state: {property_id: this.props.propertyId}
		});
	}

    editRoom(e) {
        // Set panel width
        let data = e.target.dataset;

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
    }

    removeRoom(e) {
        ProperyRoomsAction.removeRoom(e.target.dataset.id);
    }

    render() {
        let roomsHtml = '';

		// If loading is complete
        if (!this.state.loader) {
			roomsHtml = this.state.rooms.map((room) => {

				return (
                    <tr key={ room.id }>
                        <td>{ room.name }</td>
                        <td>{ room.total_area }</td>
                        <td>{ room.description }</td>
                        <td>
							<button onClick={this.removeRoom}><i data-id={room.id} className="fa fa-trash"></i></button>
							<button onClick={this.viewProperty}>
								<i className="fa fa-search"
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
            <div className={[this.props.mobileWidth, this.props.desktopWidth, this.props.className].join(' ')} id="rooms-main">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>Properties Rooms List</span>
                                </div>
                                <div className="col-xs-2 col-md-2">
									<button onClick={this.addRoom}>
										<i className="fa fa-plus">Add Room Details</i>
									</button>
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

PropertiesRoomsList.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default PropertiesRoomsList;