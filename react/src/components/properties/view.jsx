import React from 'react';
import PropertiesStore from '../../stores/properties/store';
import PropertiesRoomsStore from '../../stores/properties/rooms-store';
import PropertiesAction from '../../actions/properties-action';
import Loader from '../loader';

class PropertyView extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            property: {},
			//isEditingMode: false,
			//flashMessage: null,
			loader: true
        };

        this._onChange 		    = this._onChange.bind(this);
        this.handleFormChange   = this.handleFormChange.bind(this);
        this.handleFormSubmit   = this.handleFormSubmit.bind(this);
		this.handleOtherActions = this.handleOtherActions.bind(this);
		this.setAssets 		    = this.setAssets.bind(this);
    }

    componentWillMount() {
        PropertiesStore.addChangeListener(this._onChange);
    }

	componentDidMount() {
		PropertiesAction.getProperty(this.props.propertyId);
	}

    componentWillUnmount() {
		PropertiesStore.removeChangeListener(this._onChange);
		//PropertiesStore.unsetPropertyToUpdate();
	}

    shouldComponentUpdate(nextProps, nextState) {
    	// Check here and don't render component again if it's an image upload action
		/*let emptyObj = _.every(_.values(nextState.property), function(v) {return !v;});
		if (nextState.property.assets !== '' && emptyObj) {
			return false;
		}

		// Only redirect to list if new property is being added
        if (nextState.newPropertyAdded || this.state.newPropertyAdded) {
			PropertiesStore.unFlagNewProperty();
			nextState.newPropertyAdded = false;
			//this.context.router.push('/property/address/add');

			this.context.router.push({
				pathname: "/property/address/add",
				state: {property_id: nextState.property.id}
			});

			return false;
		}*/

		return true;
    }

    // Listen to changes in store, update it's own state
    _onChange() {
    	let property = PropertiesStore.getProperty();
		PropertiesRoomsStore.setRooms(property.rooms);
		//let flashMsg = PropertiesStore.getStoreFlashMessage();
		let isAuthenticated = PropertiesStore.isAuthenticated();

		if (!isAuthenticated){
			this.context.router.push("/auth/login");
			return false;
		}

		/*if (!_.every(_.values(propertyToUpdate), function(v) {return !v;})) {
			stateProperty = propertyToUpdate;
			isEditingMode = true;
		}*/

		this.setState({
		    property: property,
			/*isEditingMode: isEditingMode,
			newPropertyAdded: addingNewProperty,*/
			//flashMessage: flashMsg !== undefined ? flashMsg : null,
			loader: false
		});
    }

    // Handle other actions
	handleOtherActions(e) {
    	let action = e.target.dataset.action;

		switch (action) {
			case 'view-rooms':
				this.context.router.push({
					pathname: "/properties/rooms/dashboard",
					state: {property_id: this.state.property.id}
				});
			break;
		}
	}

    // Handle input changes
    handleFormChange(propertyName, event) {
        /*let property    = this.state.property;
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

        this.setState({
            property: property,
			isEditingMode: this.state.isEditingMode,
			newPropertyAdded: this.state.newPropertyAdded,
			flashMessage: this.state.flashMessage
        });*/
    }

    // Submit
    handleFormSubmit(event) {
        event.preventDefault();

        /*if (!this.state.isEditingMode) {
			PropertiesAction.addProperty(this.state.property);
		} else {
			PropertiesAction.updateProperty(this.state.property);

        	// Close the panel
            this.props.closeRightPanel();
        }*/
    }

    // Set assets
    setAssets(assets) {
		let property = this.state.property;
		property['assets'] = assets;
	}

	render() {
		let propertyHtml = '';

		// If loading is complete
		if (!this.state.loader) {
			let property   = this.state.property;
			let address    = property.address;

			let propertyFeaturesBtn = property.property_features === undefined ?
				<button onClick={this.handleOtherActions} data-action="add-property-features">
					Add Property Features
				</button> : null;

			let exteriorFeaturesBtn = property.exterior_features === undefined ?
				<button onClick={this.handleOtherActions} data-action="add-exterior-features">
					Add Exterior Features
				</button> : null;

			let interiorFeaturesBtn = property.interior_features === undefined ?
				<button onClick={this.handleOtherActions} data-action="add-interior-features">
					Add Interior Features
				</button> : null;

			propertyHtml =
				<div>
					<div>
						{ propertyFeaturesBtn }
						{ exteriorFeaturesBtn }
						{ interiorFeaturesBtn }
					</div>
					<div>
						<h4>Address</h4>
						<ul>
							<li>
								<label>Street:</label>
								<span>{address.street}</span>
							</li>
							<li>
								<label>City:</label>
								<span>{address.city}</span>
							</li>
							<li>
								<label>State:</label>
								<span>{address.state}</span>
							</li>
							<li>
								<label>Zip:</label>
								<span>{address.zip}</span>
							</li>
							<li>
								<label>County:</label>
								<span>{address.county}</span>
							</li>
							<li>
								<label>Country:</label>
								<span>{address.country}</span>
							</li>
							<li>
								<label>Subdivision:</label>
								<span>{address.subdivision}</span>
							</li>
						</ul>
					</div>
					<div>
						<h4>Property Details</h4>
						<div>
							<button onClick={this.handleOtherActions} data-action="view-rooms">View Rooms</button>
						</div>
						<ul>
							<li>
								<label>Built:</label>
								<span>{property.built}</span>
							</li>
							<li>
								<label>Style:</label>
								<span>{property.style}</span>
							</li>
							<li>
								<label>Floors:</label>
								<span>{property.floors}</span>
							</li>
							<li>
								<label>Beds:</label>
								<span>{property.beds}</span>
							</li>
							<li>
								<label>Baths:</label>
								<span>{property.baths}</span>
							</li>
							<li>
								<label>Finished Area:</label>
								<span>{property.finished_area}</span>
							</li>
							<li>
								<label>Unfinished Area:</label>
								<span>{property.unfinished_area}</span>
							</li>
							<li>
								<label>Total Area:</label>
								<span>{property.total_area}</span>
							</li>
							<li>
								<label>Parcel Number:</label>
								<span>{property.parcel_number}</span>
							</li>
						</ul>
					</div>
				</div>
		} else {
			propertyHtml = <div><Loader /></div>;
		}

        return (
            <div className="col-xs-12 col-md-12" id="property-view">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-12 col-md-12">
                                    <span>Property Information</span>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">
                            { propertyHtml }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PropertyView.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default PropertyView;