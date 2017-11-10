import React from 'react';
import _ from 'lodash';
import SearchField from '../../../helper/search_field';
import TogglingRows from '../../../helper/table/toggling_rows';

class SettingsManufacturerModelsList extends React.Component
{
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

	render() {
		let modelsHtml = [];

		if (!this.props.models || this.props.models.length === 0) {
			mfgsHtml.push(<tr><td><span>Empty list.</span></td></tr>);
		} else {
			if (this.state.searchResults.length > 0) {
				modelsHtml.push(<tr key="b"><td><span><b>Found { this.state.searchResults.length } matches</b></span></td></tr>);
			}

			let list = !_.isEmpty(this.state.searchResults) ? this.state.searchResults : this.props.models;

			let allModels = list.map((model, modelIndex) => {
				return (
					<TogglingRows
						key={ modelIndex }
						selectedItem={ this.props.selectedItem === model.id }
						columnValues={ [model.model] }
						addViewBtn={ true }
						onView={ this.props.onHandleRightPanel.bind(this, model.id) }
						addEditBtn={ false }
						addRemoveBtn={ false }
					/>
				);
			});

			modelsHtml.push(allModels);
		}

		let searchField =
			<SearchField
				inputProps={
					{
						list: this.props.models,
						searchType: "model",
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
						<th>Model</th>
						<th/>
					</tr>
					</thead>
					<tbody>
					{ modelsHtml }
					</tbody>
				</table>
			</div>
        )
    }
}

export default SettingsManufacturerModelsList;