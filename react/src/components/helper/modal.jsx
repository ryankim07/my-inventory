/**
 * Modal component
 *
 * Required props
 *
 * id: the ID
 * header: header text
 * onClick: method to handle on click event
 */

import React from 'react';
import DisplayPanel from '../helper/panels/display';

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
				<DisplayPanel
					id={ this.props.id }
					header={ this.props.header }
					additionalHeader=""
					iconBtn="fa fa-window-close"
					onClick={ this.props.closeModal.bind(this) }
					previousRoute="">
					{ this.props.children }
				</DisplayPanel>
			</div>
		);
    }
}

export default Modal;