import React from 'react';

class PropertyFeaturesForm extends React.Component
{
	// Constructor
    constructor(props) {
        super(props);

        this.state = {
			features: this.props.property.features
        };

		this.handleFormChange = this.handleFormChange.bind(this);
    }

	// Handle form change
	handleFormChange(propertyName, event) {
		let features = this.state.features;
		features[propertyName] = event.target.value;

		this.setState({features: features});
	}

	// Handle form submit
    handleFormSubmit(event) {
		event.preventDefault();

		this.props.onHandleFormSubmit(this.state.features, 'features');
    }

    // Render
	render() {
		let features = this.state.features;

		let featuresForm =
			<form onSubmit={ this.handleFormSubmit.bind(this) }>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Parking</label>
						<div className="input-group">
								<textarea
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange.bind(this, 'parking') }
									value={ features.parking }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Multi Unit</label>
						<div className="input-group">
								<textarea
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange.bind(this, 'multi_unit') }
									value={ features.multi_unit }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Hoa</label>
						<div className="input-group">
								<textarea
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange.bind(this, 'hoa') }
									value={ features.hoa }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Utilities</label>
						<div className="input-group">
								<textarea
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange.bind(this, 'utilities') }
									value={ features.utilities }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Lot</label>
						<div className="input-group">
								<textarea
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange.bind(this, 'lot') }
									value={ features.lot }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Common Walls</label>
						<div className="input-group">
								<textarea
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange.bind(this, 'common_walls') }
									value={ features.common_walls }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Facing Direction</label>
						<div className="input-group">
								<textarea
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange.bind(this, 'facing_direction') }
									value={ features.facing_direction }/>
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
									value={ features.others }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input
								type="hidden"
								value={ features.id }/>
							<input
								type="hidden"
								value={ features.property_id }/>
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
			</form>;

        return (
			<div>{ featuresForm }</div>
        );
    }
}

export default PropertyFeaturesForm;