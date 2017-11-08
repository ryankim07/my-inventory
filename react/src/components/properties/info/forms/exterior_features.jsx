import React from 'react';
import { getSingleModifiedState } from '../../../helper/utils';

class PropertyExteriorFeaturesForm extends React.Component
{
	// Constructor
    constructor(props) {
        super(props);

        this.handleFormChange = this.handleFormChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

	// Handle form change
	handleFormChange(event) {
		this.props.onChange(getSingleModifiedState(this.props.exteriorFeatures, 'exterior_features', event.target.value));
	}

	// Handle form submit
    handleFormSubmit(event) {
		event.preventDefault();
		this.props.onSubmit(this.props.exteriorFeatures);
    }

    // Render
	render() {
		let exteriorFeaturesForm =
			<form onSubmit={ this.handleFormSubmit }>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Exterior</label>
						<div className="input-group">
								<textarea
									name="exterior"
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange }
									value={ this.props.exteriorFeatures.exterior }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Foundation</label>
						<div className="input-group">
								<textarea
									name="foundation"
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange }
									value={ this.props.exteriorFeatures.foundation }/>
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
									value={ this.props.exteriorFeatures.others }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input type="hidden" value={ this.props.exteriorFeatures.id }/>
							<input type="hidden" value={ this.props.exteriorFeatures.property_id }/>
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