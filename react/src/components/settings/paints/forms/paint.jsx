import React from 'react';
import _ from 'lodash';
import Uploader from '../../../helper/uploader';
import VendorsAutoComplete from '../../../helper/forms/hybrid_field';
import { upperFirstLetter, getSingleModifiedState, getNestedModifiedState } from '../../../helper/utils';

class SettingsPaint extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.onHandleFormChange = this.onHandleFormChange.bind(this);
		this.handleVendor 	    = this.handleVendor.bind(this);
	}

	// Handle input changes
    onHandleFormChange(event) {
    	let fieldName 	= event.target.name;
        let chosenValue = event.target.value;
        let modified 	= {};

        switch (fieldName) {
			case 'name':
			case 'brand':
				modified[fieldName] = upperFirstLetter(chosenValue);
			break;

			case 'vendor':
				modified[fieldName]   = upperFirstLetter(chosenValue);
				modified['vendor_id'] = "";
			break;

			default:
				modified[fieldName] = chosenValue;
		}

		this.props.onChange(getNestedModifiedState(this.props.paint, modified));
    }

	// Handle when dropdown field is selected
	handleVendor(vendorId) {
		let obj = _.find(this.props.vendors, {'id': parseInt(vendorId)});
		let modified = {
			vendor_id: obj.id,
			vendor: obj.company
		};

		this.props.onChange(getNestedModifiedState(this.props.paint, modified));
	}

	// Render
    render() {
		let paintForm =
			<form onSubmit={ this.props.onSubmit }>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Image</label>
						<Uploader
							inputProps={
								{
									className: "input-group",
									assets: this.props.paint.assets,
									isEditingMode: this.props.isEditingMode
								}
							}
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Vendors</label>
						<VendorsAutoComplete
							inputProps={
								{
									auto: true,
									className: "",
									others: { name: "vendor" },
									list: this.props.vendors,
									label: "company",
									identifier: "id",
									value: this.props.paint.vendor,
									onChange: this.onHandleFormChange,
									onSelect: this.handleVendor
								}
							}
						/>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Brand</label>
						<div className="input-group">
							<input
								name="brand"
								type="text"
								onChange={ this.onHandleFormChange }
								value={ this.props.paint.brand }
								className="form-control input-sm"
								required="required"
							/>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Name</label>
						<div className="input-group">
							<input
								name="name"
								type="text"
								onChange={ this.onHandleFormChange }
								value={ this.props.paint.name }
								className="form-control input-sm"
								required="required"
							/>
						</div>
					</div>
				</div>
				<div>
					<div className="form-group required">
						<div className="col-xs-12 col-md-8">
							<label className="control-label">Number</label>
							<div className="input-group">
								<input
									name="number"
									type="text"
									onChange={ this.onHandleFormChange }
									value={ this.props.paint.number }
									className="form-control input-sm"
									required="required"
								/>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className="form-group">
						<div className="col-xs-12 col-md-8">
							<label className="control-label">Color</label>
							<div className="input-group">
								<input
									name="color"
									type="text"
									onChange={ this.onHandleFormChange }
									value={ this.props.paint.color }
									className="form-control input-sm"
								/>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className="form-group">
						<div className="col-xs-12 col-md-8">
							<label className="control-label">Hex</label>
							<div className="input-group">
								<input
									name="hex"
									type="text"
									onChange={ this.onHandleFormChange }
									value={ this.props.paint.hex }
									className="form-control input-sm"
								/>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className="form-group">
						<div className="col-xs-12 col-md-8">
							<label className="control-label">RGB</label>
							<div className="input-group">
								<input
									name="rgb"
									type="text"
									onChange={ this.onHandleFormChange }
									value={ this.props.paint.rgb }
									className="form-control input-sm"
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Notes</label>
						<div className="input-group">
								<textarea
									name="notes"
									rows="5"
									className="form-control"
									onChange={ this.onHandleFormChange }
									value={ this.props.paint.notes }
								/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input type="hidden" value={ this.props.paint.id }/>
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
			<div>{ paintForm }</div>
        );
    }
}

export default SettingsPaint;