import React from 'react';
import Header from './header';
import Footer from './footer';

class Main extends React.Component {
    render() {
        return (
            <div className="app">
                <div className="header">
                    <Header/>
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