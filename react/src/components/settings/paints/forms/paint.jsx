import React from 'react';
import _ from 'lodash';
import Uploader from '../../../helper/uploader';
import VendorsAutoComplete from '../../../helper/forms/hybrid_field';
import { upperFirstLetter, getNestedModifiedState } from '../../../helper/utils';

class SettingsPaint extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			selectedItem: '',
			assets: []
		};

		this.onHandleFormChange = this.onHandleFormChange.bind(this);
		this.onHandleVendor     = this.onHandleVendor.bind(this);
		this.onHandleAssets     = this.onHandleAssets.bind(this);
		this.onHandleSubmit 	= this.onHandleSubmit.bind(this);
	}

	// Mounting component
	componentWillMount() {
		this.setState({
			selectedItem: this.props.paint.id,
			assets: this.props.paint.assets
		});
	}

	// Next state change
	componentWillReceiveProps(nextProps) {
		if (nextProps.paint.id !== this.state.selectedItem) {
			this.setState({
				selectedItem: nextProps.paint.id,
				assets: nextProps.paint.assets
			});
		}
	}

	// Handle input changes
    onHandleFormChange(event) {
    	let fieldName 	= event.target.name;
        let chosenValue = event.target.value;
        let modifiedObj = {};

        switch (fieldName) {
			case 'name':
			case 'brand':
				modifiedObj[fieldName] = upperFirstLetter(chosenValue);
			break;

			case 'vendor':
				modifiedObj[fieldName] = upperFirstLetter(chosenValue);
				modifiedObj['vendor_id'] = "";
			break;

			default:
				modifiedObj[fieldName] = chosenValue;
		}

		this.props.onChange(getNestedModifiedState(this.props.paint, modifiedObj));
    }

	// Handle when dropdown field is selected
	onHandleVendor(vendorId) {
		let obj = _.find(this.props.vendors, {'id': parseInt(vendorId)});
		let modifiedObj = {
			vendor_id: obj.id,
			vendor: obj.company
		};

		this.props.onChange(getNestedModifiedState(this.props.paint, modifiedObj));
	}

	// Handle assets
	onHandleAssets(assets) {
		this.setState({ assets: assets });
	}

	onHandleSubmit(event) {
		event.preventDefault();

		let paint 	    = this.props.paint;
		paint['assets'] = this.state.assets;

		this.props.onSubmit(paint);
	}

	// Render
    render() {
		let paintForm =
			<form onSubmit={ this.onHandleSubmit }>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Image</label>
						<Uploader
							inputProps={
								{
									className: "input-group",
									assets: this.state.assets,
									onChange: this.onHandleAssets
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
									onSelect: this.onHandleVendor
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