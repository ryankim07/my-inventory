import React from 'react';
import PropertiesAction from '../../actions/properties-action';
import PropertiesStore from '../../stores/properties/store';
import PropertyView from './view';
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
			property: {},
			propertyId: this.props.location.state.property_id,
			columnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			},
			showRightPanel: false,
			flashMessage: null,
			loader: true
		};

		this._onChange 		 = this._onChange.bind(this);
		this.setFlashMessage = this.setFlashMessage.bind(this);
		this.closeRightPanel = this.closeRightPanel.bind(this);
	}

	componentWillMount() {
		PropertiesStore.addChangeListener(this._onChange);
		PropertiesStore.unsetStoreFlashMessage();
	}

	componentDidMount() {
		PropertiesAction.getProperty(this.state.propertyId);
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
		let property 		= PropertiesStore.getProperty();
		let flashMsg 		= PropertiesStore.getStoreFlashMessage();
		let isAuthenticated = PropertiesStore.isAuthenticated();
		let openRightPanel 	= PropertiesStore.openRightPanel();

		if (!isAuthenticated){
			this.context.router.push("/auth/login");
			return false;
		}

		this.setState({
			property: property,
			columnCss: {
				'mobileWidth': openRightPanel ? mainShrinkedMobileColumnWidth : mainDefaultMobileColumnWidth,
				'desktopWidth': openRightPanel ? mainShrinkedDesktopColumnWidth : mainDefaultDesktopColumnWidth
			},
			showRightPanel: !!openRightPanel,
			flashMessage: flashMsg !== undefined ? flashMsg : null,
			loader: false
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
				{ !this.state.flashMessage ? null : <FlashMessage message={this.state.flashMessage} alertType="alert-success" />}
				<PropertyView
					mobileWidth={this.state.columnCss.mobileWidth}
					desktopWidth={this.state.columnCss.desktopWidth}
					className="main-column"
					property={this.state.property}
					loader={this.state.loader}
				/>
			</div>
		)
	}
}

PropertyDashboard.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default PropertyDashboard;