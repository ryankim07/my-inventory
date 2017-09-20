import React from 'react';

class Previous extends React.Component
{
	goBack(route) {
		this.context.router.push(route);
	}

    render() {
        return (
            <button onClick={ this.goBack.bind(this, this.props.route) }><i className="fa fa-chevron-circle-left" aria-hidden="true" /> Back</button>
        );
    }
}

Previous.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default Previous;