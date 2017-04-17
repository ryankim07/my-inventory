import React from 'react';

class Loader extends React.Component
{
    render() {
        return (
            <div>
                <img src={'../images/ajax-loader.gif'} className="loadingSpinner" />
            </div>
        );
    }
}

export default Loader;