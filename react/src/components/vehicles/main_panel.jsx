import React from 'react';

class VehiclesMainPanel extends React.Component
{
	render() {
		return (
			<div className={[this.props.columnCss.mobileWidth, this.props.columnCss.desktopWidth, this.props.className].join(' ')} id="main-panel">
				{ this.props.children }
			</div>
		)
	}
}

export default VehiclesMainPanel;