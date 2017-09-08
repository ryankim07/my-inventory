import React from 'react';
import PropertiesStore from '../../../stores/properties/store';
import PropertiesAddressStore from '../../../stores/properties/address-store';
import PropertiesAddressAction from '../../../actions/properties-address-action';
import PropertyAddressList from './list';
import PropertyAdd from './add';
import FlashMessage from '../../flash-message';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';

class PropertyAddressDashboard extends React.Component
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
			addresses: [],
			isEditingMode: false,
			newAddressAdded: false,
			loader: true,
			showRightPanel: false,
			flashMessage: null,
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			},
		};

		this._onChange 		  	 = this._onChange.bind(this);
		this.handleFormChange 	 = this.handleFormChange.bind(this);
		this.handleAddressChange = this.handleAddressChange.bind(this);
		this.setAssets        	 = this.setAssets.bind(this);
		this.setFlashMessage  	 = this.setFlashMessage.bind(this);
		this.closeRightPanel  	 = this.closeRightPanel.bind(this);
	}

	componentWillMount() {
		PropertiesStore.addChangeListener(this._onChange);
		PropertiesStore.unsetStoreFlashMessage();
	}

	componentDidMount() {
		PropertiesAddressAction.getAddresses();
	}

	componentWillUnmount() {
		PropertiesStore.removeChangeListener(this._onChange);
		PropertiesStore.unsetPropertyToUpdate();
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
			this.context.router.push('/properties/addresses');

			return false;
		}

		return true;
	}

	_onChange() {
		let addresses 		  = PropertiesAddressStore.getAddresses();
		let addingNewProperty = PropertiesStore.isNewPropertyAdded();
		let propertyToUpdate  = PropertiesStore.getPropertyToUpdate();
		let savedProperty 	  = PropertiesStore.getSavedProperty();
		let flashMsg 		  = PropertiesStore.getStoreFlashMessage();
		let isAuthenticated   = PropertiesStore.isAuthenticated();
		let openRightPanel 	  = PropertiesStore.openRightPanel();
		let isEditingMode 	  = this.state.isEditingMode;
		let stateProperty 	  = savedProperty !== '' ? savedProperty : this.state.property;

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
			addresses: addresses,
			isEditingMode: isEditingMode,
			newPropertyAdded: addingNewProperty,
			flashMessage: flashMsg !== undefined ? flashMsg : null,
			showRightPanel: !!openRightPanel,
			loader: false,
			columnCss: {
				'mobileWidth': openRightPanel ? mainShrinkedMobileColumnWidth : mainDefaultMobileColumnWidth,
				'desktopWidth': openRightPanel ? mainShrinkedDesktopColumnWidth : mainDefaultDesktopColumnWidth
			}
		});
	}

	handleFormChange(property) {
		this.setState({property: property});
	}

	// Handle appropriate action whenever address fields are changed
	handleAddressChange(address) {
		this.setState({
			property: {
				id: this.state.property.id,
				style: this.state.property.style,
				beds: this.state.property.beds,
				baths: this.state.property.baths,
				finished_area: this.state.property.finished_area,
				unfinished_area: this.state.property.unfinished_area,
				total_area: this.state.property.total_area,
				floors: this.state.property.floors,
				built: this.state.property.built,
				parcel_number: this.state.property.parcel_number,
				assets: this.state.property.assets,
				address: address
			}
		});
	}

	setAssets(assets) {
		let property = this.state.property;
		property['assets'] = assets;
	}

	setFlashMessage($msg) {
		this.setState({flashMessage: $msg})
	}

	closeRightPanel() {
		this.setState({
			flashMessage: this.state.flashMessage,
			showRightPanel: false,
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			}
		});
	}

	render() {
		return (
			<div className="row">
				{ !this.state.flashMessage ? null : <FlashMessage message={ this.state.flashMessage } alertType="alert-success" /> }
				<PropertyAddressList
					state={ this.state }
					mobileWidth={ this.state.columnCss.mobileWidth }
					desktopWidth={ this.state.columnCss.desktopWidth }
					className="main-column" />
				{
					this.state.showRightPanel ?
						<PropertyAdd
							state={ this.state }
							handleFormChange={ this.handleFormChange }
							handleAddressChange={ this.handleAddressChange }
							closeRightPanel={ this.closeRightPanel }
							setAssets={ this.setAssets }
						/> : null
				}
			</div>
		)
	}
}

PropertyAddressDashboard.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default PropertyAddressDashboard;