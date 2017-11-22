/**
 * Display panel component
 *
 * Required props
 *
 * id: the ID
 * header: header text
 * iconBtn: Fontawesome icon attribute
 * onClick: method to handle on click event
 */

import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

class DisplayPanel extends React.Component
{
	// Render
	render() {
		const headerStyle = {
			backgroundColor: this.props.headerBackground !== undefined ?
				this.props.headerBackground : '#CCC'
		};

		/*let clickBtn = this.props.onClick !== "" ?
			<button onClick={ this.props.onClick }><i className={ this.props.iconBtn } aria-hidden="true"/></button> : null;*/

		return (
			<Card>
				<CardHeader
					title={ this.props.title }
					subtitle={ this.props.subtitle}
					style={ headerStyle }
					avatar={ this.props.avatar }
				/>
				<CardText>
					{ this.props.children }
				</CardText>
			</Card>
		)
	}
}

export default DisplayPanel;