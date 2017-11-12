import React from 'react';
import _ from 'lodash';
import SearchField from '../../helper/search_field';
import TogglingRows from '../../helper/table/toggling_rows';
import { upperFirstLetter } from '../../helper/utils';

class PropertyRoomsList extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			searchResults: []
		};

		this.onHandleSearch = this.onHandleSearch.bind(this);
	}

	// Handle search
	onHandleSearch(results) {
		this.setState({ searchResults: results });
	}

	// Render
	render() {
		let roomsHtml = null;

		if (!this.props.rooms || this.props.rooms.length === 0) {
			roomsHtml = <tr><td>Empty list.</td></tr>;
		} else {
			let list = !_.isEmpty(this.state.searchResults) ? this.state.searchResults : this.props.rooms;

			roomsHtml = list.map((room, roomIndex) => {
				return (
					<TogglingRows
						key={ roomIndex }
						selectedItem={ this.props.selectedItem === room.id }
						columnValues={[
							upperFirstLetter(room.name),
							room.total_area
						]}
						addEditBtn={ true }
						onEdit={ this.props.onHandleRightRoomPanel.bind(this, room.id) }
						addRemoveBtn={ true }
						onRemove={ this.props.onRemove.bind(this, room.property_id, room.id) }
					/>
				);
			});
		}

		let searchField =
			<SearchField
				inputProps={
					{
						list: this.props.rooms,
						searchType: "name",
						onSearch: this.onHandleSearch
					}
				}
			/>;

        return (
			<div>
				<div className="form-group">
					<div className="col-xs-12 col-lg-12">
						{ searchField }
					</div>
				</div>
				<table className="table">
					<thead>
					<tr>
						<th>Name</th>
						<th>Total Area</th>
						<th>Actions</th>
					</tr>
					</thead>
					<tbody>
						{ roomsHtml }
					</tbody>
				</table>
			</div>
        )
    }
}

export default PropertyRoomsList;