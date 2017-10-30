import React from 'react';
import { PropTypes } from 'prop-types';
import UsersAction from '../../../actions/users-action';
import UsersStore from '../../../stores/users/store';
import MainPanel from '../../helper/panels/main';
import DisplayPanel from '../../helper/panels/display';
import RightPanel from '../../helper/panels/right';
import SettingsUser from './../users/forms/user';
import SettingsUsersList from './../users/list';
import FlashMessage from '../../helper/flash_message';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';
let rightPanelMobileColumnWidth = 'col-xs-4';
let rightPanelDesktopColumnWidth = 'col-md-4';

class SettingsUsersDashboard extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			users: [],
			user: {},
			loader: true,
			isEditingMode: false,
			showRightPanel: false,
			flashMessage: null,
			mainPanelColumnCss: {
				mobileWidth: mainDefaultMobileColumnWidth,
				desktopWidth: mainDefaultDesktopColumnWidth
			},
			rightPanelColumnCss: {
				mobileWidth: rightPanelMobileColumnWidth,
				desktopWidth: rightPanelDesktopColumnWidth
			}
		};

		this._onChange 		  	= this._onChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
		this.onHandleRightPanel = this.onHandleRightPanel.bind(this);
		this.onHandleRemove 	= this.onHandleRemove.bind(this);
		this.setFlashMessage  	= this.setFlashMessage.bind(this);
		this.onCloseRightPanel  	= this.onCloseRightPanel.bind(this);
	}

	componentWillMount() {
		UsersStore.addChangeListener(this._onChange);
		UsersStore.unsetStoreFlashMessage();
	}

	componentDidMount() {
		UsersAction.getUsers();
	}

	componentWillUnmount() {
		UsersStore.removeChangeListener(this._onChange);
	}

	// Next state change
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.action !== 'POP') {
			this.setState({
				mainPanelColumnCss: {
					mobileWidth: mainDefaultMobileColumnWidth,
					desktopWidth: mainDefaultDesktopColumnWidth
				},
				showRightPanel: false,
				flashMessage: null
			});
		}
	}

	_onChange() {
		let users 			= UsersStore.getUsers();
		let flashMessage 	= UsersStore.getStoreFlashMessage();
		let isAuthenticated = UsersStore.isAuthenticated();
		let openRightPanel  = UsersStore.showRightPanel();

		if (!isAuthenticated){
			this.context.router.push("/auth/forms/login");
			return false;
		}

		this.setState({
			users: users,
			showRightPanel: !!openRightPanel,
			flashMessage: flashMessage !== undefined ? flashMessage : null,
			loader: false,
			mainPanelColumnCss: {
				mobileWidth: openRightPanel ? mainShrinkedMobileColumnWidth : mainDefaultMobileColumnWidth,
				desktopWidth: openRightPanel ? mainShrinkedDesktopColumnWidth : mainDefaultDesktopColumnWidth
			}
		});
	}

	// Handle right panel
	onHandleRightPanel(id) {
		let isEditingMode = !!id;

		// If a particular user is edited without submit and user selects
		// a new user to edit, we need to restore old user values.  Therefore,
		// we need to clone object to stop js original object reference
		let users = JSON.parse(JSON.stringify(this.state.users));

		let groupsObj = {
			id: '',
			username: '',
			role: '',
			users: []
		};

		// Instantiate new object or load existing object if found
		let user = isEditingMode ?
			users.find(obj => obj.id === id) :
			{
				id: '',
				first_name: '',
				last_name: '',
				username: '',
				password: '',
				email: '',
				is_enabled: '',
				groups: [groupsObj]
			};

		if (isEditingMode && user.groups.length === 0) {
			user.groups.push(groupsObj);
		}

		this.setState({
			user: user,
			isEditingMode: isEditingMode,
			showRightPanel: true,
			mainPanelColumnCss: {
				mobileWidth: mainShrinkedMobileColumnWidth,
				desktopWidth: mainShrinkedDesktopColumnWidth
			}
		});
	}

	// Set flash message
	setFlashMessage(msg) {
		this.setState({flashMessage: msg});
	}

	// Close right panel
	onCloseRightPanel() {
		this.setState({
			showRightPanel: false,
			mainPanelColumnCss: {
				mobileWidth: mainDefaultMobileColumnWidth,
				desktopWidth: mainDefaultDesktopColumnWidth
			}
		});
	}

	// Handle delete
	onHandleRemove(id) {
		UsersAction.removeUser(id);
	}

	// Handle submit
	onHandleSubmit(user) {
		if (!this.state.isEditingMode) {
			UsersAction.addUser(user);
		} else {
			UsersAction.updateUser(user);
		}
	}

	// Render
	render() {
		// Main panel
		let mainPanelHtml =
			<DisplayPanel
				id="users-list"
				header="Users List"
				additionalHeader=""
				iconBtn="fa fa-plus"
				onClick={ this.onHandleRightPanel.bind(this, false) }
				showPreviousBtn={ false }
				previousRoute="">
				<SettingsUsersList
					loader={ this.state.loader }
					user={ this.state.user }
					users={ this.state.users }
					onHandleRightPanel={ this.onHandleRightPanel }
					onHandleRemove={ this.onHandleRemove }/>
			</DisplayPanel>;

		// Right panel
		let rightPanelHtml = this.state.showRightPanel ?
			<DisplayPanel
				id="user-form"
				header="User"
				additionalHeader={ !this.state.isEditingMode ? "Add" : "Edit" }
				iconBtn="fa fa-window-close"
				onClick={ this.onCloseRightPanel }
				showPreviousBtn={ false }
				previousRoute="">
				<SettingsUser
					user={ this.state.user }
					onHandleSubmit={ this.onHandleSubmit }/>
			</DisplayPanel> : null;

		let flashMessage = this.state.flashMessage ?
			<FlashMessage message={ this.state.flashMessage } alertType="alert-success"/> : null;

		return (
			<div className="row">
				{ flashMessage }

				<MainPanel mainPanelColumnCss={ this.state.mainPanelColumnCss }>
					{ mainPanelHtml }
				</MainPanel>
				<RightPanel rightPanelColumnCss={ this.state.rightPanelColumnCss }>
					{ rightPanelHtml }
				</RightPanel>
			</div>
		)
	}
}

SettingsUsersDashboard.contextTypes = {
	router: PropTypes.object.isRequired
};

export default SettingsUsersDashboard;