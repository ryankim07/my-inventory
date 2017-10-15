import React from 'react';
import Header from './header';
import Footer from './footer';
import AuthStore from '../stores/auth/store';

class Body extends React.Component
{
    // Check if user is authenticated
	isAuthenticated() {
		return AuthStore.isAuthenticated()
    }

    render() {
		return (
            <div className="app">
                <div className="header">
                    <Header isAuthenticated={ this.isAuthenticated } />
                </div>
                <div className="body container-fluid">
                    <div className="row-fluid">
                        { this.props.children }
                    </div>
                </div>
                <div className="footer">
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default Body;