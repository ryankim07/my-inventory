import React from 'react';

class FlashMessage extends React.Component
{
    render() {
        return (
            <div className="alert alert-success alert-dismissible" role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <strong>{ this.props.message }</strong>
            </div>
        );
    }
}

export default FlashMessage;