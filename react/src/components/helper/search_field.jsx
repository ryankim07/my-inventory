/**
 * Search field component
 *
 * Required props
 *
 * searchType: type of search
 * searchText: text to search
 * onHandleFormChange: required to handle search input
 */

import React from 'react';

class SearchField extends React.Component
{
    // Render
	render() {
        return (
            <div className="input-group col-lg-12" id={ ['search-', this.props.searchType].join(' ') }>
				<i className="fa fa-search fa-2x" aria-hidden="true"/>
                <input
                    type="text"
                    value={ this.props.searchText }
                    onChange={ this.props.onHandleFormChange.bind(this) }
                    className="form-control"
                />
            </div>
        );
    }
}

export default SearchField;