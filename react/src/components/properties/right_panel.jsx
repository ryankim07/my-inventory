import React from 'react';

class PropertiesRightPanel extends React.Component
{
	render() {
		return (
			<div className="col-xs-4 col-md-4" id="right-panel">
				{ this.props.children }
			</div>
		)
	}
}

export default PropertiesRightPanel;