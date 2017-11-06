import React from 'react';
import _ from 'lodash';
import SearchField from '../../helper/search_field';
import TogglingRows from '../../helper/table/toggling_rows';
import Loader from '../../helper/loader';

class SettingsPaintsList extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			keyWords: '',
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
        let paintsHtml = null;

		// If loading is complete
        if (!this.props.loader) {
        	if (!this.props.paints || this.props.paints.length === 0) {
				paintsHtml = <tr><td><span>Empty list.</span></td></tr>;
			} else {
        		let list = !_.isEmpty(this.state.searchResults) ? this.state.searchResults : this.props.paints;

				paintsHtml = list.map((paint, paintIndex) => {
					return (
						<TogglingRows
							key={ paintIndex }
							selectedItem={ this.props.selectedItem === paint.id }
							columnValues={ [
								paint.name,
								paint.brand,
								paint.number,
								paint.color,
								paint.hex,
								paint.rgb
							] }
							addEditBtn={ true }
							onEdit={ this.props.onHandleRightPanel.bind(this, paint.id) }
							addRemoveBtn={ true }
							onRemove={ this.props.onRemove.bind(this, paint.id) }
						/>
					);
				});
			}
        } else {
			paintsHtml = <tr><td><Loader/></td></tr>;
        }

        return (
			<div>
				<div className="form-group">
					<div className="col-xs-12 col-lg-12">
						<SearchField
							inputProps={
								{
									objs: this.props.paints,
									searchType: "name",
									onSearch: this.onHandleSearch
								}
							}
						 />
					</div>
				</div>
				<table className="table">
					<thead>
					<tr>
						<th>Name</th>
						<th>Brand</th>
						<th>Number</th>
						<th>Color</th>
						<th>HEX</th>
						<th>RGB</th>
						<th>Actions</th>
					</tr>
					</thead>
					<tbody>
						{ paintsHtml }
					</tbody>
				</table>
			</div>
        )
    }
}

export default SettingsPaintsList;