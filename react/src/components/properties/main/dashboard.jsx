import React from 'react';
import PropertiesAction from '../../../actions/properties-action';
import PropertiesStore from '../../../stores/properties/store';
import PropertyForm from './forms/property';
import PropertiesList from './list';
import PropertyInfoView from './../info/view';
import PropertyFeaturesForm from './../info/forms/features';
import PropertyExteriorFeaturesForm from './../info/forms/exterior_features';
import PropertyInteriorFeaturesForm from './../info/forms/interior_features';
import PropertyRoomsList from './../rooms/list';
import PropertyRoomForm from './../rooms/forms/room';
import FlashMessage from '../../helper/flash-message';

// Global properties
let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';
let mainColumnClassName = 'main-column';

class PropertiesDashboard extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			property: {},
			properties: [],
			isEditingMode: false,
			loader: true,
			mainPanel: null,
			rightPanel: null,
			showRightPanel: false,
			flashMessage: null,
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			},
		};

		this._onChange 		    = this._onChange.bind(this);
		this.onHandleFormSubmit = this.onHandleFormSubmit.bind(this);
		this.onHandleRightPanel = this.onHandleRightPanel.bind(this);
		this.onHandleMainPanel 	= this.onHandleMainPanel.bind(this);
		this.setFlashMessage    = this.setFlashMessage.bind(this);
		this.closeRightPanel    = this.closeRightPanel.bind(this);
	}

	componentWillMount() {
		PropertiesStore.addChangeListener(this._onChange);
		PropertiesStore.unsetStoreFlashMessage();
	}

	componentDidMount() {
		PropertiesAction.getProperties();
	}

	componentWillUnmount() {
		PropertiesStore.removeChangeListener(this._onChange);
	}

	// When component from same route are unmounting and need to remount
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.action !== 'POP' || nextProps.location.action !== 'PUSH') {
			this.setState({
				mainPanel: this.state.mainPanel,
				showRightPanel: false,
				flashMessage: null,
				columnCss: {
					'mobileWidth': mainDefaultMobileColumnWidth,
					'desktopWidth': mainDefaultDesktopColumnWidth
				}
			});
		}
	}

	// State changes
	_onChange() {
		let property		= PropertiesStore.getProperty();
		let properties		= PropertiesStore.getProperties();
		let flashMessage 	= PropertiesStore.getStoreFlashMessage();
		let isAuthenticated = PropertiesStore.isAuthenticated();
		let openRightPanel 	= PropertiesStore.showRightPanel();

		if (!isAuthenticated){
			this.context.router.push("/auth/login");
			return false;
		}

		this.setState({
			property: property,
			properties: properties,
			showRightPanel: !!openRightPanel,
			flashMessage: flashMessage !== undefined ? flashMessage : null,
			loader: false,
			columnCss: {
				'mobileWidth': openRightPanel ? mainShrinkedMobileColumnWidth : mainDefaultMobileColumnWidth,
				'desktopWidth': openRightPanel ? mainShrinkedDesktopColumnWidth : mainDefaultDesktopColumnWidth
			},
		});
	}

	// Handle submit
	onHandleFormSubmit(property) {
		if (!this.state.isEditingMode) {
			PropertiesAction.addProperty(property);
		} else {
			PropertiesAction.updateProperty(property);
		}
	}

	// Handle delete
	onHandleRemove(id) {
		PropertiesAction.removeProperty(id);
	}

	// Handle main panel
	// ID will determine the state in which next panel should display
	onHandleMainPanel(id, panel) {
		this.setState({
			property: this.state.properties.find(obj => obj.id === id),
			mainPanel: panel,
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			}
		});
	}

	// Handle right panel
	onHandleRightPanel(property, isEditingMode, rightPanel) {
		this.setState({
			property: property,
			rightPanel: rightPanel,
			isEditingMode: isEditingMode,
			showRightPanel: true,
			columnCss: {
				'mobileWidth': mainShrinkedMobileColumnWidth,
				'desktopWidth': mainShrinkedDesktopColumnWidth
			}
		});
	}

	// Close right panel
	closeRightPanel() {
		this.setState({
			mainPanel: this.state.mainPanel,
			showRightPanel: false,
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			}
		});
	}

	// Set flash message
	setFlashMessage($msg) {
		this.setState({flashMessage: $msg})
	}

	// Render
	render() {
		// Main panel
		let mainPanelHtml = '';
		switch (this.state.mainPanel) {
			case 'info':
				mainPanelHtml =
					<PropertyInfoView
						state={ this.state }
						onHandleRightPanel={ this.onHandleRightPanel }
						onHandleMainPanel={ this.onHandleMainPanel }
						className={ mainColumnClassName }
					/>;
			break;

			case 'rooms':
				mainPanelHtml =
					<PropertyRoomsList
						state={ this.state }
						onHandleRightPanel={ this.onHandleRightPanel }
						onHandleRemove={ this.onHandleRemove }
						className="main-column"
					/>;
			break;

			default:
				mainPanelHtml =
					<PropertiesList
						state={ this.state }
						onHandleRightPanel={ this.onHandleRightPanel }
						onHandleMainPanel={ this.onHandleMainPanel }
						onHandleRemove={ this.onHandleRemove }
						className={ mainColumnClassName }
					/>;
		}

		// Right panel
		let rightPanelHtml = '';
		switch (this.state.rightPanel) {
			case 'features':
				rightPanelHtml =
					<PropertyFeaturesForm
						state={ this.state }
						onHandleFormSubmit={ this.onHandleFormSubmit }
						closeRightPanel={ this.closeRightPanel }
					/>;
				break;

			case 'exterior-features':
				rightPanelHtml =
					<PropertyExteriorFeaturesForm
						state={ this.state }
						onHandleFormSubmit={ this.onHandleFormSubmit }
						closeRightPanel={ this.closeRightPanel }
					/>;
			break;

			case 'interior-features':
				rightPanelHtml =
					<PropertyInteriorFeaturesForm
						state={ this.state }
						onHandleFormSubmit={ this.onHandleFormSubmit }
						closeRightPanel={ this.closeRightPanel }
					/>;
			break;

			case 'add-room':
				rightPanelHtml =
					<PropertyRoomForm
						state={ this.state }
						onHandleFormSubmit={ this.onHandleFormSubmit }
						closeRightPanel={ this.closeRightPanel }
					/>
			break;

			default:
				rightPanelHtml =
					<PropertyForm
						state={ this.state }
						onHandleFormSubmit={ this.onHandleFormSubmit }
						closeRightPanel={ this.closeRightPanel }
					/>;
		}

		return (
			<div className="row">
				{ !this.state.flashMessage ? null : <FlashMessage message={this.state.flashMessage } alertType="alert-success" />}
				{ mainPanelHtml }
				{ this.state.showRightPanel ? rightPanelHtml : null }
			</div>
		)
	}
}

PropertiesDashboard.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default PropertiesDashboard;