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

const mainDefaultMobileColumnWidth = 'col-xs-12';
const mainDefaultDesktopColumnWidth = 'col-md-12';
const mainShrinkedMobileColumnWidth = 'col-xs-8';
const mainShrinkedDesktopColumnWidth = 'col-md-8';
const rightPanelMobileColumnWidth = 'col-xs-4';
const rightPanelDesktopColumnWidth = 'col-md-4';

const groupsObj = {
	id: '',
	username: '',
	role: '',
	users: []
};

const initialUserObj = {
	id: '',
	first_name: '',
	last_name: '',
	username: '',
	password: '',
	email: '',
	is_enabled: '',
	groups: [groupsObj]
} ;

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
			alertType: 'success',
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
		this.onHandleFormChange = this.onHandleFormChange.bind(this);
		this.onHandleSubmit 	= this.onHandleSubmit.bind(this);
		this.onHandleSearch     = this.onHandleSearch.bind(this);
		this.onHandleRemove 	= this.onHandleRemove.bind(this);
		this.onHandleRightPanel = this.onHandleRightPanel.bind(this);
		this.setFlashMessage  	= this.setFlashMessage.bind(this);
		this.onCloseRightPanel  = this.onCloseRightPanel.bind(this);
	}

	componentWillMount() {
		UsersStore.addChangeListener(this._onChange);
		UsersStore.removeStoreStatus();
	}

	componentDidMount() {
		UsersAction.getUsers();
	}

	componentWillUnmount() {
		UsersStore.removeChangeListener(this._onChange);
	}

	// Store change
	_onChange() {
		let users 			= UsersStore.getUsers();
		let storeStatus 	= UsersStore.getStoreStatus();
		let isAuthenticated = UsersStore.isAuthenticated();
		let openRightPanel  = UsersStore.showRightPanel();

		if (!isAuthenticated){
			this.context.router.push("/auth/forms/login");
			return false;
		}

		this.setState({
			users: users,
			showRightPanel: !!openRightPanel,
			flashMessage: storeStatus.msg ? storeStatus.msg : null,
			alertType: storeStatus.type,
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

		// Instantiate new object or load existing object if found
		let user = isEditingMode ?
			this.state.users.find(obj => obj.id === id) : initialUserObj;

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

	// Handle form change
	onHandleFormChange(user) {
		this.setState({ user: user });
	}

	// Handle search
	onHandleSearch(users) {
		this.setState({ users: users });
	}

	// Handle delete
	onHandleRemove(id) {
		UsersAction.removeUser(id);
	}

	// Handle submit
	onHandleSubmit(event) {
		event.preventDefault();
		const user = this.state.user;

		if (!this.state.isEditingMode) {
			UsersAction.addUser(user);
		} else {
			UsersAction.updateUser(user);
		}
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
					onSearch={ this.onHandleSearch }
					onRemove={ this.onHandleRemove }
					onHandleRightPanel={ this.onHandleRightPanel }/>
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
					isEditingMode={ this.state.isEditingMode }
					onChange={ this.onHandleFormChange }
					onSubmit={ this.onHandleSubmit }/>
			</DisplayPanel> : null;

		let flashMessage = this.state.flashMessage ?
			<FlashMessage message={ this.state.flashMessage } alertType={ this.state.alertType }/> : null;

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