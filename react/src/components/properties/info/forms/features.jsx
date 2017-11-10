/**
 * This single component dynamically renders forms for
 * Features, Exterior Features and Interior Features
 */

import React from 'react';
import { upperFirstLetter, getNestedModifiedState, getSingleModifiedState } from '../../../helper/utils';

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
    	let property 	 = this.props.property;
    	let featuresType = this.props.featuresType;
    	let obj 		 = {};

    	obj[event.target.name] = event.target.value;
    	let modifiedFeatures   = getNestedModifiedState(property[featuresType], obj);
		let modifiedObj        = getSingleModifiedState(property, featuresType, modifiedFeatures);

		this.props.onChange(modifiedObj);
	}

	// Handle form submit
    handleFormSubmit(event) {
		event.preventDefault();
		this.props.onSubmit(this.props.property, this.props.featuresType);
    }

    // Render
	render() {
		let property 	   = this.props.property;
		let features       = property[this.props.featuresType];
    	let featuresFields = [];

		Object.keys(features).forEach((value, key) => {
			if (value === "id" || value === "property_id") {
				return;
			}

			featuresFields.push(
				<div key={key} className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">{ upperFirstLetter(value) }</label>
						<div className="input-group">
								<textarea
									name={value}
									rows="5"
									className="form-control"
									onChange={ this.handleFormChange }
									value={ features[value] }
								/>
						</div>
					</div>
				</div>
			);
		});

		let hiddenFields =
			<div className="form-group">
				<div className="col-xs-12 col-md-8">
					<div className="input-group">
						<input type="hidden" value={ features['id'] }/>
						<input type="hidden" value={ features['property_id'] }/>
					</div>
				</div>
			</div>;

		let submitField =
			<div className="form-group">
				<div className="col-xs-12 col-md-12">
					<div className="clearfix">
						<button type="submit" value="Save"><i className="fa fa-floppy-o"/> Save</button>
					</div>
				</div>
			</div>;

        return (
			<form onSubmit={ this.handleFormSubmit }>
				{ featuresFields }
				{ hiddenFields }
				{ submitField }
			</form>
        );
    }
}

export default PropertyFeaturesForm;