/**
 * Utility Methods
 */

import update from 'react-addons-update';
import _ from 'lodash';

/**
 * Prevent state mutation by creating new object with single key and value
 *
 * @param originalState
 * @param name
 * @param value
 * @returns {*}
 */
export function getSingleModifiedState(originalState, name, value) {
	return update(originalState, { $merge: { [name]: value } });
}

/**
 * Prevent state mutation by creating new object with existing deep nested object
 *
 * @param originalState
 * @param modifiedState
 * @returns {*}
 */
export function getNestedModifiedState(originalState, modifiedState) {
	return update(originalState, {
		$apply:
			function(x) {
				_.forEach(modifiedState, function (value, key) {
					x[key] = value;
				});

				return x;
			}
		}
	);
}

/**
 * Format thousand format
 *
 * @param value
 * @returns {*}
 */
export function numberFormat(value)
{
	let num = value.toString().replace(/,/gi, "").split("").reverse().join("");

	 return removeRougeChar(num.replace(/(.{3})/g,"$1,").split("").reverse().join(""));
}

/**
 * Remove unwanted characters
 *
 * @param convertString
 * @returns {*}
 */
export function removeRougeChar(convertString)
{
	if (convertString.substring(0, 1) === ",") {
		return convertString.substring(1, convertString.length)
	}

	return convertString;
}

/**
 * Capitalize 1st letter of each word in sentence
 *
 * @param str
 * @returns {*}
 */
export function upperFirstLetter(str)
{
	if (isNaN(str)) {
		return str
			.toLowerCase()
			.split(' ')
			.map(function (word) {
				if (!word[0]) {
					return word;
				} else {
					return word[0].toUpperCase() + word.substr(1);
				}
			})
			.join(' ');
	}

	return str;
}

/**
 * Get differences between 2 arrays
 *
 * @param arr1
 * @param arr2
 * @returns {Array.<T>|string|Array|*}
 */
export function arrayDiff(arr1, arr2)
{
	let arr1Filtered = arr1.filter(function (value){
		return arr2.indexOf(value) === -1;
	});

	let arr2Filtered = arr2.filter(function (value){
		return arr1.indexOf(value) === -1;
	});

	return arr1Filtered.concat(arr2Filtered);
}

/**
 * Format phone number
 *
 * @param number
 */
export function phoneFormat(number)
{
	// Strip all characters from the input except digits
	let input = number.replace(/\D/g, '');

	// Trim the remaining input to ten characters, to preserve phone number format
	input = input.substring(0, 10);

	// Based upon the length of the string, we add formatting as necessary
	let size = input.length;
	if (size < 4) {
		input = '(' + input;
	} else if (size < 7) {
		input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6);
	} else {
		input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6) + '-' + input.substring(6, 10);
	}

	return input;
}

/**
 * Format url
 *
 * @param url
 * @returns {string}
 */
export function urlFormat(url) {
	if (!/^https?:\/\//i.test(url)) {
		return 'http://' + url;
	}

	return url;
}

/**
 * Check if all address fields are empty or not
 *
 * @param obj
 * @returns {boolean}
 */
export function checkAddressInputFields(obj) {
	return !_.every(
		_.values(_.pick(obj, ['street', 'city', 'state', 'zip', 'country'])),
		function(v) {
			return !v.trim();
		}
	);
}

/**
 * Take a starting and ending values and return
 * as object
 *
 * @param from
 * @param to
 */
export function sequencedObject(from, to) {
	let range = _.range(from, to);

	return _.map(range, function (value) {
		return { id: value, label: value, value: value }
	})
}