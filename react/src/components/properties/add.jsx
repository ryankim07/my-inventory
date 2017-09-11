import React from 'react';
import PropertiesAction from '../../actions/properties-action';
import PropertyAddressAdd from './address/add';
import Uploader from '../helper/uploader';
import { numberFormat } from "../helper/utils"

class PropertyAdd extends React.Component
{
    constructor(props) {
        super(props);

        this.handleFormChange    = this.handleFormChange.bind(this);
        this.handleFormSubmit    = this.handleFormSubmit.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
		this.handleAssets 		 = this.handleAssets.bind(this);
    }

    // Handle input changes
    handleFormChange(propertyName, event) {
        let property    = this.props.state.property;
        let chosenValue = event.target.value;

        switch (propertyName) {
            case 'finished_area':
            case 'unfinished_area':
            case 'total_area':
                if (chosenValue === 0) {
                    alert('Please enter correct area.');
                } else {
					property[propertyName] = numberFormat(chosenValue);
                }
            break;

            default:
                property[propertyName] = chosenValue;
        }

        this.props.handleFormChange(property);
    }

	// Handle appropriate action whenever address fields are changed
	handleAddressChange(address) {
		let property        = this.props.state.property;
		property['address'] = address;

		this.props.handleFormChange(property);
	}

	// Handle assets
	handleAssets(assets) {
		let property       = this.props.state.property;
		property['assets'] = assets;

		this.props.handleFormChange(property);
	}

    // Submit
    handleFormSubmit(event) {
        event.preventDefault();

        if (!this.props.state.isEditingMode) {
			PropertiesAction.addProperty(this.props.state.property);
		} else {
			PropertiesAction.updateProperty(this.props.state.property);

        	// Close the panel
            this.props.closeRightPanel();
        }
    }

	render() {
        let builtOptions = [];
		let bedsOptions = [];
		let bathsOptions = [];
		let floorsOptions = [];

		// Built options
		for (let i = 1970; i <= 2050; i++) {
			builtOptions.push(<option key={'y-' + i} value={i}>{ i }</option>)
		}

		// Bed options
		for (let j = 0; j <= 15; j++) {
			bedsOptions.push(<option key={'be-' + j} value={j}>{ j }</option>)
		}

		// Bath options
		let half = 0;
		for (let k = 1; k <= 10; k++) {
			half = k + 0.5;
			bathsOptions.push(<option key={'ba-' + k} value={k}>{ k }</option>)
			bathsOptions.push(<option key={'ba-' + half} value={half}>{ half }</option>)
		}

		// Floor options
		for (let x = 0; x <= 10; x++) {
			floorsOptions.push(<option key={'f-' + x} value={x}>{ x }</option>)
		}

		let propertyForm =
			<form onSubmit={this.handleFormSubmit}>
				<div>
					<hr/>
					<p>General Information</p>
					<hr/>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Image</label>
						<div className="input-group">
							<Uploader handleAssets={this.handleAssets} isEditingMode={ this.props.state.isEditingMode } assets={ this.props.state.property.assets } />
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Built</label>
						<div className="input-group">
							<select ref="built"
									onChange={ this.handleFormChange.bind(this, 'built') }
									value={ this.props.state.property.built }
									className="form-control input-sm"
									required="required">
								<option value="">Select One</option>
								{ builtOptions }
							</select>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Style</label>
						<div className="input-group">
							<select ref="style"
									onChange={ this.handleFormChange.bind(this, 'style')}
									value={ this.props.state.property.style}
									className="form-control input-sm"
									required="required">
								<option value="">Select One</option>
								<option value="apartment">Apartment</option>
								<option value="attached-condo">Attached Condo</option>
								<option value="detached-condo">Detached Condo</option>
								<option value="townhouse">Townhouse</option>
								<option value="single-family">Single Family</option>
							</select>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Floors</label>
						<div className="input-group">
							<select ref="baths"
									onChange={ this.handleFormChange.bind(this, 'floors')}
									value={ this.props.state.property.floors}
									className="form-control input-sm"
									required="required">
								<option value="">Select One</option>
								{ floorsOptions }
							</select>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Beds</label>
						<div className="input-group">
							<select ref="beds"
									onChange={ this.handleFormChange.bind(this, 'beds') }
									value={ this.props.state.property.beds }
									className="form-control input-sm"
									required="required">
								<option value="">Select One</option>
								{ bedsOptions }
							</select>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Baths</label>
						<div className="input-group">
							<select ref="baths"
									onChange={ this.handleFormChange.bind(this, 'baths') }
									value={ this.props.state.property.baths }
									className="form-control input-sm"
									required="required">
								<option value="">Select One</option>
								{ bathsOptions }
							</select>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Finished Area</label>
						<div className="input-group">
							<input type="text"
								   ref="finished_area"
								   onChange={ this.handleFormChange.bind(this, 'finished_area') }
								   value={ this.props.state.property.finished_area }
								   className="form-control input-sm"/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Unfinished Area</label>
						<div className="input-group">
							<input type="text"
								   ref="unfinished_area"
								   onChange={ this.handleFormChange.bind(this, 'unfinished_area') }
								   value={ this.props.state.property.unfinished_area }
								   className="form-control input-sm"/>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Total Area</label>
						<div className="input-group">
							<input type="text"
								   ref="total_area"
								   onChange={ this.handleFormChange.bind(this, 'total_area') }
								   value={ this.props.state.property.total_area }
								   className="form-control input-sm"
								   required="required"/>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Parcel Number</label>
						<div className="input-group">
							<input type="text"
								   ref="total_area"
								   onChange={ this.handleFormChange.bind(this, 'parcel_number') }
								   value={ this.props.state.property.parcel_number }
								   className="form-control input-sm"
								   required="required"/>
						</div>
					</div>
				</div>
				<div>
					<hr/>
					<p>Address Information</p>
					<hr/>
				</div>

				<PropertyAddressAdd
					address={ this.props.state.property.address }
					handleAddressChange={ this.handleAddressChange }
				/>

				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input type="hidden" ref="id" value={ this.props.state.property.id } />
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-12">
						<div className="clearfix">
							<input type="submit" value="Add Property" className="btn"/>
						</div>
					</div>
				</div>
			</form>

        return (
            <div className="col-xs-4 col-md-4" id="property-add">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>Property</span>
                                </div>
                                <div className="col-xs-2 col-md-2">
                                    <button onClick={ this.props.closeRightPanel }><i className="fa fa-window-close" aria-hidden="true" /></button>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">
                            { propertyForm }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PropertyAdd.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default PropertyAdd;