import React from 'react';
import PropertyRoomsList from './list';
import PropertyRoomAdd from './add';
import PropertyRoomsStore from '../../../stores/properties/rooms-store';
import FlashMessage from '../../flash-message';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';

class PropertyRoomsDashboard extends React.Component
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

		this._onChange 		 = this._onChange.bind(this);
		this.setFlashMessage = this.setFlashMessage.bind(this);
		this.closeRightPanel = this.closeRightPanel.bind(this);
	}

	componentWillMount() {
		PropertyRoomsStore.addChangeListener(this._onChange);
		PropertyRoomsStore.unsetStoreFlashMessage();
	}

	componentWillUnmount() {
		PropertyRoomsStore.removeChangeListener(this._onChange);
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
		let flashMsg 		= PropertyRoomsStore.getStoreFlashMessage();
		let isAuthenticated = PropertyRoomsStore.isAuthenticated();
		let openRightPanel 	= PropertyRoomsStore.openRightPanel();

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
				<PropertyRoomsList mobileWidth={this.state.columnCss.mobileWidth} desktopWidth={this.state.columnCss.desktopWidth} className="main-column" />
				{ !this.state.showRightPanel ? null : <PropertyRoomAdd closeRightPanel={this.closeRightPanel} />}
			</div>
		)
	}
}

PropertyRoomsDashboard.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default PropertyRoomsDashboard;