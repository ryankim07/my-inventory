/**
 * Auto complete address component
 *
 * Required props
 *
 * list: the parent object
 * listObjName: name of the parent object
 * listObjSetter: handler to set object
 * onHandleFormChange: handler for form changes
 */

import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

class AutoCompleteAddress extends React.Component
{
	// Handle form change
    onChange(address) {
		this.props.onChange('street', address);
    }

	// Handle select
	onHandleSelect(address) {
		/*
		 * addressParts keys
		 *
		 * 0 - street
		 * 1 - city
		 * 2 - state
		 * 3 - country
		 */
		let objs = {};
		let addressParts = address.split(',');
		let list     = this.props.list;
		list.street  = addressParts[0].trim();
		list.city 	 = addressParts[1].trim();
		list.state   = addressParts[2].trim();
		list.country = addressParts[3].trim();

		// Set the objects for parent state
		objs[this.props.listName] = list;
		objs['isRequiredField'] = true;

		this.props.listObjSetter(objs);
	}

    // Render
    render() {
		const inputProps = {
			value: this.props.list.street,
			onChange: this.onChange.bind(this),
		};

		const autoCompleteCss = {
			root: {
				position: 'relative',
				paddingBottom: '0px',
			},
			input: {
				display: 'inline-block',
				width: '100%',
				padding: '5px',
				border: '2px solid #dce4ec'
			},
			autocompleteContainer: {
				position: 'absolute',
				top: '100%',
				backgroundColor: 'white',
				border: '1px solid #555555',
				width: '100%',
				zIndex: 1000,
			},
			autocompleteItem: {
				backgroundColor: '#ffffff',
				padding: '10px',
				color: '#555555',
				cursor: 'pointer',
			},
			autocompleteItemActive: {
				backgroundColor: '#ddd'
			}
		};

        return (
        	<div>
				<PlacesAutocomplete
					inputProps={ inputProps }
					onSelect={ this.onHandleSelect.bind(this) }
					highlightFirstSuggestion={ true }
					styles={ autoCompleteCss }
				/>
			</div>
        );
    }
}

export default AutoCompleteAddress;