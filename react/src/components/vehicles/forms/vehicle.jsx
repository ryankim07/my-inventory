import React from 'react';
import _ from 'lodash';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Uploader from '../../helper/uploader';
import Loader from '../../helper/loader';
import { vehicleValidators } from '../../helper/validation/vehicle';
import { updateValidators, resetValidators, displayValidationErrors, isFormValid } from '../../helper/validation/validator';
import { getVehicleColors } from "../../helper/lists/colors";
import { upperFirstLetter,
		 sequencedObject,
		 getNestedModifiedState } from '../../helper/utils';

const dataSourceConfig = {
	text: 'label',
	value: 'value',
};

class VehicleForm extends React.Component
{
	// Constructor
    constructor(props) {
        super(props);

		this.state = {
			years: [],
			colors: [],
			selectedItem: '',
			assets: []
		};

		// Initiate validators
		resetValidators(vehicleValidators);

        this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleAssets = this.onHandleAssets.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	}

	// Mounting component
	componentWillMount() {
		this.setState({
			years: sequencedObject(2010, (new Date()).getFullYear() + 1),
			colors: getVehicleColors(),
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
    onHandleChange(event) {
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
		updateValidators(vehicleValidators, fieldName, chosenValue);
    }

    // Handle select fields
	onHandleSelect(fieldName, event, index, chosenValue) {
		let modifiedObj = {};
		modifiedObj[fieldName] = chosenValue;
		modifiedObj['vin'] = '';

		this.props.onChange(getNestedModifiedState(this.props.vehicle, modifiedObj));
		updateValidators(vehicleValidators, fieldName, chosenValue);
	}

	// Handle auto complete fields
	onHandleAuto(fieldName, chosenValue) {
		let modifiedObj = {};
		modifiedObj[fieldName] = chosenValue;
		modifiedObj['vin'] = '';

		this.props.onChange(getNestedModifiedState(this.props.vehicle, modifiedObj));
		updateValidators(vehicleValidators, fieldName, chosenValue);
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

		let mfgOptions = _.map(manufacturers, function (mfg, optionIndex) {
			return <MenuItem key={ optionIndex } value={ mfg['id'] } primaryText={ mfg['mfg'] }/>
		});

		// Get selected choice from api vehicles dropdown
		let selectedMfg = manufacturers.length > 0 && defaultMfgId ?
			_.filter(manufacturers, ['id', defaultMfgId]) : false;

		// Generate json list of models
		let modelsOptions = selectedMfg ? selectedMfg[0].models.map((model, modelIndex) => {
			return <MenuItem key={ modelIndex } value={ model['model_id'] } primaryText={ model['model'] }/>
		}) : '';

		// Need to display loader if add new vehicle component is accessed from header
		let vehicleForm = !this.props.loader ?
			<form onSubmit={ this.onHandleSubmit }>
				<div>
					<label className="control-label">Photo</label>
					<Uploader
						inputProps={
							{   className: "input-group",
								assets: this.state.assets,
								onChange: this.onHandleAssets
							}
						}
					/>
				</div>
				<AutoComplete
					searchText={ this.props.vehicle.year }
					floatingLabelText="Year"
					filter={ AutoComplete.caseInsensitiveFilter }
					dataSource={ this.state.years }
					dataSourceConfig={ dataSourceConfig }
					errorText={ displayValidationErrors(vehicleValidators['year']) }
					onUpdateInput={ this.onHandleAuto.bind(this,  'year') }
					openOnFocus={ true }
				/><br/>
				<SelectField
					id="mfg_id"
					floatingLabelText="Manufacturer"
					value={ this.props.vehicle.mfg_id }
					onChange={ this.onHandleSelect.bind(this, 'mfg_id') }>
					{ mfgOptions }
				</SelectField><br/>
				<SelectField
					id="model_id"
					floatingLabelText="Model"
					value={ this.props.vehicle.model_id }
					onChange={ this.onHandleSelect.bind(this, 'model_id') }>
					{ modelsOptions }
				</SelectField><br/>
				<AutoComplete
					searchText={ this.props.vehicle.color }
					floatingLabelText="Color"
					filter={ AutoComplete.caseInsensitiveFilter }
					dataSource={ this.state.colors }
					dataSourceConfig={ dataSourceConfig }
					errorText={ displayValidationErrors(vehicleValidators['color']) }
					onUpdateInput={ this.onHandleAuto.bind(this,  'color') }
					openOnFocus={ true }
				/><br/>
				<TextField
					name="vin"
					type="text"
					value={ this.props.vehicle.vin }
					floatingLabelText="VIN"
					errorText={ displayValidationErrors(vehicleValidators['vin']) }
					onChange={ this.onHandleChange }
				/><br/>
				<TextField
					name="plate"
					type="text"
					value={ this.props.vehicle.plate }
					floatingLabelText="Plate"
					errorText={ displayValidationErrors(vehicleValidators['plate']) }
					onChange={ this.onHandleChange }
				/><br/>
				<div>
					<input type="hidden" value={ this.props.vehicle.id }/>
					<input type="hidden" value={ this.props.vehicle.mfg }/>
					<input type="hidden" value={ this.props.vehicle.model }/>
				</div>
				<RaisedButton
					type="submit"
					label="Save"
					disabled={ isFormValid(vehicleValidators) ? false : true }
				/>
			</form> : <div><Loader/></div>;

        return (
			<div>
				{ vehicleForm }
			</div>
        );
    }
}

export default VehicleForm;