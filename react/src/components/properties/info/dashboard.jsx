import React from 'react';
import PropertiesAction from '../../../actions/properties-action';
import PropertiesStore from '../../../stores/properties/store';
import PropertyRoomsDashboard from '../rooms/dashboard';
import PropertyInfoView from './view';
import PropertyExteriorFeaturesAdd from '../exterior_features/add';
import FlashMessage from '../../helper/flash-message';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';
let mainColumnClassName = 'main-column';
let mainPanelDefaultName = 'info';
let mainPanelRoomsDashboardName = 'rooms-dashboard;'

class PropertyInfoDashboard extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			property: this.props.state.property,
			exteriorFeatures: {},
			isEditingMode: false,
			mainPanel: mainPanelDefaultName,
			showRightPanel: false,
			flashMessage: null,
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			},
		};

		this.onHandleRightPanel = this.onHandleRightPanel.bind(this);
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
		let columnCss = {
			'mobileWidth': mainShrinkedMobileColumnWidth,
			'desktopWidth': mainShrinkedDesktopColumnWidth
		};

		let showRightPanel = true;

		switch (panel) {
			case 'add-exterior-features':
				this.setState({
					exteriorFeatures: features,
					isEditingMode: isEditingMode,
					showRightPanel,
					columnCss
				});
			break;
		}
	}

	// Handle view
	onHandleView(property) {
		this.setState({
			property: property,
			mainPanel: mainPanelRoomsDashboardName,
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
		return (
			<div className="row">
				{ !this.state.flashMessage ? null : <FlashMessage message={this.state.flashMessage } alertType="alert-success" />}

				{
					this.state.mainPanel === mainPanelDefaultName ?
						<PropertyInfoView
							state={ this.state }
							className={ mainColumnClassName }
							onHandleRightPanel={ this.onHandleRightPanel }
							onHandleView={ this.onHandleView }
						/> :
						<PropertyRoomsDashboard
							rooms={ this.state.property.rooms }
						/>
				}

				{
					this.state.showRightPanel ?
						<PropertyExteriorFeaturesAdd
							state={ this.state }
							onHandleFormSubmit={ this.onHandleFormSubmit }
							closeRightPanel={ this.closeRightPanel }
						/> : null
				}
			</div>
		)
	}
}

export default PropertyInfoDashboard;