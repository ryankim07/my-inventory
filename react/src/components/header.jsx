import React from 'react';
import { Link } from 'react-router';
import jwtDecode from 'jwt-decode';
import AuthStore from '../stores/auth/store';

class Header extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			isAuthenticated: false,
			user: false,
			admin: false,
			username: ''
		};
	}

	componentWillMount() {
		let jwt = jwtDecode(AuthStore.getToken());
		let user = false;
		let admin = false;

		jwt.roles.map(role => {
			switch (role) {
				case 'ROLE_USER':
					user = true;
				break;

				case 'ROLE_ADMIN':
					admin = true;
				break;
			}
		});

	    this.setState({
			isAuthenticated: AuthStore.isAuthenticated()    ,
            user: user,
            admin: admin,
            username: jwt.username
        });
	}

    render() {
        return (
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

                            {
                                this.state.admin ?
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Settings <span className="caret"/></a>
                                        <ul className="dropdown-menu">
                                            <li className="dropdown-submenu">
                                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Users</a>
                                                <ul className="dropdown-menu">
                                                    <li><Link to="/settings/users/dashboard/users"><i className="fa fa-users menu-link-icon" aria-hidden="true"/> List</Link></li>
                                                </ul>
                                            </li>
                                            <li className="dropdown dropdown-submenu">
                                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">API Vehicles</a>
                                                <ul className="dropdown-menu">
                                                    <li><Link to="/settings/vehicles/dashboard/manufacturers"><i className="fa fa-car menu-link-icon" aria-hidden="true"/> List</Link></li>
                                                </ul>
                                            </li>
                                            <li className="dropdown dropdown-submenu">
                                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Properties</a>
                                                <ul className="dropdown-menu">
                                                    <li className="dropdown dropdown-submenu">
                                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">Paints</a>
                                                        <ul className="dropdown-menu">
                                                            <li><Link to="/settings/properties/dashboard/paints-list"><i className="fa fa-paint-brush menu-link-icon" aria-hidden="true"/> List</Link></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="dropdown dropdown-submenu">
                                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Vendors</a>
                                                <ul className="dropdown-menu">
                                                    <li><Link to="/settings/vendors/dashboard/vendors"><i className="fa fa-shopping-bag menu-link-icon" aria-hidden="true"/> List</Link></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li> : null
                            }
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{ this.state.username }<span className="caret"/></a>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        <Link to="/auth/forms/logout" className="menu-link"><i className="fa fa-sign-out menu-link-icon" aria-hidden="true"/> Logout</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;