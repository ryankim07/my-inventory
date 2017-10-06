import React from 'react';
import ConfigurationVehicleModelItems from './model_items';

class ConfigurationVehicleModels extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			models: this.props.apiVehicle.models,
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.apiVehicle.models !== this.props.apiVehicle.models) {
			this.setState({
				models: nextProps.apiVehicle.models
			});
		}
	}

	// Handle input changes
	onHandleFormChange(propertyName, event) {
		let models     = this.state.models;
		let searchText = event.target.value;
		let results    = models.filter(function(m) {
			return m.model.match(new RegExp( searchText , 'gi' ));
		});

		this.setState({
			models: searchText === "" || searchText === undefined ? models : results
		});
	}

	render() {
		let modelsHtml = '';
		let models = this.state.models;

		if (!models || models.length === 0) {
			modelsHtml = <tr><td><span>There are no saved models.</span></td></tr>;
		} else {
			modelsHtml = models.map((model, modelIndex) => {
				return (
					<ConfigurationVehicleModelItems
						key={ modelIndex }
						modelName={ model.model }
						selectedModel=""
						onHandleClick={ this.props.onHandleClick.bind(this, model.id) }
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
								<span>{ this.props.apiVehicle.mfg } Models List</span>
							</div>
							<div className="col-xs-2 col-md-2"/>
						</div>
					</div>
					<div className="panel-body">
						<div className="form-group">
							<div className="col-xs-12 col-lg-12">
								<div className="input-group col-lg-12">
									<input
										type="text"
										onChange={ this.onHandleFormChange.bind(this, 'search') }
										className="form-control"/>
								</div>
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

export default ConfigurationVehicleModels;