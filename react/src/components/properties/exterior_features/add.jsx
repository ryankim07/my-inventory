import React from 'react';

class PropertyExteriorFeaturesAdd extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            features: {
                id: '',
                property_id: this.props.location.state.property_id,
                exterior: '',
                foundation: '',
				others: ''
            },
			nonAddedFeatures: [],
			isEditingMode: false,
            newFeaturesAdded: false,
			flashMessage: null
        };

        this._onChange = this._onChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

	componentDidMount() {
		//PropertyExteriorFeaturesAction.getNonAddedFeatures(this.state.features.property_id);
	}

    componentWillUnmount() {
		PropertyExteriorFeaturesStore.removeChangeListener(this._onChange);
		PropertyExteriorFeaturesStore.unsetFeaturesToUpdate();
	}

    shouldComponentUpdate(nextProps, nextState) {
		// Only redirect to list if new exterior features is being added
        if (nextState.newFeaturesAdded || this.state.newFeaturesAdded) {
			PropertyExteriorFeaturesStore.unFlagNewFeatures();
			nextState.newFeaturesAdded = false;
			this.context.router.push('/properties/dashboard');
			return false;
		}

		return true;
    }

    // Listen to changes in store, update it's own state
    _onChange() {
    	/*let addingNewFeatures   = PropertyExteriorFeaturesStore.isNewFeaturesAdded();
		let featuresToUpdate    = PropertyExteriorFeaturesStore.getFeaturesToUpdate();
		let isEditingMode   = this.state.isEditingMode;
		let stateFeatures       = this.state.features;
		let flashMsg        = PropertyExteriorFeaturesStore.getStoreFlashMessage();
		let isAuthenticated = PropertyExteriorFeaturesStore.isAuthenticated();

		if (!isAuthenticated){
			this.context.router.push("/auth/login");
			return false;
		}

		if (!_.every(_.values(featuresToUpdate), function(v) {return !v;})) {
			stateFeatures = featuresToUpdate;
			isEditingMode = true;
		}

		this.setState({
		    features: stateFeatures,
			nonAddedFeatures: PropertyExteriorFeaturesStore.getNonAddedFeatures(),
			isEditingMode: isEditingMode,
			newFeaturesAdded: addingNewFeatures,
			flashMessage: flashMsg !== undefined ? flashMsg : null
		});*/
    }

    // Submit
    handleFormSubmit(event) {
        event.preventDefault();

        if (!this.state.isEditingMode) {
			PropertyExteriorFeaturesAction.addFeatures(this.state.features);
		} else {
			PropertyExteriorFeaturesAction.updateFeatures(this.state.features);

        	// Close the panel
            this.props.closeRightPanel();
        }
    }

	render() {
		let exteriorFeaturesForm = <form onSubmit={this.handleFormSubmit}>
			<div className="form-group">
				<div className="col-xs-12 col-md-8">
					<label className="control-label">Exterior</label>
					<div className="input-group">
							<textarea ref="exterior"
								rows="5"
								className="form-control">
							</textarea>
					</div>
				</div>
			</div>
			<div className="form-group">
				<div className="col-xs-12 col-md-8">
					<label className="control-label">Foundation</label>
					<div className="input-group">
							<textarea ref="foundation"
								rows="5"
								className="form-control">
							</textarea>
					</div>
				</div>
			</div>
			<div className="form-group">
				<div className="col-xs-12 col-md-8">
					<label className="control-label">Others</label>
					<div className="input-group">
							<textarea ref="others"
									  rows="5"
									  className="form-control">
							</textarea>
					</div>
				</div>
			</div>
			<div className="form-group">
				<div className="col-xs-12 col-md-8">
					<div className="input-group">
						<input type="hidden" ref="id" value={this.state.features.id} />
						<input type="hidden" ref="property_id" value={this.state.features.property_id} />
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
            <div className="col-xs-4 col-md-4" id="exterior-features-add">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>Add Exterior Features</span>
                                </div>
                                <div className="col-xs-2 col-md-2">
                                    { this.state.isEditingMode ? <button onClick={this.props.closeRightPanel} className="close close-viewer" value="Close"><span>&times;</span></button> : ''}
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">
                            { exteriorFeaturesForm }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PropertyExteriorFeaturesAdd.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default PropertyExteriorFeaturesAdd;