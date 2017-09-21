import React from 'react';
import PropertyStore from '../../../stores/properties/store';
import PropertiesRoomsAction from '../../../actions/properties-rooms-action';

class NonAddedRoomsDropdown extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			nonAddedRooms: [],
			show: true
		}

		this._onChange = this._onChange.bind(this);
	}

	componentWillMount() {
		PropertyStore.addChangeListener(this._onChange);
	}

	componentDidMount() {
		PropertiesRoomsAction.getNonAddedRooms();
	}

	componentWillUnmount() {
		PropertyStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		this.setState({
			nonAddedRooms: PropertyStore.getNonAddedRooms(),
			show: false
		});
	}

	// Handle input changes
	handleFormChange(propertyName, event) {
		this.props.onHandleFormChange(propertyName, event);
	}

    render() {
		let roomsOptions = '';

		if (!this.state.show) {
			roomsOptions = this.state.nonAddedRooms.map((rooms, roomIndex) => {
				return (
					<option key={ roomIndex } value={ rooms.value }>{ rooms.title }</option>
				);
			});
		}

        return (
			<div className="form-group required">
				<div className="col-xs-12 col-md-8">
					<label className="control-label">Room Name</label>
					<div className="input-group">
						<select ref="name"
								onChange={ this.props.onHandleFormChange(this, 'name') }
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