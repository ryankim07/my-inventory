import React from 'react';
import { FEATURES_PANEL } from '../../../helper/constants';

class PropertyFeaturesForm extends React.Component
{
	// Constructor
    constructor(props) {
        super(props);

        this.handleFormChange = this.handleFormChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

	// Handle form change
	handleFormChange(event) {
		this.props.onChange(getSingleModifiedState(this.props.property, FEATURES_PANEL, event.target.value));
	}

	// Handle form submit
    handleFormSubmit(event) {
		event.preventDefault();
		this.props.onSubmit(this.props.features);
    }

    // Render
	render() {
		let featuresForm =
			<form onSubmit={ this.handleFormSubmit }>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Parking</label>
						<div className="input-group">
								<textarea
									name="parking"
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange }
									value={ this.props.property.features.parking }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Multi Unit</label>
						<div className="input-group">
								<textarea
									name="multi_unit"
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange }
									value={ this.props.property.features.multi_unit }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Hoa</label>
						<div className="input-group">
								<textarea
									name="hoa"
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange }
									value={ this.props.property.features.hoa }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Utilities</label>
						<div className="input-group">
								<textarea
									name="utilities"
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange }
									value={ this.props.property.features.utilities }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Lot</label>
						<div className="input-group">
								<textarea
									name="lot"
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange }
									value={ this.props.property.features.lot }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Common Walls</label>
						<div className="input-group">
								<textarea
									name="common_walls"
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange }
									value={ this.props.property.features.common_walls }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Facing Direction</label>
						<div className="input-group">
								<textarea
									name="facing_direction"
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange }
									value={ this.props.property.features.facing_direction }/>
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
									value={ this.props.property.features.others }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input type="hidden" value={ this.props.property.features.id }/>
							<input type="hidden" value={ this.props.property.features.property_id }/>
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
			<div>{ featuresForm }</div>
        );
    }
}

export default PropertyFeaturesForm;