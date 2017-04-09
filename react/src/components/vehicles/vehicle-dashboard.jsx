import React from 'react';
import VehicleList from './vehicles-list';
import VehicleAdd from './vehicle-add';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';

class VehiclesDashboard extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			},
			showRightPanel: false
		};

		this.setPanel = this.setPanel.bind(this);
		this.closeRightPanel = this.closeRightPanel.bind(this);
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
				<VehicleList mobileWidth={this.state.columnCss.mobileWidth} desktopWidth={this.state.columnCss.desktopWidth} className="main-column" setPanel={this.setPanel} />
				{ !this.state.showRightPanel ? null : <VehicleAdd closeRightPanel={this.closeRightPanel} />}
			</div>
		)
	}
}

export default VehiclesDashboard;