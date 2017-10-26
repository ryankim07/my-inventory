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
	shouldItemRender(item, value) {
		let labelStr = item.label.toString();
		let valueStr = value.toString();

		return labelStr.toLowerCase().indexOf(valueStr.toLowerCase()) > -1
	}

    // Render
    render() {
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

        return (
			<div>
				<ReactAutocomplete
					items={ this.props.inputProps.list }
					value={ this.props.inputProps.value }
					onChange={ this.props.inputProps.onChange }
					onSelect={ this.props.inputProps.onSelect }
					wrapperStyle={ wrapperStyle }
					renderMenu={ (items, value) =>
						<div style={ { menuStyle } } children={ items }/>
					}
					shouldItemRender={ this.shouldItemRender }
					getItemValue={ (item) =>
						item.value
					}
					renderItem={ (item, isHighlighted) =>
						<div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
							{ item.label }
						</div>
					}
				/>
			</div>
        );
    }
}

export default AutoComplete;