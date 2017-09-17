import React from 'react';
import ApiVehiclesAction from '../../actions/api-vehicles-action';
import ApiVehiclesStore from '../../stores/vehicles/api-store';

class ApiVehiclesDropdown extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			apiVehicles: [],
			show: true
		}

		this._onChange = this._onChange.bind(this);
	}

	componentWillMount() {
		ApiVehiclesStore.addChangeListener(this._onChange);
	}

	componentDidMount() {
		ApiVehiclesAction.getApiVehicles();
	}

	componentWillUnmount() {
		ApiVehiclesStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		let apiVehicles = ApiVehiclesStore.getApiVehicles();

		this.setState({
			apiVehicles: apiVehicles,
			show: false
		});
	}

	// Handle input changes
	handleFormChange(propertyName, event) {
		this.props.onHandleFormChange(propertyName, event);
	}

    render() {
		let apiMfgsOptions   = '';
		let apiModelsOptions = '';

		if (!this.state.show) {
			let apiVehicles = this.state.apiVehicles;

			// Get api vehicles list
			apiMfgsOptions = apiVehicles.map((mfgs, mfgIndex) => {
				return (
                    <option key={mfgIndex} value={mfgs.id}>{mfgs.mfg}</option>
				);
			});

			// Get selected choice from api vehicles dropdown
			let selectedMfg = apiVehicles.filter(apiVehicle => {
				return apiVehicle.id === this.props.defaultMfgId
			});

			// Models options by ID
			if (selectedMfg.length !== 0) {
				apiModelsOptions = selectedMfg[0].models.map((veh, modelIndex) => {
					return (
                        <option key={modelIndex} value={veh.model_id}>{veh.model}</option>
					);
				});
			}
		}

        return (
            <div>
                <div className="form-group required">
                    <div className="col-xs-12 col-md-8">
                        <label className="control-label">Manufacturer</label>
                        <div className="input-group">
                            <select ref="mfg_id"
                                    onChange={ this.handleFormChange.bind(this, 'mfg_id') }
                                    value={ this.props.mfgId }
                                    className="form-control input-sm"
                                    required="required">
                                <option value="">Select One</option>
								{ apiMfgsOptions }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group required">
                    <div className="col-xs-12 col-md-8">
                        <label className="control-label">Model</label>
                        <div className="input-group">
                            <select ref="model_id"
                                    onChange={ this.handleFormChange.bind(this, 'model_id') }
                                    value={ this.props.modelId }
                                    className="form-control input-sm"
                                    required="required">
                                <option value="">Select One</option>
								{ apiModelsOptions }
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ApiVehiclesDropdown;