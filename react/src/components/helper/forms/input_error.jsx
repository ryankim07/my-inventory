/**
 * Input error loader component
 */

import React from 'react';
import classNames from 'classnames';

class InputError extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			message: 'Input is invalid'
		}
	}

    render() {
		let errorClass = classNames({
			'error_container': true,
			'visible': this.props.visible,
			'invisible': !this.props.visible
		});

        return (
			<div className={ errorClass }>
				<span>{ this.props.errorMessage }</span>
			</div>
        );
    }
}

export default InputError;