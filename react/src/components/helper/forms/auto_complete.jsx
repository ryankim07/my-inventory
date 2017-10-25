/**
 * Auto complete component
 *
 * Required props
 *
 * list: the parent object
 * value: current or selected value
 * onChange: handler for form changes
 * onSelect: handler for select event
 */

import React from 'react';
import ReactAutocomplete from 'react-autocomplete';

class AutoComplete extends React.Component
{
	// Constructor
	constructor (props) {
		super(props)

		this.onChange 		  = this.onChange.bind(this);
		this.onHandleSelect   = this.onHandleSelect.bind(this);
		this.shouldItemRender = this.shouldItemRender.bind(this);
		this.renderItem       = this.renderItem.bind(this);
		this.getItemValue     = this.getItemValue.bind(this);
	}

	// Handle form changes
	onChange(propertyName, event) {
		this.props.inputProps.onChange(propertyName, event);
	}

	// Handle select
	onHandleSelect(value){
		this.props.inputProps.onSelect(value);
	}

	// Should item render
	shouldItemRender(item, value) {
		return item.label.toLowerCase().indexOf(value) > -1;
	}

	// Render item
	renderItem(item, isHighlighted) {
		return (
			<div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
				{item.label}
			</div>
		);
	}

	// Get item value for select handler
	getItemValue(item){
		return item.value;
	}

    // Render
    render() {
		const menuCss = {
			borderRadius: '3px',
			boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
			background: 'rgba(255, 255, 255, 0.9)',
			padding: '2px 0',
			fontSize: '90%',
			position: 'fixed',
			maxHeight: '50%',
			zIndex: 2000
		};

        return (
			<div>
				<ReactAutocomplete
					menuStyle={ menuCss }
					items={ this.props.inputProps.list }
					shouldItemRender={ this.shouldItemRender }
					getItemValue={ this.getItemValue }
					renderItem={ this.renderItem }
					value={ this.props.inputProps.value }
					onChange={ this.onChange.bind(this) }
					onSelect={ this.onHandleSelect }
				/>
			</div>
        );
    }
}

export default AutoComplete;