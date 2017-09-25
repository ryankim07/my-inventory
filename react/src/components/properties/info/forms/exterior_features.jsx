import React from 'react';

class PropertyExteriorFeaturesForm extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
			exteriorFeatures: this.props.state.property.exterior_features
        };

		this.handleFormChange = this.handleFormChange.bind(this);
    }

	handleFormChange(propertyName, event) {
		let exteriorFeatures = this.state.exteriorFeatures;
		exteriorFeatures[propertyName] = event.target.value;

		this.setState({exteriorFeatures: exteriorFeatures});
	}

    // Submit
    handleFormSubmit(event) {
		event.preventDefault();

		this.props.onHandleFormSubmit(this.state.exteriorFeatures, 'exterior_features');
    }

	render() {
		let exteriorFeatures = this.state.exteriorFeatures;

		let exteriorFeaturesForm =
			<form onSubmit={ this.handleFormSubmit.bind(this) }>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Exterior</label>
						<div className="input-group">
								<textarea
									ref="exterior"
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange.bind(this, 'exterior') }
									value={ exteriorFeatures.exterior } />
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Foundation</label>
						<div className="input-group">
								<textarea
									ref="foundation"
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange.bind(this, 'foundation') }
									value={ exteriorFeatures.foundation } />
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Others</label>
						<div className="input-group">
								<textarea
									ref="others"
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange.bind(this, 'others') }
									value={ exteriorFeatures.others } />
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input
								type="hidden"
								ref="id"
								value={ exteriorFeatures.id } />
							<input
								type="hidden"
								ref="property_id"
								value={ exteriorFeatures.property_id } />
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-12">
						<div className="clearfix">
							<input
								type="submit"
								value="Submit"
								className="btn"/>
						</div>
					</div>
				</div>
			</form>

        return (
            <div className="col-xs-4 col-md-4" id="exterior-features-add">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>Add Exterior Features</span>
                                </div>
                                <div className="col-xs-2 col-md-2">
									<button onClick={ this.props.closeRightPanel }><i className="fa fa-window-close" aria-hidden="true" /></button>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">
                            { exteriorFeaturesForm }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PropertyExteriorFeaturesForm;