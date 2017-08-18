import React from 'react';
import PropertyView from './view';
import PropertyAdd from './add';
import PropertiesStore from '../../stores/properties/store';
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
			propertyId: this.props.location.state.property_id,
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			},
			showRightPanel: false,
			flashMessage: null
		};

		this._onChange 		 = this._onChange.bind(this);
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
		let flashMsg 		= PropertiesStore.getStoreFlashMessage();
		let isAuthenticated = PropertiesStore.isAuthenticated();
		let openRightPanel 	= PropertiesStore.openRightPanel();

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
				<PropertyView mobileWidth={this.state.columnCss.mobileWidth} desktopWidth={this.state.columnCss.desktopWidth} className="main-column" propertyId={this.state.propertyId} />
			</div>
		)
	}
}

PropertyDashboard.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default PropertyDashboard;