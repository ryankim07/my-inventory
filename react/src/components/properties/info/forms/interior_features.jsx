import React from 'react';

class PropertyInteriorFeaturesForm extends React.Component
{
	// Constructor
    constructor(props) {
        super(props);

        this.handleFormChange = this.handleFormChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

	// Handle form change
	handleFormChange(event) {
		this.props.onChange(getSingleModifiedState(this.props.interiorFeatures, 'interior_features', event.target.value));
	}

	// Handle form submit
    handleFormSubmit(event) {
		event.preventDefault();
		this.props.onSubmit(this.props.interiorFeatures);
    }

	// Render
	render() {
		let interiorFeaturesForm =
			<form onSubmit={ this.handleFormSubmit }>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Kitchen</label>
						<div className="input-group">
								<textarea
									name="kitchen"
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange }
									value={ this.props.interiorFeatures.kitchen }
								/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Bathroom</label>
						<div className="input-group">
								<textarea
									name="bathroom"
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange }
									value={ this.props.interiorFeatures.bathroom }
								/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Laundry</label>
						<div className="input-group">
								<textarea
									name="laundry"
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange }
									value={ this.props.interiorFeatures.laundry }
								/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Cooling</label>
						<div className="input-group">
								<textarea
									name="cooling"
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange }
									value={ this.props.interiorFeatures.cooling }
								/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Heating</label>
						<div className="input-group">
								<textarea
									name="heating"
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange }
									value={ this.props.interiorFeatures.heating }
								/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Fireplace</label>
						<div className="input-group">
								<textarea
									name="fireplace"
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange }
									value={ this.props.interiorFeatures.fireplace }
								/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Flooring</label>
						<div className="input-group">
								<textarea
									name="flooring"
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange }
									value={ this.props.interiorFeatures.flooring }
								/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Others</label>
						<div className="input-group">
								<textarea
									name="others"
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange }
									value={ this.props.interiorFeatures.others }
								/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input type="hidden" value={ this.props.interiorFeatures.id }/>
							<input type="hidden" value={ this.props.interiorFeatures.property_id }/>
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
			<div>{ interiorFeaturesForm }</div>
        );
    }
}

export default PropertyInteriorFeaturesForm;