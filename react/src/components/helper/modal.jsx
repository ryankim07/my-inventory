/**
 * Spinning loader component
 */

import React from 'react';

class Modal extends React.Component
{
    // Render
    render() {
		// The gray background
		const backdropStyle = {
			position: 'fixed',
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			backgroundColor: 'rgba(0,0,0,0.3)',
			padding: 50,
			zIndex: 1000
		};

		return (
            <div className="" style={ backdropStyle }>
                <div className="row" id="view-vehicle">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>Vehicle</span>
                                </div>
                                <div className="col-xs-2 col-md-2">
                                    <button onClick={ this.props.closeModal.bind(this) }><i className="fa fa-close" aria-hidden="true"/></button>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">
							{ this.props.children }
                        </div>
                    </div>
                </div>
            </div>
		);
    }
}

export default Modal;