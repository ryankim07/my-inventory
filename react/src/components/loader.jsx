import React from 'react';

class Loader extends React.Component
{
    render() {
        return (
            <div>
                <img src={'../images/ajax-loader.gif'} className="loadingSpinner" width="25" height="25" />
            </div>
        );
    }
}

export default Loader;