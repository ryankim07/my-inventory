import React from 'react';
import { PropTypes } from 'prop-types';
import UsersAction from '../../actions/users-action';
import UsersStore from '../../stores/users/store';
import UsersMainPanel from './main_panel';
import UsersRightPanel from './right_panel';
import UserForm from './forms/user';
import UsersList from './list';
import FlashMessage from '../helper/flash_message';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';
let rightPanelMobileColumnWidth = 'col-xs-4';
let rightPanelDesktopColumnWidth = 'col-md-4';

class UsersDashboard extends React.Component
{
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
				'mobileWidth': mainDefaultMobileColumnWidth,
				'desktopWidth': mainDefaultDesktopColumnWidth
			},
			rightPanelColumnCss: {
				'mobileWidth': rightPanelMobileColumnWidth,
				'desktopWidth': rightPanelDesktopColumnWidth
			}
		};

		this._onChange 		  	= this._onChange.bind(this);
		this.onHandleFormSubmit = this.onHandleFormSubmit.bind(this);
		this.onHandleRightPanel = this.onHandleRightPanel.bind(this);
		this.onHandleRemove 	= this.onHandleRemove.bind(this);
		this.setFlashMessage  	= this.setFlashMessage.bind(this);
		this.closeRightPanel  	= this.closeRightPanel.bind(this);
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

	componentWillReceiveProps(nextProps) {
		if (nextProps.location.action !== 'POP') {
			this.setState({
				mainPanelColumnCss: {
					'mobileWidth': mainDefaultMobileColumnWidth,
					'desktopWidth': mainDefaultDesktopColumnWidth
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
				'mobileWidth': openRightPanel ? mainShrinkedMobileColumnWidth : mainDefaultMobileColumnWidth,
				'desktopWidth': openRightPanel ? mainShrinkedDesktopColumnWidth : mainDefaultDesktopColumnWidth
			}
		});
	}

	// Handle submit
	onHandleFormSubmit(user) {
		if (!this.state.isEditingMode) {
			UsersAction.addUser(user);
		} else {
			UsersAction.updateUser(user);
		}
	}

	// Handle right panel
	onHandleRightPanel(id) {
		let isEditingMode = !!id;
		let user = isEditingMode ?
			this.state.users.find(obj => obj.id === id) :
			{
				id: '',
				first_name: '',
				last_name: '',
				username: '',
				password: '',
				email: '',
				is_enabled: '',
				groups: [
					{
						id: '',
						role: '',
						username: ''
					}
				]
			}

		this.setState({
			user: user,
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
		UsersAction.removeUser(id);
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

				<UsersMainPanel mainPanelColumnCss={ this.state.mainPanelColumnCss }>
					<UsersList
						loader={ this.state.loader }
						user={ this.state.user }
						users={ this.state.users }
						onHandleRightPanel={ this.onHandleRightPanel }
						onHandleRemove={ this.onHandleRemove }
					/>
				</UsersMainPanel>

				{
					this.state.showRightPanel ?
						<UsersRightPanel rightPanelColumnCss={ this.state.rightPanelColumnCss }>
							<UserForm
								user={ this.state.user }
								isEditingMode={ this.state.isEditingMode }
								onHandleFormSubmit={ this.onHandleFormSubmit }
								closeRightPanel={ this.closeRightPanel }
							/>
						</UsersRightPanel> : null
				}
			</div>
		)
	}
}

UsersDashboard.contextTypes = {
	router: PropTypes.object.isRequired
}

export default UsersDashboard;