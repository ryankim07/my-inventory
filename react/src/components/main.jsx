import React from 'react';
import Header from './header';
import Footer from './footer';
import AuthStore from '../stores/auth/store';

class Main extends React.Component
{
	isAuthenticated() {
		return AuthStore.isAuthenticated()
    }

    render() {
		return (
            <div className="app">
                <div className="header">
                    <Header isAuthenticated={this.isAuthenticated} />
                </div>
                <div className="main container-fluid">
                    <div className="row-fluid">
                        {this.props.children}
                    </div>
                </div>
                <div className="footer">
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default Main;