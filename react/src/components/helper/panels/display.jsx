/**
 * Display panel component
 *
 * Required props
 *
 * id: the ID
 * header: header text
 * iconBtn: Fontawesome icon attribute
 * onClick: method to handle on click event
 * showPreviousBtn: true or false
 * previousRoute: the route to be taken if show previous button is enabled
 */

import React from 'react';
import Previous from '../../helper/previous';

class DisplayPanel extends React.Component
{
	// Render
	render() {
		let buttonHtml = this.props.showPreviousBtn ?
			<Previous route={ this.props.previousRoute }/> :
			<button onClick={ this.props.onClick }><i className={ this.props.iconBtn } aria-hidden="true"/></button>

		return (
			<div className="row" id={ this.props.id }>
				<div className="panel panel-info">
					<div className="panel-heading">
						<div className="row">
							<div className="col-xs-10 col-md-10">
								<span>{ this.props.header }</span>
							</div>
							<div className="col-xs-2 col-md-2">
								{ buttonHtml }
							</div>
						</div>
					</div>
					<div className="panel-body">
						{ this.props.children }
					</div>
				</div>
			</div>
		)
	}
}

export default DisplayPanel;