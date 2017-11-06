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
import _ from 'lodash';
import { getNestedModifiedState } from '../helper/utils';

class SearchField extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			keyWords: '',
			originalList: []
		};

		this.onHandleSearch = this.onHandleSearch.bind(this);
	}

	// Next state change
	componentWillReceiveProps(nextProps) {
		if (_.isEmpty(this.state.originalList) && nextProps.inputProps.objs !== this.state.originalList) {
			this.setState({
				originalList: getNestedModifiedState(this.state.originalList, nextProps.inputProps.objs)
			});
		}
	}

	// Handle search
	onHandleSearch(event) {
		const searchType = this.props.inputProps.searchType;
		let searchText   = event.target.value;

		let results = this.state.originalList.filter(function (list) {
			return list[searchType].match(new RegExp(searchText, 'gi'));
		});

		// Set text
		this.setState({keyWords: searchText});

		// Return new set of list to parent component
		// or empty array if not found
		this.props.inputProps.onSearch(results);
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
                    value={ this.state.keyWords }
                    onChange={ this.onHandleSearch }
                />
            </div>
        );
    }
}

export default SearchField;