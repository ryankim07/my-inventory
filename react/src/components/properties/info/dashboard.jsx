import React from 'react';
import PropertiesAction from '../../../actions/properties-action';
import PropertiesStore from '../../../stores/properties/store';
import PropertyRoomsDashboard from '../rooms/dashboard';
import PropertyInfoView from './view';
import PropertyAddFeatures from '../info/add_features';
import PropertyAddExteriorFeatures from '../info/add_exterior_features';
import PropertyAddInteriorFeatures from '../info/add_interior_features';
import FlashMessage from '../../helper/flash-message';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';
let mainColumnClassName = 'main-column';
let mainPanelDefaultName = 'info';
let mainPanelRoomsDashboardName = 'rooms-dashboard';
let sidePanelFeaturesName = 'features';
let sidePanelExteriorFeaturesName = 'exterior-features';
let sidePanelInteriorFeaturesName = 'interior-features';

class PropertyInfoDashboard extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			property: this.props.state.property,
			features: {},
			exteriorFeatures: {},
			interiorFeatures: {},
			isEditingMode: false,
			mainPanel: mainPanelDefaultName,
			sidePanel: null,
			showRightPanel: false,
			flashMessage: null,
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			},
		};

		this._onChange 		    = this._onChange.bind(this);
		this.onHandleRightPanel = this.onHandleRightPanel.bind(this);
		this.onHandleView 		= this.onHandleView.bind(this);
		this.setFlashMessage    = this.setFlashMessage.bind(this);
		this.closeRightPanel    = this.closeRightPanel.bind(this);
	}

	componentWillMount() {
		PropertiesStore.addChangeListener(this._onChange);
		PropertiesStore.unsetStoreFlashMessage();
	}

	componentWillUnmount() {
		PropertiesStore.removeChangeListener(this._onChange);
	}

	// When component from same route are unmounting and need to remount
	/*componentWillReceiveProps(nextProps) {
		if (nextProps.location.action !== 'POP' || nextProps.location.action !== 'PUSH') {
			this.setState({
				showRightPanel: false,
				mainPanel: mainPanelDefaultName,
				flashMessage: null,
				columnCss: {
					'mobileWidth': mainDefaultMobileColumnWidth,
					'desktopWidth': mainDefaultDesktopColumnWidth
				}
			});
		}
	}*/

	// State changes
	_onChange() {
		let property		= PropertiesStore.getProperty();
		let flashMessage 	= PropertiesStore.getStoreFlashMessage();
		let isAuthenticated = PropertiesStore.isAuthenticated();
		let openRightPanel 	= PropertiesStore.showRightPanel();

		if (!isAuthenticated){
			this.context.router.push("/auth/login");
			return false;
		}

		this.setState({
			property: property,
			showRightPanel: !!openRightPanel,
			flashMessage: flashMessage !== undefined ? flashMessage : null,
			columnCss: {
				'mobileWidth': openRightPanel ? mainShrinkedMobileColumnWidth : mainDefaultMobileColumnWidth,
				'desktopWidth': openRightPanel ? mainShrinkedDesktopColumnWidth : mainDefaultDesktopColumnWidth
			},
		});
	}

	// Handle submit
	onHandleFormSubmit(property) {
		PropertiesAction.updateProperty(property);
	}

	// Handle right panel
	onHandleRightPanel(panel, features, isEditingMode) {
		this.setState({
			features: panel === sidePanelFeaturesName ? features : null,
			exteriorFeatures: panel === sidePanelExteriorFeaturesName ? features : null,
			interiorFeatures: panel === sidePanelInteriorFeaturesName ? features : null,
			isEditingMode: isEditingMode,
			showRightPanel: true,
			sidePanel: panel,
			columnCss: {
				'mobileWidth': mainShrinkedMobileColumnWidth,
				'desktopWidth': mainShrinkedDesktopColumnWidth
			}
		});
	}

	// Handle view
	onHandleView(panel) {
		this.setState({
			mainPanel: panel,
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			}
		});
	}

	// Handle delete
	/*onHandleRemove(id) {
		PropertiesAction.removeProperty(id);
	}*/

	// Set flash message
	setFlashMessage($msg) {
		this.setState({flashMessage: $msg})
	}

	// Close right panel
	closeRightPanel() {
		this.setState({
			mainPanel: mainPanelDefaultName,
			showRightPanel: false,
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			}
		});
	}

	// Render
	render() {
		let mainPanelHtml = this.state.mainPanel === mainPanelDefaultName ?
			<PropertyInfoView
				state={ this.state }
				className={ mainColumnClassName }
				onHandleRightPanel={ this.onHandleRightPanel }
				onHandleView={ this.onHandleView }
				mainPanelRoomsDashboardName={ mainPanelRoomsDashboardName }
				sidePanelFeaturesName={ sidePanelFeaturesName }
				sidePanelExteriorFeaturesName={ sidePanelExteriorFeaturesName }
				sidePanelInteriorFeaturesName={ sidePanelInteriorFeaturesName }
			/> :
			<PropertyRoomsDashboard
				state={ this.state }
			/>;

		let sidePanelHtml = '';
		switch (this.state.sidePanel) {
			case sidePanelFeaturesName:
				sidePanelHtml =
					<PropertyAddFeatures
						state={ this.state }
						onHandleFormSubmit={ this.onHandleFormSubmit }
						closeRightPanel={ this.closeRightPanel }
					/>;
			break;

			case sidePanelExteriorFeaturesName:
				sidePanelHtml =
					<PropertyAddExteriorFeatures
						state={ this.state }
						onHandleFormSubmit={ this.onHandleFormSubmit }
						closeRightPanel={ this.closeRightPanel }
					/>;
			break;

			case sidePanelInteriorFeaturesName:
				sidePanelHtml =
					<PropertyAddInteriorFeatures
						state={ this.state }
						onHandleFormSubmit={ this.onHandleFormSubmit }
						closeRightPanel={ this.closeRightPanel }
					/>;
			break;
		}

		return (
			<div className="row">
				{ !this.state.flashMessage ? null : <FlashMessage message={this.state.flashMessage } alertType="alert-success" />}
				{ mainPanelHtml }
				{ this.state.showRightPanel ? sidePanelHtml : null }
			</div>
		)
	}
}

PropertyInfoDashboard.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default PropertyInfoDashboard;