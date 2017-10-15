import React from 'react';

class PropertyInteriorFeaturesForm extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
			interiorFeatures: this.props.property.interior_features
        };

		this.handleFormChange = this.handleFormChange.bind(this);
    }

	handleFormChange(propertyName, event) {
		let interiorFeatures = this.state.interiorFeatures;
		interiorFeatures[propertyName] = event.target.value;

		this.setState({interiorFeatures: interiorFeatures});
	}

    // Submit
    handleFormSubmit(event) {
		event.preventDefault();

		this.props.onHandleFormSubmit(this.state.interiorFeatures, 'interior_features');
    }

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
							<input type="submit" value="Submit" className="btn"/>
						</div>
					</div>
				</div>
			</form>

        return (
			<div className="row" id="exterior-features-form">
				<div className="panel panel-info">
					<div className="panel-heading">
						<div className="row">
							<div className="col-xs-10 col-md-10">
								<span>Add Exterior Features</span>
							</div>
							<div className="col-xs-2 col-md-2">
								<button onClick={ this.props.closeRightPanel }><i className="fa fa-window-close" aria-hidden="true"/></button>
							</div>
						</div>
					</div>
					<div className="panel-body">
						{ interiorFeaturesForm }
					</div>
				</div>
			</div>
        );
    }
}

export default PropertyInteriorFeaturesForm;