/**
 * States dropdown component
 *
 * Required props:
 *
 * fromYear: the year to start
 * toYear: the year to end
 * className: class name
 * value: the value to be selected
 * required: "required" or ""
 * onChange: handler for form changes
 */

import React from 'react';
import AbstractDropdown from './abstract_dropdown';
import AutoComplete from "./auto_complete";

class YearsDropdown extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			yearsOptions: [],
			fromYear: this.props.inputProps.fromYear,
			toYear: this.props.inputProps.toYear,
			type: this.props.inputProps.type
		};
	}

	componentWillMount() {
		let results = [];

		for (let i = this.state.fromYear; i <= this.state.toYear; i++) {
			if (this.state.type !== 'auto') {
				results.push(<option key={ 'y-' + i } value={ i }>{ i }</option>);
			} else {
				results.push({ label: i.toString(),  value: i.toString()});
			}
		}

		this.setState({
			yearsOptions: results
		});
	}

	// Render
    render() {
		let yearsOptions = [];

		let yearsSelectField = this.state.type === 'auto' ?
			<AutoComplete
				inputProps={
					{
						list: this.state.yearsOptions,
						value: this.props.inputProps.value.toString(),
						onChange: this.props.inputProps.onChange,
						onSelect: this.props.inputProps.onSelect
					}
				}
			/> :
			<AbstractDropdown inputProps={ this.props.inputProps }>
				<option value="">Select One</option>
				{ yearsOptions }
			</AbstractDropdown>;

        return (
			<div>{ yearsSelectField }</div>
        );
    }
}

export default YearsDropdown;