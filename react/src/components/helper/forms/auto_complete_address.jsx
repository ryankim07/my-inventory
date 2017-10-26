/**
 * Auto complete address component
 *
 * Required props:
 *
 * list: the parent object
 * listObjName: name of the parent object
 * listObjSetter: handler to set object
 * onHandleFormChange: handler for form changes
 *
 * Usage:
 */

import React from 'react';

class AutoCompleteAddress extends React.Component
{
	// Constructor
	constructor (props) {
		super(props)
		this.state = {
			placesService: []
		}

		this.processAddressParts = this.processAddressParts.bind(this);
	}

	// Mounted component
	componentDidMount() {
		// Initialize service
		const placesService = new google.maps.places.Autocomplete((this.refs.autoStreet), {types: ['geocode']});

		// Attach event listener and callback function when an address is selected
		placesService.addListener('place_changed', this.processAddressParts);

		this.setState({
			placesService
		});
	}

	// Process all address parts
	processAddressParts() {
		let processed = this.processKeys(this.props.inputProps.inputIds);
		const [googleKeys, originals] = processed;
		let results = {};

		const place = this.state.placesService.getPlace();

		// Special condition keys
		let streetNumber = '';
		let streetName   = '';

		for (let i = 0; i < place.address_components.length; i++) {
			let addressType = place.address_components[i].types[0];

			if (googleKeys.hasOwnProperty(addressType)) {
				let val = place.address_components[i][googleKeys[addressType]];

				switch (addressType) {
					case 'street_number':
						streetNumber = val;
					break;

					case 'route':
						streetName = val;
					break;

					default:
						results[originals[addressType]] = val;
				}
			}
		}

		// Concatenate and return key that Google doesn't provide
		if (streetNumber !== '' && streetName !== '') {
			results['street'] = streetNumber + ' ' + streetName;
		}

		this.props.inputProps.onSelect(results);
	}

	// Exchange form input names to google places address keys
	processKeys(inputIds) {
		if (!inputIds) {
			return;
		}

		let mapped = {};
		let swapped = {};
		let googlePlacesKeys = {
			city: ['locality', 'long_name'], 					  // city
			state: ['administrative_area_level_1', 'short_name'], // state`
			zip: ['postal_code', 'short_name'], 				  // zip code
			county: ['administrative_area_level_2', 'long_name'], // county
			country: ['country', 'long_name']					  // country
		};

		let streetIndex = inputIds.indexOf('street');
		if (streetIndex !== -1) {
			mapped['street_number'] = 'short_name'; // street number
			mapped['route'] 		= 'long_name';	 // street name
			inputIds.splice('street', 1);
		}

		for (let key in inputIds) {
			let id = inputIds[key];
			if (googlePlacesKeys.hasOwnProperty(id)) {
				mapped[googlePlacesKeys[id][0]]  = googlePlacesKeys[id][1];
				swapped[googlePlacesKeys[id][0]] = id;
			}
		}

		return [mapped, swapped];
	}

	// Geolocate
	geoLocate() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				const geolocation = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};

				// eslint-disable-next-line no-undef
				const circle = new google.maps.Circle({
					center: geolocation,
					radius: position.coords.accuracy
				});
				this.state.placesService.setBounds(circle.getBounds());
			});
		}
	}

	// Render
	render() {
		return (
			<input
				ref="autoStreet"
				type="text"
				className="form-control"
				onFocus={ this.geoLocate }
				value={ this.props.inputProps.value }
				onChange={ this.props.inputProps.onChange }
				required={ this.props.inputProps.required }
			/>
		);
	}
}

export default AutoCompleteAddress;