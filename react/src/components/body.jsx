import React from 'react';
import Header from './header';
import Footer from './footer';

class Body extends React.Component
{
    //Render
    render() {
		return (
            <div className="app">
                <div className="header">
                    <Header/>
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