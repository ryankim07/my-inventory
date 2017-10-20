import React from 'react';
import SearchField from '../../../helper/search_field';
import TogglingRows from '../../../helper/table/toggling_rows';
import Loader from '../../../helper/loader';

class SettingsPaintsList extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			paints: this.props.paints,
			clonedPaints: JSON.parse(JSON.stringify(this.props.paints)),
			searchText: '',
			isSearch: false,
		};

		this.onHandleFormChange = this.onHandleFormChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.paints !== this.state.paints) {
			this.setState({
				manufacturers: nextProps.paints,
				clonedPaints: JSON.parse(JSON.stringify(nextProps.paints)),
				searchText: '',
				isSearch: false
			});
		}
	}

	// Handle input changes
	onHandleFormChange(event) {
		let searchText = event.target.value;
		let paints     = this.state.clonedPaints;
		let results = paints.filter(function (list) {
			return list.name.match(new RegExp(searchText, 'gi'));
		});

		this.setState({
			paints: searchText.replace(/\s/g, '').length ? results : paints,
			searchText: searchText,
			isSearch: true
		});
	}

	render() {
        let paintsHtml  = null;
		let searchField = null;

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

				searchField =
					<SearchField
						objs={ this.state.paints }
						objKey="name"
						searchType="paints"
						searchText={ this.state.searchText }
						onHandleFormChange={ this.onHandleFormChange }
					/>;
			}
        } else {
			paintsHtml = <tr><td><Loader/></td></tr>;
        }

        return (
			<div className="row" id="paints-list">
				<div className="panel panel-info">
					<div className="panel-heading">
						<div className="row">
							<div className="col-xs-10 col-md-10">
								<span>Paints List</span>
							</div>
							<div className="col-xs-2 col-md-2">
								<button onClick={ this.props.onHandleRightPanel.bind(this, false) }><i className="fa fa-plus" aria-hidden="true"/></button>
							</div>
						</div>
					</div>
					<div className="panel-body">
						<div className="form-group">
							<div className="col-xs-12 col-lg-12">
								{ searchField }
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
				</div>
			</div>
        )
    }
}

export default SettingsPaintsList;