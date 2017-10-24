/**
 * Auto complete address component
 *
 * Required props
 *
 * parentObj: the parent object
 * parentObjSetter: handler to set object
 */

import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

class AutoCompleteAddress extends React.Component
{
	// Handle form change
    onChange(address) {
		this.props.onHandleFormChange('street', address);
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
		let parentObj    = this.props.parentObj;
		parentObj.street  = addressParts[0].trim();
		parentObj.city 	  = addressParts[1].trim();
		parentObj.state   = addressParts[2].trim();
		parentObj.country = addressParts[3].trim();

		// Set the objects for parent state
		objs[this.props.parentObjName] = parentObj;
		objs['isRequiredField'] = true;

		this.props.parentObjSetter(objs);
	}

    // Render
    render() {
		const inputProps = {
			value: this.props.parentObj.street,
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