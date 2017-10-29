import React from 'react';
import SearchField from '../../helper/search_field';
import TogglingRows from '../../helper/table/toggling_rows';
import Loader from '../../helper/loader';

class SettingsPaintsList extends React.Component
{
	// Render
	render() {
        let paintsHtml = null;

		// If loading is complete
        if (!this.props.loader) {
        	if (!this.props.paints || this.props.paints.length === 0) {
				paintsHtml = <tr><td><span>Empty list.</span></td></tr>;
			} else {
				paintsHtml = this.props.paints.map((paint, paintIndex) => {
					return (
						<TogglingRows
							key={ paintIndex }
							selectedItem={ this.props.paint.id === paint.id }
							columnValues={ [
								paint.name,
								paint.brand,
								paint.number,
								paint.color,
								paint.hex,
								paint.rgb
							] }
							addEditBtn={ true }
							handleEditPanel={ this.props.onHandleRightPanel.bind(this, paint.id) }
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
									onSearch: this.props.onSearch
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
						<th/>
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