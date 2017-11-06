import React from 'react';
import Header from './header';
import Main from './main';
import Footer from './footer';

class App extends React.Component {
	render() {
		return(
			<div className="app">
				<div className="header">
					<Header/>
				</div>
				<div className="body container-fluid">
					<div className="row-fluid">
						<Main/>
					</div>
				</div>
				<div className="footer">
					<Footer/>
				</div>
			</div>
		)
	}
}

export default App