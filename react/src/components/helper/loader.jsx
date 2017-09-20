import React from 'react';

class Loader extends React.Component
{
    render() {
        return (
            <img src={'../images/ajax-loader.gif'} className="loadingSpinner" />
        );
    }
}

export default Loader;