/**
 * Pagination component
 *
 * Required props
 *
 * page: page number
 * totalCount: total count of all items
 * totalPages: total pages
 * limit: items per page
 * onChangePage: handler for page number
 */

import React from 'react';
import _ from 'lodash';

class Pagination extends React.Component
{
    // Constructor
	constructor(props) {
		super(props);

		this.state = {
			pager: {}
		};

		this.setPager      = this.setPager.bind(this);
		this.onHandleClick = this.onHandleClick.bind(this);
	}

	// Component mounting
	componentWillMount() {
		this.setPager(this.props.page);
	}

	// Handle click
	onHandleClick(page) {
		this.setPager(page);
		this.props.onChange(page);
	}

	// Set page
	setPager(page) {
		let pager 	   = this.state.pager;
		let totalCount = this.props.totalCount;
		let totalPages = this.props.totalPages;
		let limit	   = this.props.limit;

		if (page < 1 || page > pager.totalPages) {
			return;
		}

		// Get new pager object for specified page
		let startPage, endPage;

		if (totalPages <= 10) {
			// Less than 10 total pages so show all
			startPage = 1;
			endPage = totalPages;
		} else {
			// More than 10 total pages so calculate start and end pages
			if (page <= 6) {
				startPage = 1;
				endPage = 10;
			} else if (page + 4 >= totalPages) {
				startPage = totalPages - 9;
				endPage = totalPages;
			} else {
				startPage = page - 5;
				endPage = page + 4;
			}
		}

		// Calculate start and end item indexes
		let startIndex = (page - 1) * limit;
		let endIndex   = Math.min(startIndex + limit - 1, totalCount - 1);

		// Create an array of pages to ng-repeat in the pager control
		let pages = _.range(startPage, endPage + 1);

		// Update state
		this.setState({
            pager: {
				currentPage: page,
				totalCount: totalCount,
				totalPages: totalPages,
				limit: limit,
				startPage: startPage,
				endPage: endPage,
				startIndex: startIndex,
				endIndex: endIndex,
				pages: pages
			}
		});
	}

    render() {
		let currentPage = parseInt(this.state.pager.currentPage);
		let totalPages  = parseInt(this.state.pager.totalPages);

		return (
            <div>
                <ul className="pagination">
                    <li className={ currentPage === 1 ? 'disabled' : '' }>
                        <a onClick={ this.onHandleClick.bind(this, 1) }>First</a>
                    </li>
                    <li className={ currentPage === 1 ? 'disabled' : '' }>
                        <a onClick={ this.onHandleClick.bind(this, currentPage - 1) }>Previous</a>
                    </li>
					{
						this.state.pager.pages.map((page, index) =>
							<li key={ index } className={ currentPage === page ? 'active' : '' }>
								<a onClick={ this.onHandleClick.bind(this, page) }>{ page }</a>
							</li>
						)
					}
                    <li className={ currentPage === totalPages ? 'disabled' : '' }>
                        <a onClick={ this.onHandleClick.bind(this, currentPage + 1) }>Next</a>
                    </li>
                    <li className={ currentPage === totalPages ? 'disabled' : '' }>
                        <a onClick={ this.onHandleClick.bind(this, totalPages) }>Last</a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Pagination;