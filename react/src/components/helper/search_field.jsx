/**
 * Required props
 *
 * objs: list of objects to filter
 * objKey: the key of the object
 * searchType: type of search
 * searchText: text to search
 * onHandleFormChange: required to handle search input
 */

import React from 'react';

class SearchField extends React.Component
{
    // Constructor
	constructor(props) {
		super(props);

		this.state = {
			clonedObjs: JSON.parse(JSON.stringify(this.props.objs)),
			objs: this.props.objs,
            objKey: this.props.objKey
		}
	}

	// Handle input changes
	handleFormChange(propertyName, event) {
		let searchText = event.target.value;
		let objs       = searchText === "" || searchText === undefined ? this.state.clonedObjs : this.state.objs;
		let filter     = this.state.objKey;

		let results = objs.filter(function (list) {
			return list[filter].match(new RegExp(searchText, 'gi'));
		});

		this.props.onHandleFormChange(results, searchText);
	}

	clearInput(propertyName, event) {
	    this.refs.search.value = '';
		this.props.onHandleFormChange(this.state.clonedObjs, '');
    }

    render() {
        return (
            <div className="input-group col-lg-12">
                <input
                    ref="search"
                    type="text"
                    value={ this.props.searchText }
                    onChange={ this.handleFormChange.bind(this, 'search') }
                    className="form-control"
                />
                <button onClick={ this.clearInput.bind(this) }><i className="fa fa-eraser" aria-hidden="true" /> Clear</button>
            </div>
        );
    }
}

export default SearchField;