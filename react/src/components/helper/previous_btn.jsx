/**
 * Previous button component
 */

import React from 'react';
import { PropTypes } from 'prop-types';

class PreviousButton extends React.Component
{
	// Previous route
	goBack(route) {
		this.context.router.history.push(route);
	}

	// Render
    render() {
        return (
            <button onClick={ this.goBack.bind(this, this.props.inputProps.route) }><i className="fa fa-chevron-circle-left" aria-hidden="true"/> Back</button>
        );
    }
}

PreviousButton.contextTypes = {
	router: PropTypes.object
}

export default PreviousButton;