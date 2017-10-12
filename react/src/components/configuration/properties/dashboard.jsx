import React from 'react';
import { PropTypes } from 'prop-types';
import PaintsAction from '../../../actions/paints-action';
import PaintsStore from '../../../stores/paints/store';
import ConfigurationMainPanel from './../main_panel';
import ConfigurationRightPanel from './../right_panel';
import ConfigurationPaintsList from './paints/list';
import ConfigurationPaint from './paints/forms/paint';
import FlashMessage from '../../helper/flash_message';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';
let rightPanelMobileColumnWidth = 'col-xs-4';
let rightPanelDesktopColumnWidth = 'col-md-4';

class ConfigurationPropertiesDashboard extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			paints: [],
			paint: {},
			vendors: [],
			isEditingMode: false,
			loader: true,
			mainPanel: this.props.params.section,
			showRightPanel: false,
			flashMessage: null,
			mainPanelColumnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			},
			rightPanelColumnCss: {
				'mobileWidth': rightPanelMobileColumnWidth,
				'desktopWidth': rightPanelDesktopColumnWidth
			}
		};

		this._onChange 		 	= this._onChange.bind(this);
		this.onHandleFormSubmit = this.onHandleFormSubmit.bind(this);
		this.onHandleRightPanel = this.onHandleRightPanel.bind(this);
		this.setFlashMessage 	= this.setFlashMessage.bind(this);
		this.closeRightPanel 	= this.closeRightPanel.bind(this);
	}

	componentWillMount() {
		PaintsStore.addChangeListener(this._onChange);
		PaintsStore.unsetStoreFlashMessage();
	}

	componentDidMount() {
		PaintsAction.getPaintsAndVendors();
	}

	componentWillUnmount() {
		PaintsStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		let paints		    = PaintsStore.getPaints();
		let vendors			= PaintsStore.getVendors();
		let flashMessage 	= PaintsStore.getStoreFlashMessage();
		let isAuthenticated = PaintsStore.isAuthenticated();
		let openRightPanel  = PaintsStore.showRightPanel();

		if (!isAuthenticated){
			this.context.router.push("/auth/login");
			return false;
		}

		this.setState({
			paints: paints,
			vendors: vendors,
			showRightPanel: !!openRightPanel,
			flashMessage: flashMessage !== undefined ? flashMessage : null,
			loader: false,
			mainPanelColumnCss: {
				'mobileWidth': openRightPanel ? mainShrinkedMobileColumnWidth : mainDefaultMobileColumnWidth,
				'desktopWidth': openRightPanel ? mainShrinkedDesktopColumnWidth : mainDefaultDesktopColumnWidth
			}
		});
	}

	// Handle submit
	onHandleFormSubmit(paint) {
		if (!this.state.isEditingMode) {
			PaintsAction.addPaint(paint);
		} else {
			PaintsAction.updatePaint(paint);
		}
	}

	// Handle right panel
	onHandleRightPanel(id) {
		let isEditingMode = !!id;
		let paint = isEditingMode ?
			this.state.paints.find(obj => obj.id === id) :
			{
				id: '',
				vendor_id: '',
				brand: '',
				name: '',
				number: '',
				color: '',
				hex: '',
				rgb: '',
				notes: ''
			}

		this.setState({
			paint: paint,
			isEditingMode: isEditingMode,
			showRightPanel: true,
			mainPanelColumnCss: {
				'mobileWidth': mainShrinkedMobileColumnWidth,
				'desktopWidth': mainShrinkedDesktopColumnWidth
			}
		});
	}

	// Handle delete
	onHandleRemove(id) {
		PaintsAction.removeVendor(id);
	}

	// Set flash message
	setFlashMessage(msg) {
		this.setState({flashMessage: msg});
	}

	// Close right panel
	closeRightPanel() {
		this.setState({
			showRightPanel: false,
			mainPanelColumnCss: {
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			}
		});
	}

	render() {
		return (
			<div className="row">
				{ !this.state.flashMessage ? null : <FlashMessage message={ this.state.flashMessage } alertType="alert-success" />}

				<ConfigurationMainPanel mainPanelColumnCss={ this.state.mainPanelColumnCss }>
					<ConfigurationPaintsList
						loader={ this.state.loader }
						paints={ this.state.paints }
						paint={ this.state.paint }
						onHandleRightPanel={ this.onHandleRightPanel }
						onHandleRemove={ this.onHandleRemove }
					/>
				</ConfigurationMainPanel>

				{
					this.state.showRightPanel ?
						<ConfigurationRightPanel rightPanelColumnCss={ this.state.rightPanelColumnCss }>
							<ConfigurationPaint
								paint={ this.state.paint }
								vendors={ this.state.vendors }
								isEditingMode={ this.state.isEditingMode }
								onHandleFormSubmit={ this.onHandleFormSubmit }
								closeRightPanel={ this.closeRightPanel }
							/>
						</ConfigurationRightPanel> : null
				}
			</div>
		)
	}
}

ConfigurationPropertiesDashboard.contextTypes = {
	router: PropTypes.object.isRequired
}

export default ConfigurationPropertiesDashboard;