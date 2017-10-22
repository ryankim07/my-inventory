import React from 'react';

class PropertyInteriorFeaturesForm extends React.Component
{
	// Constructor
    constructor(props) {
        super(props);

        this.state = {
			interiorFeatures: this.props.property.interior_features
        };

		this.handleFormChange = this.handleFormChange.bind(this);
    }

	// Handle form change
	handleFormChange(propertyName, event) {
		let interiorFeatures = this.state.interiorFeatures;
		interiorFeatures[propertyName] = event.target.value;

		this.setState({interiorFeatures: interiorFeatures});
	}

	// Handle form submit
    handleFormSubmit(event) {
		event.preventDefault();

		this.props.onHandleFormSubmit(this.state.interiorFeatures, 'interior_features');
    }

	// Render
	render() {
		let interiorFeatures = this.state.interiorFeatures;

		let interiorFeaturesForm =
			<form onSubmit={ this.handleFormSubmit.bind(this) }>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Kitchen</label>
						<div className="input-group">
								<textarea
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange.bind(this, 'kitchen') }
									value={ interiorFeatures.kitchen }
								/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Bathroom</label>
						<div className="input-group">
								<textarea
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange.bind(this, 'bathroom') }
									value={ interiorFeatures.bathroom }
								/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Laundry</label>
						<div className="input-group">
								<textarea
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange.bind(this, 'laundry') }
									value={ interiorFeatures.laundry }
								/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Cooling</label>
						<div className="input-group">
								<textarea
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange.bind(this, 'cooling') }
									value={ interiorFeatures.cooling }
								/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Heating</label>
						<div className="input-group">
								<textarea
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange.bind(this, 'heating') }
									value={ interiorFeatures.heating }
								/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Fireplace</label>
						<div className="input-group">
								<textarea
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange.bind(this, 'fireplace') }
									value={ interiorFeatures.fireplace }
								/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Flooring</label>
						<div className="input-group">
								<textarea
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange.bind(this, 'flooring') }
									value={ interiorFeatures.flooring }
								/>
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
									value={ interiorFeatures.others }
								/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input type="hidden" value={ interiorFeatures.id }/>
							<input type="hidden" value={ interiorFeatures.property_id }/>
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
			{ interiorFeaturesForm }
        );
    }
}

export default PropertyInteriorFeaturesForm;