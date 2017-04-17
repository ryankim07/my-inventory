import React from 'react';
import VehicleList from './vehicles-list';
import VehicleAdd from './vehicle-add';
import MyVehiclesStore from '../../stores/my-vehicles-store';
import FlashMessage from '../flash-message';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';

class VehiclesDashboard extends React.Component
{
	constructor() {
		super();

		this.state = {
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			},
			showRightPanel: false,
			flashMessage: ''
		};

		this._onChange = this._onChange.bind(this);
		this.setPanel = this.setPanel.bind(this);
		this.setFlashMessage = this.setFlashMessage.bind(this);
		this.closeRightPanel = this.closeRightPanel.bind(this);
	}

	componentWillMount() {
		MyVehiclesStore.addChangeListener(this._onChange);
		MyVehiclesStore.unsetStoreFlashMessage();
	}

	componentWillUnmount() {
		MyVehiclesStore.removeChangeListener(this._onChange);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.location.action !== 'POP') {
			this.setState({
				columnCss: {
					'mobileWidth': mainDefaultMobileColumnWidth,
					'desktopWidth': mainDefaultDesktopColumnWidth
				},
				showRightPanel: false,
				flashMessage: ''
			});
		}
	}

	_onChange() {
		let msg = MyVehiclesStore.getStoreFlashMessage();

		if (msg !== undefined) {
			this.setState({flashMessage: msg});
		}
	}

	setPanel() {
		this.setState({
			columnCss: {
				'mobileWidth': mainShrinkedMobileColumnWidth,
				'desktopWidth': mainShrinkedDesktopColumnWidth
			},
			showRightPanel: true
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
			showRightPanel: false
		});
	}

	render() {
		return (
			<div className="row">
				{ !this.state.flashMessage ? null : <FlashMessage message={this.state.flashMessage} />}
				<VehicleList mobileWidth={this.state.columnCss.mobileWidth} desktopWidth={this.state.columnCss.desktopWidth} className="main-column" setPanel={this.setPanel} />
				{ !this.state.showRightPanel ? null : <VehicleAdd closeRightPanel={this.closeRightPanel} />}
			</div>
		)
	}
}

export default VehiclesDashboard;