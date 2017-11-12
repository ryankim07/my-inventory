/**
 * Previous button component
 */

import React from 'react';

import { withRouter } from 'react-router';
class PreviousButton extends React.Component
{
	// Previous route
	goBack(route) {
		this.props.history.push(route);
	}

	// Render
    render() {
        return (
            <button onClick={ this.goBack.bind(this, this.props.inputProps.route) }><i className="fa fa-chevron-circle-left" aria-hidden="true"/> Back</button>
        );
    }
}

export default withRouter(PreviousButton);