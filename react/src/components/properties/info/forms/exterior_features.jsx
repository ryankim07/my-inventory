import React from 'react';

class PropertyExteriorFeaturesForm extends React.Component
{
	// Constructor
    constructor(props) {
        super(props);

        this.state = {
			exteriorFeatures: this.props.property.exterior_features
        };

		this.handleFormChange = this.handleFormChange.bind(this);
    }

	// Handle form change
	handleFormChange(propertyName, event) {
		let exteriorFeatures = this.state.exteriorFeatures;
		exteriorFeatures[propertyName] = event.target.value;

		this.setState({exteriorFeatures: exteriorFeatures});
	}

	// Handle form submit
    handleFormSubmit(event) {
		event.preventDefault();

		this.props.onHandleSubmit(this.state.exteriorFeatures, 'exterior_features');
    }

    // Render
	render() {
		let exteriorFeatures = this.state.exteriorFeatures;

		let exteriorFeaturesForm =
			<form onSubmit={ this.handleFormSubmit.bind(this) }>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Exterior</label>
						<div className="input-group">
								<textarea
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange.bind(this, 'exterior') }
									value={ exteriorFeatures.exterior }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Foundation</label>
						<div className="input-group">
								<textarea
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange.bind(this, 'foundation') }
									value={ exteriorFeatures.foundation }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Others</label>
						<div className="input-group">
								<textarea
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange.bind(this, 'others') }
									value={ exteriorFeatures.others }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input type="hidden" value={ exteriorFeatures.id }/>
							<input type="hidden" value={ exteriorFeatures.property_id }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-12">
						<div className="clearfix">
							<button type="submit" value="Save"><i className="fa fa-floppy-o"/> Save</button>
						</div>
					</div>
				</div>
			</form>;

        return (
			<div>{ exteriorFeaturesForm }</div>
        );
    }
}

export default PropertyExteriorFeaturesForm;