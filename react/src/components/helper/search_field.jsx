/**
 * Search field component
 *
 * Required props:
 *
 * objs: the list to be searched
 * searchType: key to be searched
 * onChange: handle search input
 *
 * Usage:
 *
 * <SearchField
 *		inputProps={
 *			{
 *				objs: this.state.vehicles,
 *				searchType: "mfg",
 *				onChange: this.onHandleSearch
 *			}
 *		}
 * />;
 */

import React from 'react';
import update from 'react-addons-update';
import _ from 'lodash';

class SearchField extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			keywords: ''
		};

		this.onHandleSearch = this.onHandleSearch.bind(this);
	}

	// Handle search
	onHandleSearch(event) {
		const searchType = this.props.inputProps.searchType;
		let paints       = this.props.inputProps.objs;
		let keywords     = event.target.value;

		const newObj = update(paints, {
			$set:
				_.filter(paints, obj => obj[searchType].match(new RegExp(keywords, 'gi')))
		});

		// Set text
		this.setState({keywords: keywords});

		// onSearch - Return indicator if search is on or off
		// newObj - Return new set of list to parent component
		// or empty array if not found
		let onSearch = _.isEmpty(keywords);
		this.props.inputProps.onSearch(newObj, !onSearch);
	}

	// Render
	render() {
        return (
            <div className="input-group col-lg-12" id={ ['search-', this.props.inputProps.searchType].join(' ') }>
				<i className="fa fa-search fa-2x" aria-hidden="true"/>
                <input
					name="search"
                    type="text"
					className="form-control"
                    value={ this.state.keywords }
                    onChange={ this.onHandleSearch }
                />
            </div>
        );
    }
}

export default SearchField;