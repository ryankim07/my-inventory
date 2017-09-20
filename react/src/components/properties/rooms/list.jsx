import React from 'react';
import Previous from '../../helper/previous';

class PropertyRoomsList extends React.Component
{
	constructor(props) {
		super(props);

		this.handleRightPanel = this.handleRightPanel.bind(this);
	}

    handleRightPanel(id) {
		let isEditingMode = !!id;
		let property = isEditingMode ?
			this.props.state.property.rooms.find(obj => obj.id === id) :
			{
				id: '',
				property_id: '',
				name: '',
				model_id: '',
				total_area: '',
				description: ''
			}

		this.props.onHandleRightPanel(property, isEditingMode);
	}

	handleRemove(id) {
		this.props.onHandleRemove(id);
	}

    render() {
		let columnCss = this.props.state.columnCss;
        let rooms     = this.props.state.property.rooms

		let roomsHtml = !rooms || rooms.length === 0 ?
			<tr><td>There are no saved rooms.</td></tr> :
			rooms.map((room) => {
				return (
					<tr key={ room.id }>
						<td>{ room.name }</td>
						<td>{ room.total_area }</td>
						<td>{ room.description }</td>
						<td>
							<button onClick={ this.handleRightPanel.bind(this, room.id) }><i className="fa fa-pencil" aria-hidden="true" /></button>
							<button onClick={ this.handleRemove.bind(this, room.id) }><i className="fa fa-trash" aria-hidden="true" /></button>
						</td>
					</tr>
				);
			});

        return (
            <div className={ [columnCss.mobileWidth, columnCss.desktopWidth, this.props.className].join(' ') } id="rooms-main">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>Properties Rooms List</span>
                                </div>
                                <div className="col-xs-2 col-md-2">
									<button onClick={ this.handleRightPanel.bind(this) }><i className="fa fa-plus" aria-hidden="true" /></button>
									<Previous route="/properties/info/view"/>
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