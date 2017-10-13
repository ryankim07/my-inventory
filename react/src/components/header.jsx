import React from 'react';
import { Link } from 'react-router'

class Header extends React.Component
{
    render() {
        let isAuthenticated = this.props.isAuthenticated();

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
                                <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Vehicles <span className="caret"/></a>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        <Link to="/vehicles/dashboard" className="menu-link"><i className="fa fa-list-alt menu-link-icon" aria-hidden="true" /> All</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Properties <span className="caret"/></a>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        <Link to="/properties/dashboard" className="menu-link"><i className="fa fa-list-alt menu-link-icon" aria-hidden="true" /> All</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Users <span className="caret"/></a>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        <Link to="/users/dashboard" className="menu-link"><i className="fa fa-list-alt menu-link-icon" aria-hidden="true" /> List</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Configuration <span className="caret"/></a>
                                <ul className="dropdown-menu">
                                    <li className="dropdown dropdown-submenu">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">API Vehicles</a>
                                        <ul className="dropdown-menu">
                                            <li><Link to="/configuration/vehicles/dashboard/manufacturers"><i className="fa fa-list-alt menu-link-icon" aria-hidden="true" /> List</Link></li>
                                        </ul>
                                    </li>
                                    <li className="dropdown dropdown-submenu">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">Properties</a>
                                        <ul className="dropdown-menu">
                                            <li className="dropdown dropdown-submenu">
                                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Paints</a>
                                                <ul className="dropdown-menu">
                                                    <li><Link to="/configuration/properties/dashboard/paints-list"><i className="fa fa-list-alt menu-link-icon" aria-hidden="true" /> List</Link></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown dropdown-submenu">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">Vendors</a>
                                        <ul className="dropdown-menu">
                                            <li><Link to="/configuration/vendors/dashboard/vendors"><i className="fa fa-list-alt menu-link-icon" aria-hidden="true" /> List</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Ryan<span className="caret"/></a>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        <Link to="/auth/forms/logout" className="menu-link"><i className="fa fa-car menu-link-icon" aria-hidden="true" /> Logout</Link>
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