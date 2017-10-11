import React from 'react';
import StatesDropdown from '../../../helper/states_dropdown';
import { upperFirstLetter, phoneFormat, urlFormat } from "../../../helper/utils"

class ConfigurationVendor extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
			vendor: this.props.vendor
		}

		this.onHandleFormChange = this.onHandleFormChange.bind(this);
		this.handleFormSubmit   = this.handleFormSubmit.bind(this);
    }

	componentWillReceiveProps(nextProps) {
		if (nextProps.vendor !== this.props.vendor) {
			this.setState({
				vendor: nextProps.vendor
			});
		}
	}

    // Handle input changes
    onHandleFormChange(propertyName, event) {
    	let vendor 	    = this.state.vendor;
        let chosenValue = event.target.value;

        switch (propertyName) {
			case 'company':
			case 'street':
			case 'city':
			case 'contact':
				vendor[propertyName] = upperFirstLetter(chosenValue);
			break;

			case 'phone':
				vendor[propertyName] = phoneFormat(chosenValue);
			break;

			case 'url':
				vendor[propertyName] = urlFormat(chosenValue);
			break;

			default:
				vendor[propertyName] = chosenValue;
        }

        this.setState({
			vendor: vendor
        });
    }

    // Submit
    handleFormSubmit(event) {
		event.preventDefault();

		this.props.onHandleFormSubmit(this.state.vendor);
	}

    render() {
		let vendor = this.state.vendor;

		// Get api vehicles list
		let categoryOptions = this.props.categories.map((cat, catIndex) => {
			return (
				<option key={ catIndex } value={ cat.id }>{ upperFirstLetter(cat.name) }</option>
			);
		});

		let vendorForm =
			<form onSubmit={ this.handleFormSubmit }>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Category</label>
						<div className="input-group">
							<select
								onChange={ this.onHandleFormChange.bind(this, 'category_id') }
								value={ vendor.category_id }
								className="form-control input-sm"
								required="required">
								<option value="">Select One</option>
								{ categoryOptions }
							</select>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Company</label>
						<div className="input-group">
							<input
								type="text"
								onChange={ this.onHandleFormChange.bind(this, 'company') }
								value={ vendor.company }
								className="form-control input-sm"
								required="required"
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Street</label>
						<div className="input-group">
							<input
								type="text"
								onChange={ this.onHandleFormChange.bind(this, 'street') }
								value={ vendor.street }
								className="form-control input-sm"
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">City</label>
						<div className="input-group">
							<input
								type="text"
								onChange={ this.onHandleFormChange.bind(this, 'city') }
								value={ vendor.city }
								className="form-control input-sm"
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">State</label>
						<div className="input-group">
							<StatesDropdown
								state={ vendor.state }
								handleFormChange={ this.onHandleFormChange }
								className="form-control input-sm"
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Zip</label>
						<div className="input-group">
							<input
								type="text"
								onChange={ this.onHandleFormChange.bind(this, 'zip') }
								value={ vendor.zip }
								className="form-control input-sm"
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Country</label>
						<div className="input-group">
							<select
								onChange={ this.onHandleFormChange.bind(this, 'country') }
								value={ vendor.country }
								className="form-control input-sm">
								<option value="">Select One</option>
								<option value="US">United States</option>
							</select>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Phone</label>
						<div className="input-group">
							<input
								type="text"
								onChange={ this.onHandleFormChange.bind(this, 'phone') }
								value={ vendor.phone }
								className="form-control input-sm"
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Contact</label>
						<div className="input-group">
							<input
								type="text"
								onChange={ this.onHandleFormChange.bind(this, 'contact') }
								value={ vendor.contact }
								className="form-control input-sm"
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Url</label>
						<div className="input-group">
							<input
								type="text"
								onChange={ this.onHandleFormChange.bind(this, 'url') }
								value={ vendor.url }
								className="form-control input-sm"
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Notes</label>
						<div className="input-group">
								<textarea
									rows="5"
									className="form-control"
									onChange={ this.onHandleFormChange.bind(this, 'notes') }
									value={ vendor.notes }
								/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input type="hidden" value={ vendor.id }/>
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
			<div className="row" id="vendor-add">
				<div className="panel panel-info">
					<div className="panel-heading">
						<div className="row">
							<div className="col-xs-10 col-md-10">
								<span>Vendor</span>
							</div>
							<div className="col-xs-2 col-md-2">
								<button onClick={ this.props.closeRightPanel }><i className="fa fa-window-close" aria-hidden="true" /></button>
							</div>
						</div>
					</div>
					<div className="panel-body">
						{ vendorForm }
					</div>
				</div>
			</div>
        );
    }
}

export default ConfigurationVendor;