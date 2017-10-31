import React from 'react';
import SearchField from '../../../helper/search_field';
import TogglingRows from '../../../helper/table/toggling_rows';

class SettingsManufacturerModelsList extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			models: this.props.models,
			clonedModels: JSON.parse(JSON.stringify(this.props.models))
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.models !== this.state.models) {
			this.setState({
				models: nextProps.models,
				clonedModels: JSON.parse(JSON.stringify(nextProps.models))
			});
		}
	}

	// Handle search
	onHandleSearch(results) {
		this.setState({
			models: results
		});
	}

	render() {
		let modelsHtml = [];
		let models     = this.state.models;

		if (!models || models.length === 0) {
			let msg = !this.state.isSearch ? 'Empty list.' : 'Found no matches.';

			modelsHtml.push(
				<tr key="a">
					<td><span>{ msg }</span></td>
				</tr>
			);
		} else {
			if (this.state.isSearch && this.state.searchText !== '') {
				modelsHtml.push(<tr key="b"><td><span>Found { this.state.models.length } matches</span></td></tr>);
			}

			let allModels = models.map((model, modelIndex) => {
				return (
					<TogglingRows
						key={ modelIndex }
						selectedItem={ this.props.model.id === model.id }
						columnValues={ [model.model] }
						addViewBtn={ true }
						addEditBtn={ false }
						addRemoveBtn={ false }
						handleViewPanel={ this.props.onHandleRightPanel.bind(this, model.id) }
					/>
				);
			});

			modelsHtml.push(allModels);
		}

        return (
			<div>
				<div className="form-group">
					<div className="col-xs-12 col-lg-12">
						<SearchField
							inputProps={
								{
									objs: this.state.models,
									searchType: "model",
									onChange: this.onHandleSearch.bind(this)
								}
							}
						/>;
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