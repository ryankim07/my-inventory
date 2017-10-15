import React from 'react';
import StatesDropdown from '../../../helper/states_dropdown';
import { upperFirstLetter } from '../../../helper/utils';

class PropertyAddressForm extends React.Component
{
	constructor(props) {
		super(props);

		this.handleFormChange = this.handleFormChange.bind(this);
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

        this.props.onHandleFormChange('address', address);
    }

	render() {
    	let address = this.props.address;

        return (
			<div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Street</label>
						<div className="input-group">
							<input
								type="text"
								onChange={ this.handleFormChange.bind(this, 'street') }
								value={ address.street }
								className="form-control input-sm"
								required="required"
							/>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">City</label>
						<div className="input-group">
							<input
								type="text"
								onChange={ this.handleFormChange.bind(this, 'city') }
								value={ address.city }
								className="form-control input-sm"
								required="required"
							/>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">State</label>
						<div className="input-group">
						<StatesDropdown
							state={ address.state }
							handleFormChange={ this.handleFormChange }
							className="form-control input-sm"
							required="required"
						/>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Zip</label>
						<div className="input-group">
							<input
								type="text"
								onChange={ this.handleFormChange.bind(this, 'zip') }
								value={ address.zip }
								className="form-control input-sm"
								required="required"
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">County</label>
						<div className="input-group">
								<select
									onChange={ this.handleFormChange.bind(this, 'county') }
									value={ address.county }
									className="form-control input-sm">
								<option value="">Select One</option>
								<option value="Los Angeles County">Los Angeles County</option>
								<option value="Orange County">Orange County</option>
							</select>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Country</label>
						<div className="input-group">
								<select
									onChange={ this.handleFormChange.bind(this, 'country') }
									value={ address.country }
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
							<input
								type="text"
								onChange={ this.handleFormChange.bind(this, 'subdivision') }
								value={ address.subdivision }
								className="form-control input-sm"
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input type="hidden" value={ address.id }/>
						</div>
					</div>
				</div>
			</div>
        );
    }
}

export default PropertyAddressForm;