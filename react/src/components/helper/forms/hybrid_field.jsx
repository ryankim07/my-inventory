/**
 * Auto complete component
 *
 * Required props:
 *
 * auto: whether is auto complete or drop down
 * parentClassName: the class of the parent container
 * list: the parent object
 * others: extra attributes
 * label: the key for the label
 * identifier: the key for the ID
 * value: current or selected value
 * onChange: handler for form changes
 * onSelect: handler for select event
 * onGetItemValue: customize how values are suppose to be returned when the select event fires
 */

import React from 'react';
import _ from 'lodash';
import AutoComplete from 'react-autocomplete';

const wrapperStyle = {
	border: '1px solid #dce4ec',
	display: 'inline-block',
	position: 'relative',
};

const menuStyle = {
	padding: '2px 0',
	fontSize: '90%',
	position: 'absolute',
	width: '100%',
	overflow: 'auto',
	zIndex: 2000
};

class HybridField extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			list: [],
			isAuto: false
		};
	}

	componentWillMount() {
		const isAuto 	 = this.props.inputProps.auto;
		const list 	     = this.props.inputProps.list;
		const label 	 = this.props.inputProps.label ? this.props.inputProps.label : 'label';
		const identifier = this.props.inputProps.identifier ? this.props.inputProps.identifier : 'value';
		let results    	 = [];

		_.forEach(list, function(obj, objIndex) {
			if (isAuto) {
				results.push({ id: obj[identifier].toString(), label: obj[label].toString(),  value: obj[identifier].toString()});
			} else {
				results.push(<option key={ objIndex } value={ obj[identifier] }>{ obj[label] }</option>);
			}
		});

		this.setState({
			list: results,
			isAuto: isAuto
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	// Default functionality to handle
	// how results should be returned when
	// an option is selected
	getItemValue(item) {
		return item.value;
	}

	// Render
    render() {
		let itemValue = this.props.inputProps.onSelectReturn ?
			this.props.inputProps.onSelectReturn : this.getItemValue;

		let html = this.state.isAuto ?
			<AutoComplete
				inputProps={ this.props.inputProps.others }
				items={ this.state.list }
				value={ this.props.inputProps.value ? this.props.inputProps.value.toString() : '' }
				onChange={ this.props.inputProps.onChange }
				onSelect={ this.props.inputProps.onSelect }
				wrapperStyle={ wrapperStyle }
				renderMenu={ (items, value) =>
					<div style={ { menuStyle } } children={ items }/>
				}
				shouldItemRender={ (item, value) =>
					item.label.toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1
				}
				getItemValue={ itemValue }
				renderItem={ (item, isHighlighted) =>
					<div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
						{ item.label }
					</div>
				}
			/> :
			<select
				name={ this.props.inputProps.others.name }
				className={ this.props.inputProps.others.className }
				value={ this.props.inputProps.value }
				onChange={ this.props.inputProps.onChange }
				required={ this.props.inputProps.others.required }>
				<option key="0" value="">Select One</option>
				{ this.state.list }
			</select>;

		return (
			<div className={ this.props.inputProps.parentClassName }>{ html }</div>
		);
    }
}

export default HybridField;