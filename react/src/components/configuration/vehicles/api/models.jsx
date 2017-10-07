import React from 'react';
import SearchField from '../../../helper/search_field';
import TogglingRows from '../../../helper/table/toggling_rows';

class ConfigurationManufacturerModels extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			models: this.props.models,
			searchText: ''
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.models !== this.state.models) {
			this.setState({
				models: nextProps.models,
				searchText: ''
			});
		}
	}

	// Handle input changes
	onHandleFormChange(results, searchText) {
		this.setState({
			models: results,
			searchText: searchText
		});
	}

	render() {
		console.log('models');
		let modelsHtml = '';
		let models = this.state.models;

		if (!models || models.length === 0) {
			modelsHtml = <tr><td><span>There are no saved models.</span></td></tr>;
		} else {
			modelsHtml = models.map((model, modelIndex) => {
				return (
					<TogglingRows
						key={ modelIndex }
						selectedItem={ this.props.selectedModel.id === model.id }
						columnValues={ [model.model] }
						addViewBtn={ true }
						addEditBtn={ false }
						addRemoveBtn={ false }
						handleViewPanel={ this.props.onHandleRightPanel.bind(this, model.id) }
					/>
				);
			});
		}

        return (
			<div className="row" id="api-vehicles-models-list">
				<div className="panel panel-info">
					<div className="panel-heading">
						<div className="row">
							<div className="col-xs-10 col-md-10">
								<span>{ this.props.mfg } Models List</span>
							</div>
							<div className="col-xs-2 col-md-2">
								<button onClick={ this.props.closeRightPanel }><i className="fa fa-window-close" aria-hidden="true" /></button>
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
									onHandleFormChange={ this.onHandleFormChange.bind(this) }
								/>
							</div>
						</div>
						<table className="table">
							<thead>
							<tr>
								<th>Model</th>
								<th />
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

export default ConfigurationManufacturerModels;