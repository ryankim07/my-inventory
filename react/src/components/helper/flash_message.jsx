/**
 * Flash message component
 *
 */

import React from 'react';

class FlashMessage extends React.Component
{
    render() {
        let alertType = 'alert ' + ' alert-' + this.props.alertType + ' alert-dismissible';

        return (
            <div className={alertType} role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <strong>{ this.props.message }</strong>
            </div>
        );
    }
}

export default FlashMessage;