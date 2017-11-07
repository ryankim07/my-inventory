import React from 'react';
import _ from 'lodash';
import YearsField from '../../helper/forms/hybrid_field';
import ColorsField  from '../../helper/forms/hybrid_field';
import Uploader from '../../helper/uploader';
import Loader from '../../helper/loader';
import { getVehicleColors } from "../../helper/lists/colors";
import { upperFirstLetter,
		 sequencedObject,
		 getSingleModifiedState,
		 getNestedModifiedState } from '../../helper/utils';

class VehicleForm extends React.Component
{
	// Constructor
    constructor(props) {
        super(props);

		this.state = {
			selectedItem: '',
			assets: []
		};

        this.onHandleFormChange = this.onHandleFormChange.bind(this);
		this.onHandleAssets     = this.onHandleAssets.bind(this);
		this.onHandleSubmit 	= this.onHandleSubmit.bind(this);
	}

	// Mounting component
	componentWillMount() {
		this.setState({
			selectedItem: this.props.vehicle.id,
			assets: this.props.vehicle.assets
		});
	}

	// Next state change
	componentWillReceiveProps(nextProps) {
		if (nextProps.vehicle.id !== this.state.selectedItem) {
			this.setState({
				selectedItem: nextProps.vehicle.id,
				assets: nextProps.vehicle.assets
			});
		}
    }

    // Handle input changes
    onHandleFormChange(event) {
    	let fieldName 	= event.target.name;
        let chosenValue = event.target.value;
		let modifiedObj = {};

        switch (fieldName) {
            case 'mfg_id':
            case 'model_id':
            case 'year':
			case 'color':
                if (chosenValue === 0) {
                    alert('Please select correct manufacturer.');
                } else {
					modifiedObj[fieldName] = chosenValue;
					modifiedObj['vin'] = '';
                }
            break;

			case 'vin':
			case 'plate':
				modifiedObj[fieldName] = chosenValue.toUpperCase();
			break;

            default:
				modifiedObj[fieldName] = upperFirstLetter(chosenValue);
        }

        this.props.onChange(getNestedModifiedState(this.props.vehicle, modifiedObj));
    }

	// Handle when years and color dropdown field is selected
	onHandleSelect(property, value) {
    	this.props.onChange(getSingleModifiedState(this.props.vehicle, property, value));
	}

	// Handle assets
	onHandleAssets(assets) {
		this.setState({ assets: assets });
	}

	onHandleSubmit(event) {
		event.preventDefault();

		let vehicle 	  = this.props.vehicle;
		vehicle['assets'] = this.state.assets;

		this.props.onSubmit(vehicle);
	}

	// Render
    render() {
		let manufacturers = this.props.manufacturers;
		let defaultMfgId  = this.props.vehicle.mfg_id !== "" ? parseInt(this.props.vehicle.mfg_id) : false;

		// Generate json list of manufacturers
		let mfgOptions = manufacturers.map((mfgs, mfgIndex) => {
			return (<option key={ mfgIndex } value={ mfgs.id }>{ mfgs.mfg }</option>);
		});

		// Get selected choice from api vehicles dropdown
		let selectedMfg = manufacturers.length > 0 && defaultMfgId ?
			_.filter(manufacturers, ['id', defaultMfgId]) : false;

		// Generate json list of models
		let modelsOptions = selectedMfg ? selectedMfg[0].models.map((manufacturer, modelIndex) => {
			return (<option key={ modelIndex } value={ manufacturer.model_id }>{ manufacturer.model }</option>);
		}) : '';

		// Need to display loader if add new vehicle component is accessed from header
		let mfgAndModelsFields = !this.props.loader ?
			<div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Manufacturer</label>
						<div className="input-group">
							<select
								name="mfg_id"
								className="form-control input-sm"
								value={ this.props.vehicle.mfg_id }
								onChange={ this.onHandleFormChange }
								required="required">
								<option value="">Select One</option>
								{ mfgOptions }
							</select>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Model</label>
						<div className="input-group">
							<select
								name="model_id"
								className="form-control input-sm"
								value={ this.props.vehicle.model_id }
								onChange={ this.onHandleFormChange }
								required="required">
								<option value="">Select One</option>
								{ modelsOptions }
							</select>
						</div>
					</div>
				</div>
			</div> : <div><Loader/></div>;

		let vehicleForm =
			<form onSubmit={ this.onHandleSubmit }>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Image</label>
						<Uploader
							inputProps={
								{   className: "input-group",
									assets: this.state.assets,
									onChange: this.onHandleAssets
								}
							}
						/>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Year</label>
						<YearsField
							inputProps={
								{
									auto: true,
									className: "",
									others: { name: "year" },
									list: sequencedObject(2010, (new Date()).getFullYear() + 1),
									value: this.props.vehicle.year,
									onChange: this.onHandleFormChange,
									onSelect: this.onHandleSelect.bind(this, 'year'),
								}
							}
						/>
					</div>
				</div>

				{ mfgAndModelsFields }

				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Color</label>
						<div className="input-group">
							<ColorsField
								inputProps={
									{
										auto: true,
										className: "",
										others: { name: "color" },
										list: getVehicleColors(),
										value: this.props.vehicle.color,
										onChange: this.onHandleFormChange,
										onSelect: this.onHandleSelect.bind(this, 'color'),
										required: "required"
									}
								}
							/>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">VIN</label>
						<div className="input-group">
							<input
								name="vin"
								type="text"
								onChange={ this.onHandleFormChange }
								value={ this.props.vehicle.vin }
								className="form-control input-sm"
								required="required"/>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Plate</label>
						<div className="input-group">
							<input
								name="plate"
								type="text"
								onChange={ this.onHandleFormChange }
								value={ this.props.vehicle.plate }
								className="form-control input-sm"
								required="required"/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input type="hidden" value={ this.props.vehicle.id }/>
							<input type="hidden" value={ this.props.vehicle.mfg }/>
							<input type="hidden" value={ this.props.vehicle.model }/>
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
			<div>{ vehicleForm }</div>
        );
    }
}

export default VehicleForm;