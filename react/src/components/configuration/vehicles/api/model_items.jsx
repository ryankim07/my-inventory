import React from 'react';

class ConfigurationVehicleModelItems extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			hoverFlag: false
		};
	}

	hoverEvent() {
		this.setState({
			hoverFlag: !this.state.hoverFlag
		});
	}

	render() {
		let trStyle = {
			background: '#ffffff'
		};

		let actions = null;

		if (this.props.selectedModel || this.state.hoverFlag) {
			trStyle['background'] = '#ececec';
			actions = <button onClick={ this.props.onHandleClick } ><i className="fa fa-search" aria-hidden="true"/></button>;
		}

        return (
			<tr onMouseEnter={ this.hoverEvent.bind(this) } onMouseLeave={ this.hoverEvent.bind(this) } style={ trStyle }>
				<td>{ this.props.modelName }</td>
				<td>{ actions }</td>
			</tr>
        )
    }
}

export default ConfigurationVehicleModelItems;