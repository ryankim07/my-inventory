/**
 * Spinning loader component
 */

import React from 'react';

class Loader extends React.Component
{
    // Render
    render() {
        return (
            <img src={ '/images/ajax-loader.gif' } className="loadingSpinner"/>
        );
    }
}

export default Loader;