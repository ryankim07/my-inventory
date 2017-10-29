/**
 * Auto complete component
 *
 * Required props:
 *
 * auto: whether is auto complete or drop down
 * className: the class of the parent container
 * list: the parent object
 * others: extra attributes
 * value: current or selected value
 * onChange: handler for form changes
 * onSelect: handler for select event
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

class ListOptionsField extends React.Component
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
		const identifier = this.props.inputProps.identifier ? this.props.inputProps.identifier : 'id';
		let results    	= [];

		_.forEach(list, function(obj) {
			if (isAuto) {
				results.push({ id: obj[identifier].toString(), label: obj[label].toString(),  value: obj[identifier].toString()});
			} else {
				results.push(<option key={ obj[identifier] } value={ obj[identifier] }>{ obj[label] }</option>);
			}
		});

		this.setState({
			list: results,
			isAuto: isAuto
		});
	}

	// Render
    render() {
		let html = this.state.isAuto ?
			<AutoComplete
				inputProps={ this.props.inputProps.others }
				items={ this.state.list }
				value={ this.props.inputProps.value !== undefined ? this.props.inputProps.value.toString() : '' }
				onChange={ this.props.inputProps.onChange }
				onSelect={ this.props.inputProps.onSelect }
				wrapperStyle={ wrapperStyle }
				renderMenu={ (items, value) =>
					<div style={ { menuStyle } } children={ items }/>
				}
				shouldItemRender={ (item, value) =>
					item.label.toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1
				}
				getItemValue={ (item) =>
					item.value
				}
				renderItem={ (item, isHighlighted) =>
					<div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
						{ item.label }
					</div>
				}
			/> :
			<select
				name={ this.props.inputProps.others.name }
				value={ this.props.inputProps.value }
				onChange={ this.props.inputProps.onChange }
				required={ this.props.inputProps.others.required }>
				{ this.state.list }
			</select>;

		return (
			<div className={ this.props.inputProps.className }>{ html }</div>
		);
    }
}

export default ListOptionsField;