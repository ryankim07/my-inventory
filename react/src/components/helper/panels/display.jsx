/**
 * Display panel component
 *
 * Required props
 *
 * id: the ID
 * header: header text
 * iconBtn: Fontawesome icon attribute
 * onClick: method to handle on click event
 * previousRoute: the route to be taken if show previous button is enabled
 */

import React from 'react';
import Previous from '../../helper/previous';

class DisplayPanel extends React.Component
{
	// Render
	render() {
		let previousBtn = this.props.previousRoute !== "" ?
			<Previous route={ this.props.previousRoute }/> : null;
		let clickBtn    = this.props.onClick !== "" ?
			<button onClick={ this.props.onClick }><i className={ this.props.iconBtn } aria-hidden="true"/></button> : null;

		return (
			<div className="row" id={ this.props.id }>
				<div className="panel panel-info">
					<div className="panel-heading">
						<div className="row">
							<div className="col-xs-10 col-md-10">
								<span>{ this.props.header }</span>
							</div>
							<div className="col-xs-2 col-md-2">
								{ previousBtn }
								{ clickBtn }
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