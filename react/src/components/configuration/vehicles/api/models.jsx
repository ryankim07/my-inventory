import React from 'react';
import SearchField from '../../../helper/search_field';
import TogglingRows from '../../../helper/table/toggling_rows';

class ConfigurationManufacturerModelsList extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			models: this.props.models,
			clonedModels: JSON.parse(JSON.stringify(this.props.models)),
			searchText: '',
			isSearch: false
		}

		this.onHandleFormChange = this.onHandleFormChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.models !== this.state.models) {
			this.setState({
				models: nextProps.models,
				clonedModels: JSON.parse(JSON.stringify(nextProps.models)),
				searchText: '',
				isSearch: false
			});
		}
	}

	// Handle input changes
	onHandleFormChange(event) {
		let searchText = event.target.value;
		let models     = this.state.clonedModels;
		let results = models.filter(function (list) {
			return list.model.match(new RegExp(searchText, 'gi'));
		});

		this.setState({
			models: searchText.replace(/\s/g, '').length ? results : models,
			searchText: searchText,
			isSearch: true
		});
	}

	render() {
		let modelsHtml = [];
		let models = this.state.models;

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
			<div className="row" id="manufacturers-models-list">
				<div className="panel panel-info">
					<div className="panel-heading">
						<div className="row">
							<div className="col-xs-10 col-md-10">
								<span>{ this.props.mfg } Models List</span>
							</div>
							<div className="col-xs-2 col-md-2">
								<button onClick={ this.props.closeRightPanel }><i className="fa fa-window-close" aria-hidden="true"/></button>
							</div>
						</div>
					</div>
					<div className="panel-body">
						<div className="form-group">
							<div className="col-xs-12 col-lg-12">
								<SearchField
									objs={ this.state.models }
									objKey="model"
									searchType="models"
									searchText={ this.state.searchText }
									onHandleFormChange={ this.onHandleFormChange }
								/>
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
				</div>
			</div>
        )
    }
}

export default ConfigurationManufacturerModelsList;