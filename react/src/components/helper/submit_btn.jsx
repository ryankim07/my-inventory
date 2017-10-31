/**
 * Previous button component
 */

import React from 'react';

class SubmitButton extends React.Component
{
	render() {
        return (
			<button type="submit" className="btn"><i className="fa fa-floppy-o"/> Save</button>
        );
    }
}

export default SubmitButton;