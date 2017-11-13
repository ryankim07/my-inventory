import React from 'react';

class CenterPanel extends React.Component
{
	render() {
		return (
			<div className={ [this.props.centerPanelColumnCss.mobileWidth, this.props.centerPanelColumnCss.desktopWidth].join(' ') } id="center-panel">
				{ this.props.children }
			</div>
		)
	}
}

export default CenterPanel;