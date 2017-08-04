import React from 'react';
import PropertiesList from './properties-list';
import PropertyAdd from './property-add';
import PropertiesStore from '../../stores/properties-store';
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
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			},
			showRightPanel: false,
			flashMessage: null
		};

		this._onChange = this._onChange.bind(this);
		this.setFlashMessage = this.setFlashMessage.bind(this);
		this.closeRightPanel = this.closeRightPanel.bind(this);
	}

	componentWillMount() {
		PropertiesStore.addChangeListener(this._onChange);
		PropertiesStore.unsetStoreFlashMessage();
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

	_onChange() {
		let flashMsg = PropertiesStore.getStoreFlashMessage();
		let isAuthenticated = PropertiesStore.isAuthenticated();
		let openRightPanel = PropertiesStore.openRightPanel();

		if (!isAuthenticated){
			this.context.router.push("/auth/login");
			return false;
		}

		this.setState({
			columnCss: {
				'mobileWidth': openRightPanel ? mainShrinkedMobileColumnWidth : mainDefaultMobileColumnWidth,
				'desktopWidth': openRightPanel ? mainShrinkedDesktopColumnWidth : mainDefaultDesktopColumnWidth
			},
			showRightPanel: !!openRightPanel,
			flashMessage: flashMsg !== undefined ? flashMsg : null
		});
	}

	setFlashMessage($msg) {
		this.setState({flashMessage: $msg})
	}

	closeRightPanel() {
		this.setState({
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			},
			showRightPanel: false,
			flashMessage: this.state.flashMessage
		});
	}

	render() {
		return (
			<div className="row">
				{ !this.state.flashMessage ? null : <FlashMessage message={this.state.flashMessage} alertType="alert-success" />}
				<PropertiesList mobileWidth={this.state.columnCss.mobileWidth} desktopWidth={this.state.columnCss.desktopWidth} className="main-column" />
				{ !this.state.showRightPanel ? null : <PropertyAdd closeRightPanel={this.closeRightPanel} />}
			</div>
		)
	}
}

PropertyDashboard.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default PropertyDashboard;