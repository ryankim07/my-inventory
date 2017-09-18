import React from 'react';
import PropertiesAction from '../../actions/properties-action';
import PropertiesStore from '../../stores/properties/store';
import PropertyAdd from './add';
import PropertiesList from './list';
import PropertyInfoDashboard from './info/dashboard';
import FlashMessage from '../helper/flash-message';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';
let mainColumnClassName = 'main-column';
let mainPanelDefaultName = 'list';
let mainPanelInfoDashboardName = 'info;'

class PropertiesDashboard extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			property: {},
			properties: [],
			isEditingMode: false,
			loader: true,
			mainPanel: mainPanelDefaultName,
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
		this.onHandleView 		= this.onHandleView.bind(this);
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
				showRightPanel: false,
				mainPanel: mainPanelDefaultName,
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
		let properties		= PropertiesStore.getProperties();
		let flashMessage 	= PropertiesStore.getStoreFlashMessage();
		let isAuthenticated = PropertiesStore.isAuthenticated();
		let openRightPanel 	= PropertiesStore.showRightPanel();

		if (!isAuthenticated){
			this.context.router.push("/auth/login");
			return false;
		}

		this.setState({
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

	// Handle right panel
	onHandleRightPanel(property, isEditingMode) {
		this.setState({
			property: property,
			isEditingMode: isEditingMode,
			showRightPanel: true,
			columnCss: {
				'mobileWidth': mainShrinkedMobileColumnWidth,
				'desktopWidth': mainShrinkedDesktopColumnWidth
			}
		});
	}

	// Handle view
	onHandleView(property) {
		this.setState({
			property: property,
			mainPanel: mainPanelInfoDashboardName,
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			}
		});
	}

	// Handle delete
	onHandleRemove(id) {
		PropertiesAction.removeProperty(id);
	}

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
						<PropertiesList
							state={ this.state }
							onHandleRightPanel={ this.onHandleRightPanel }
							onHandleView={ this.onHandleView }
							onHandleRemove={ this.onHandleRemove }
							className={ mainColumnClassName }
						/> :
						<PropertyInfoDashboard
							state={ this.state }
							className={ mainColumnClassName }
						/>
				}

				{
					this.state.showRightPanel ?
						<PropertyAdd
							state={ this.state }
							onHandleFormSubmit={ this.onHandleFormSubmit }
							closeRightPanel={ this.closeRightPanel }
						/> : null
				}
			</div>
		)
	}
}

PropertiesDashboard.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default PropertiesDashboard;