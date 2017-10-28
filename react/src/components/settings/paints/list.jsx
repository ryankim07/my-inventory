import React from 'react';
import SearchField from '../../helper/search_field';
import TogglingRows from '../../helper/table/toggling_rows';
import Loader from '../../helper/loader';

class SettingsPaintsList extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			paints: this.props.paints,
			clonedPaints: JSON.parse(JSON.stringify(this.props.paints))
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.paints !== this.state.paints) {
			this.setState({
				manufacturers: nextProps.paints,
				clonedPaints: JSON.parse(JSON.stringify(nextProps.paints))
			});
		}
	}

	// Handle search
	onHandleSearch(results) {
		this.setState({
			paints: results
		});
	}

	render() {
        let paintsHtml = null;

		// If loading is complete
        if (!this.props.loader) {
        	let paints = this.props.paints;

        	if (!paints || paints.length === 0) {
				paintsHtml = <tr><td><span>Empty list.</span></td></tr>;
			} else {
				paintsHtml = paints.map((paint, paintIndex) => {
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
								paint.rgb,
								paint.notes
							] }
							addEditBtn={ true }
							handleEditPanel={ this.props.onHandleRightPanel.bind(this, paint.id) }
							addRemoveBtn={ true }
							handleRemove={ this.props.onHandleRemove.bind(this, paint.id) }
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
									objs: this.state.paints,
									searchType: "name",
									onChange: this.onHandleSearch.bind(this)
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
						<th>Notes</th>
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