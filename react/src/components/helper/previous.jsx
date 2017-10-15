/**
 * Previous button component
 */

import React from 'react';
import { PropTypes } from 'prop-types';

class Previous extends React.Component
{
	constructor(props) {
		super(props);
	}

	goBack(route) {
		this.context.router.push(route);
	}

    render() {
        return (
            <button onClick={ this.goBack.bind(this, this.props.route) }><i className="fa fa-chevron-circle-left" aria-hidden="true"/> Back</button>
        );
    }
}

Previous.contextTypes = {
	router: PropTypes.object
}

export default Previous;