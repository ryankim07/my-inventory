import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import AuthStore from '../stores/auth/store';

class Header extends React.Component
{
	// Render
    render() {
		let token 	   = AuthStore.getToken();
		let showHeader = token !== null;
		let isUser     = false;
		let isAdmin    = false;
		let userName   = '';

		if (token !== null) {
			let jwt = jwtDecode(token);
			userName = jwt.username;

			jwt.roles.map(role => {
				switch (role) {
					case 'ROLE_USER':
						isUser = true;
						break;

					case 'ROLE_ADMIN':
						isAdmin = true;
						break;
				}
			});
		}

		// Settings HTML
		let settingsHtml = isAdmin ?
			<li className="dropdown">
				<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Settings <span className="caret"/></a>
				<ul className="dropdown-menu">
					<li className="dropdown dropdown-submenu">
						<a href="#" className="dropdown-toggle" data-toggle="dropdown">API Vehicles</a>
						<ul className="dropdown-menu">
							<li><Link to="/settings/vehicles/dashboard/manufacturers"><i className="fa fa-car menu-link-icon" aria-hidden="true"/> List</Link></li>
						</ul>
					</li>
					<li className="dropdown dropdown-submenu">
						<a href="#" className="dropdown-toggle" data-toggle="dropdown">Paints</a>
						<ul className="dropdown-menu">
							<li><Link to="/settings/paints/dashboard/paints"><i className="fa fa-paint-brush menu-link-icon" aria-hidden="true"/> List</Link></li>
						</ul>
					</li>
					<li className="dropdown dropdown-submenu">
						<a href="#" className="dropdown-toggle" data-toggle="dropdown">Vendors</a>
						<ul className="dropdown-menu">
							<li><Link to="/settings/vendors/dashboard/vendors"><i className="fa fa-shopping-bag menu-link-icon" aria-hidden="true"/> List</Link></li>
						</ul>
					</li>
					<li className="dropdown-submenu">
						<a href="#" className="dropdown-toggle" data-toggle="dropdown">Users</a>
						<ul className="dropdown-menu">
							<li><Link to="/settings/users/dashboard/users"><i className="fa fa-users menu-link-icon" aria-hidden="true"/> List</Link></li>
						</ul>
					</li>
				</ul>
			</li> : null;

			// Testing HTML
			let testingHtml = isAdmin ?
				<li className="dropdown">
					<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Test <span className="caret"/></a>
					<ul className="dropdown-menu" role="menu">
						<li>
							<Link to="/test/component" className="menu-link"><i className="fa fa-home menu-link-icon" aria-hidden="true"/> Component</Link>
						</li>
					</ul>
				</li> : null;

			let headerHtml = showHeader ?
				<div className="navbar navbar-inverse navbar-fixed-top">
					<div className="container-fluid">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"/>
								<span className="icon-bar"/>
								<span className="icon-bar"/>
							</button>
						</div>
						<div id="navbar" className="navbar-collapse collapse">
							<ul className="nav navbar-nav navbar-left">
								<li className="dropdown">
									<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Vehicles <span className="caret"/></a>
									<ul className="dropdown-menu" role="menu">
										<li>
											<Link to="/vehicles/dashboard/add" className="menu-link"><i className="fa fa-car menu-link-icon" aria-hidden="true"/> Add</Link>
											<Link to="/vehicles/dashboard/list" className="menu-link"><i className="fa fa-car menu-link-icon" aria-hidden="true"/> All</Link>
										</li>
									</ul>
								</li>
								<li className="dropdown">
									<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Properties <span className="caret"/></a>
									<ul className="dropdown-menu" role="menu">
										<li>
											<Link to="/properties/dashboard/list" className="menu-link"><i className="fa fa-home menu-link-icon" aria-hidden="true"/> All</Link>
										</li>
									</ul>
								</li>

								{settingsHtml}
								{testingHtml}

							</ul>
							<ul className="nav navbar-nav navbar-right">
								<li className="dropdown">
									<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{ userName }<span className="caret"/></a>
									<ul className="dropdown-menu" role="menu">
										<li>
											<Link to="/auth/forms/logout" className="menu-link"><i className="fa fa-sign-out menu-link-icon" aria-hidden="true"/> Logout</Link>
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</div> : null;

        return (<div>{ headerHtml }</div>)
    }
}

export default withRouter(Header)