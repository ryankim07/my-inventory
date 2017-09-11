import React from 'react';
import { upperFirstLetter } from "../../helper/utils"

class PropertyAddressAdd extends React.Component
{
    constructor(props) {
        super(props);
    }

    // Handle input changes
    handleFormChange(propertyName, event) {
        let address     = this.props.address;
        let chosenValue = event.target.value;

        switch (propertyName) {
            case 'street':
            case 'city':
            case 'subdivision':
                address[propertyName] = upperFirstLetter(chosenValue);
            break;

            default:
                address[propertyName] = chosenValue;
        }

        this.props.handleAddressChange(address);
    }

	render() {
        return (
			<div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Street</label>
						<div className="input-group">
							<input type="text"
								   ref="street"
								   onChange={ this.handleFormChange.bind(this, 'street') }
								   value={ this.props.address.street }
								   className="form-control input-sm"
								   required="required"/>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">City</label>
						<div className="input-group">
							<input type="text"
								   ref="city"
								   onChange={ this.handleFormChange.bind(this, 'city') }
								   value={ this.props.address.city }
								   className="form-control input-sm"
								   required="required"/>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">State</label>
						<div className="input-group">
							<select ref="state"
									onChange={ this.handleFormChange.bind(this, 'state') }
									value={ this.props.address.built }
									className="form-control input-sm"
									required="required">
								<option value="">Select One</option>
								<option value="CA">CA</option>
							</select>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Zip</label>
						<div className="input-group">
							<input type="text"
								   ref="zip"
								   onChange={ this.handleFormChange.bind(this, 'zip') }
								   value={ this.props.address.zip }
								   className="form-control input-sm"
								   required="required"/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">County</label>
						<div className="input-group">
							<select ref="county"
									onChange={ this.handleFormChange.bind(this, 'county') }
									value={ this.props.address.county }
									className="form-control input-sm">
								<option value="">Select One</option>
								<option value="Orange County">Orange County</option>
							</select>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Country</label>
						<div className="input-group">
							<select ref="country"
									onChange={ this.handleFormChange.bind(this, 'country') }
									value={ this.props.address.country }
									className="form-control input-sm">
								<option value="">Select One</option>
								<option value="US">United States</option>
							</select>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Subdivision</label>
						<div className="input-group">
							<input type="text"
								   ref="subdivision"
								   onChange={ this.handleFormChange.bind(this, 'subdivision') }
								   value={ this.props.address.subdivision }
								   className="form-control input-sm"/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input type="hidden" ref="id" value={ this.props.address.id } />
						</div>
					</div>
				</div>
			</div>
        );
    }
}

export default PropertyAddressAdd;