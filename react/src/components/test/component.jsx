/**
 * Testing component
 */

import React from 'react';
import AutoCompleteAddress from "../helper/forms/auto_complete_address";

class TestComponent extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			address: ''
		};
	}

	// Vendor object setter
	parentObjSetter(obj) {
		this.setState(obj);
	}

    // Render
    render() {
        return (
            <form onSubmit={ this.handleFormSubmit }>
                <div className="form-group required">
                    <div className="col-xs-12 col-md-8">
                        <label className="control-label">Company</label>
                        <AutoCompleteAddress
                            parentObjName="address"
                            parentObj={ this.state.address }
                            parentObjSetter={ this.parentObjSetter }
                        />
                    </div>
                </div>
            </form>
        );
    }
}

export default TestComponent;