import React from 'react';

class ConfigurationMainPanel extends React.Component
{
	render() {
		return (
			<div className={ [this.props.mainPanelColumnCss.mobileWidth, this.props.mainPanelColumnCss.desktopWidth, 'main-column'].join(' ') } id="main-panel">
				{ this.props.children }
			</div>
		)
	}
}

export default ConfigurationMainPanel;