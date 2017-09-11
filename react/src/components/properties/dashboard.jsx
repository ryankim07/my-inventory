import React from 'react';
import PropertiesAction from '../../actions/properties-action';
import PropertiesStore from '../../stores/properties/store';
import PropertiesList from './list';
import PropertyView from './view';
import PropertyAdd from './add';
import FlashMessage from '../flash-message';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';

class PropertyDashboard extends React.Component
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
				assets: [],
				address: {
					id: '',
					property_id: '',
					street: '',
					city: '',
					state: '',
					zip: '',
					county: '',
					country: '',
					subdivision: ''
				}
			},
			properties: [],
			isEditingMode: false,
			newPropertyAdded: false,
			loader: true,
			showRightPanel: false,
			flashMessage: null,
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			},
		};

		this._onChange 		  = this._onChange.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.setFlashMessage  = this.setFlashMessage.bind(this);
		this.closeRightPanel  = this.closeRightPanel.bind(this);
	}

	componentWillMount() {
		PropertiesStore.addChangeListener(this._onChange);
		PropertiesStore.unsetStoreFlashMessage();
	}

	componentDidMount() {
		PropertiesAction.getProperties();
		//PropertiesAction.getProperty(this.state.propertyId);
	}

	componentWillUnmount() {
		PropertiesStore.removeChangeListener(this._onChange);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.location.action !== 'POP') {
			this.setState({
				columnCss: {
					'mobileWidth': mainDefaultMobileColumnWidth,
					'desktopWidth': mainDefaultDesktopColumnWidth
				},
				showRightPanel: false,
				flashMessage: null
			});
		}
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
			this.context.router.push("/properties/dashboard");

			return false;
		}

		return true;
	}

	// State changes
	_onChange() {
		let properties		  = PropertiesStore.getProperties();
		let property 		  = PropertiesStore.getProperty();
		let addingNewProperty = PropertiesStore.isNewPropertyAdded();
		let propertyToUpdate  = PropertiesStore.getPropertyToUpdate();
		//@TODO
		let savedProperty 	  = PropertiesStore.getSavedProperty();
		let flashMsg 		  = PropertiesStore.getStoreFlashMessage();
		let isAuthenticated   = PropertiesStore.isAuthenticated();
		let openRightPanel 	  = PropertiesStore.openRightPanel();
		let isEditingMode 	  = this.state.isEditingMode;
		let stateProperty 	  = this.state.property;

		if (!isAuthenticated){
			this.context.router.push("/auth/login");
			return false;
		}

		this.setState({
			property: stateProperty,
			properties: properties,
			isEditingMode: isEditingMode,
			newPropertyAdded: addingNewProperty,
			showRightPanel: !!openRightPanel,
			flashMessage: flashMsg !== undefined ? flashMsg : null,
			loader: false,
			columnCss: {
				'mobileWidth': openRightPanel ? mainShrinkedMobileColumnWidth : mainDefaultMobileColumnWidth,
				'desktopWidth': openRightPanel ? mainShrinkedDesktopColumnWidth : mainDefaultDesktopColumnWidth
			},
		});
	}

	// Handle form changes
	handleFormChange(property) {
		this.setState({property: property});
	}

	// Set flash message
	setFlashMessage($msg) {
		this.setState({flashMessage: $msg})
	}

	// Close right panel
	closeRightPanel() {
		this.setState({
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			},
			showRightPanel: false
		});
	}

	// Render
	render() {
		return (
			<div className="row">
				{ !this.state.flashMessage ? null : <FlashMessage message={this.state.flashMessage} alertType="alert-success" />}
				<PropertiesList
					state={ this.state }
					mobileWidth={ this.state.columnCss.mobileWidth }
					desktopWidth={ this.state.columnCss.desktopWidth }
					className="main-column" />
				{/*{
					this.state.showRightPanel ?
					<PropertyView
						mobileWidth={this.state.columnCss.mobileWidth}
						desktopWidth={this.state.columnCss.desktopWidth}
						className="main-column"
						property={this.state.property}
						loader={this.state.loader}
					/> : null
				}*/}
				{
					this.state.showRightPanel ?
						<PropertyAdd
							state={ this.state }
							handleFormChange={ this.handleFormChange }
							closeRightPanel={ this.closeRightPanel }
						/> : null
				}
			</div>
		)
	}
}

PropertyDashboard.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default PropertyDashboard;