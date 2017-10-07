/**
 * Required props
 *
 * searchType: type of search
 * searchText: text to search
 * onHandleFormChange: required to handle search input
 */

import React from 'react';

class SearchField extends React.Component
{
    /// Handle input changes
	clearInput(event) {
		event.preventDefault();

	    this.refs.search.value = '';
		this.props.onHandleFormChange(event);
    }

    render() {
        return (
            <div className="input-group col-lg-12" id={ ['search-', this.props.searchType].join(' ') }>
                <input
                    ref="search"
                    type="text"
                    value={ this.props.searchText }
                    onChange={ this.props.onHandleFormChange.bind(this) }
                    className="form-control"
                />
                <button onClick={ this.clearInput.bind(this) }><i className="fa fa-eraser" aria-hidden="true" /> Clear</button>
            </div>
        );
    }
}

export default SearchField;