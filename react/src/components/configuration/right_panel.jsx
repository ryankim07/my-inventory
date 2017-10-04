import React from 'react';

class ConfigurationRightPanel extends React.Component
{
	render() {
		return (
			<div className={ [this.props.rightPanelColumnCss.mobileWidth, this.props.rightPanelColumnCss.desktopWidth].join(' ') } id="right-panel">
				{ this.props.children }
			</div>
		)
	}
}

export default ConfigurationRightPanel;