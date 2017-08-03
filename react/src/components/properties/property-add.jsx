import React from 'react';
import PropertiesStore from '../../stores/properties-store';
import PropertiesAction from '../../actions/properties-action';
import Uploader from '../utils/uploader';
import Loader from '../loader';
import _ from 'lodash';

class PropertyAdd extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            property: {
                id: '',
                style: '',
                beds: '',
                baths: '',
                finished_area: '',
				unfinished_area: '',
                total_area: '',
                floors: '',
                built: '',
				parcel_number: '',
				assets: []
            },
			isEditingMode: false,
            newPropertyAdded: false,
            loader: true,
			flashMessage: null
        };

        this._onChange = this._onChange.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.setAssets = this.setAssets.bind(this);
		this.removeRougeChar = this.removeRougeChar.bind(this);
    }

    componentWillMount() {
        PropertiesStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
		PropertiesStore.removeChangeListener(this._onChange);
		PropertiesStore.unsetPropertyToUpdate();
	}

    shouldComponentUpdate(nextProps, nextState) {
    	// Check here and don't render component again if it's an image upload action
		let emptyObj = _.every(_.values(nextState.property), function(v) {return !v;});
		if (nextState.property.assets !== '' && emptyObj) {
			return false;
		}

		// Only redirect to list if new property is being added
        if (nextState.newPropertyAdded || this.state.newPropertyAdded) {
			PropertiesStore.unFlagNewProperty();
			nextState.newPropertyAdded = false;
			this.context.router.push('/properties/property-dashboard');
			return false;
		}

		return true;
    }

    // Listen to changes in store, update it's own state
    _onChange() {
    	let addingNewProperty = PropertiesStore.isNewPropertyAdded();
		let propertyToUpdate = PropertiesStore.getPropertyToUpdate();
		let isEditingMode = this.state.isEditingMode;
		let stateProperty = this.state.property;
		let flashMsg = PropertiesStore.getStoreFlashMessage();
		let isAuthenticated = PropertiesStore.isAuthenticated();

		if (!isAuthenticated){
			this.context.router.push("/auth/login");
			return false;
		}

		if (!_.every(_.values(propertyToUpdate), function(v) {return !v;})) {
			stateProperty = propertyToUpdate;
			isEditingMode = true;
		}

		this.setState({
		    property: stateProperty,
			isEditingMode: isEditingMode,
			newPropertyAdded: addingNewProperty,
			loader: false,
			flashMessage: flashMsg !== undefined ? flashMsg : null
		});
    }

    // Handle input changes
    handleFormChange(propertyName, event) {
        let property    = this.state.property;
        let chosenValue = event.target.value;

        switch (propertyName) {
            case 'finished_area':
            case 'unfinished_area':
            case 'total_area':
                if (chosenValue === 0) {
                    alert('Please enter correct area.');
                } else {
					var num = chosenValue.toString().replace(/,/gi, "").split("").reverse().join("");
					var replacement = this.removeRougeChar(num.replace(/(.{3})/g,"$1,").split("").reverse().join(""));
                    property[propertyName] = replacement;
                }
            break;

            default:
                property[propertyName] = chosenValue;
        }

        this.setState({
            property: property,
			isEditingMode: this.state.isEditingMode,
			newPropertyAdded: this.state.newPropertyAdded,
			flashMessage: this.state.flashMessage
        });
    }

    // Submit
    handleFormSubmit(event) {
        event.preventDefault();

        if (!this.state.isEditingMode) {
			PropertiesAction.addProperty(this.state.property);
			browserHistory.push();
		} else {
			PropertiesAction.updateProperty(this.state.property);

        	// Close the panel
            this.props.closeRightPanel();
        }
    }

    // Set assets
    setAssets(assets) {
		let property = this.state.property;
		property['assets'] = assets;
	}


	removeRougeChar(convertString) {
		if (convertString.substring(0, 1) == ",") {
			return convertString.substring(1, convertString.length)
		}

		return convertString;
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

		let propertyForm = <form onSubmit={this.handleFormSubmit}>
			<div className="form-group">
				<div className="col-xs-12 col-md-8">
					<label className="control-label">Image</label>
					<div className="input-group">
						<Uploader setAssets={this.setAssets} isEditingMode={this.state.isEditingMode} assets={this.state.property.assets} />
					</div>
				</div>
			</div>
			<div className="form-group required">
				<div className="col-xs-12 col-md-8">
					<label className="control-label">Built</label>
					<div className="input-group">
						<select ref="built"
								onChange={this.handleFormChange.bind(this, 'built')}
								value={this.state.property.built}
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
								onChange={this.handleFormChange.bind(this, 'style')}
								value={this.state.property.style}
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
								onChange={this.handleFormChange.bind(this, 'floors')}
								value={this.state.property.floors}
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
								onChange={this.handleFormChange.bind(this, 'beds')}
								value={this.state.property.beds}
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
								onChange={this.handleFormChange.bind(this, 'baths')}
								value={this.state.property.baths}
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
							   onChange={this.handleFormChange.bind(this, 'finished_area')}
							   value={this.state.property.finished_area}
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
							   onChange={this.handleFormChange.bind(this, 'unfinished_area')}
							   value={this.state.property.unfinished_area}
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
							   onChange={this.handleFormChange.bind(this, 'total_area')}
							   value={this.state.property.total_area}
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
							   onChange={this.handleFormChange.bind(this, 'parcel_number')}
							   value={this.state.property.parcel_number}
							   className="form-control input-sm"
							   required="required"/>
					</div>
				</div>
			</div>
			<div className="form-group">
				<div className="col-xs-12 col-md-8">
					<div className="input-group">
						<input type="hidden" ref="id" value={this.state.property.id} />
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
            <div className="col-xs-4 col-md-4" id="property-add">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>Property</span>
                                </div>
                                <div className="col-xs-2 col-md-2">
                                    { this.state.isEditingMode ? <button onClick={this.props.closeRightPanel} className="close close-viewer" value="Close"><span>&times;</span></button> : ''}
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