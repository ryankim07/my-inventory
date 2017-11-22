/**
 * Main validator functionality
 */

import _ from 'lodash';

// Update validator
export function updateValidators(validators, fieldName, value) {
	validators[fieldName].errors = [];
	validators[fieldName].state  = value;
	validators[fieldName].valid  = true;

	_.forEach(validators[fieldName].rules, function(rule) {
		if (rule.condition instanceof RegExp) {
			if (!rule.condition.test(value)) {
				validators[fieldName].errors.push(rule.message);
				validators[fieldName].valid = false;
				return false;
			}
		} else if (typeof rule.condition === 'function') {
			if (!rule.condition(value)) {
				validators[fieldName].errors.push(rule.message);
				validators[fieldName].valid = false;
				return false;
			}
		}
	});
}

// Reset validators when form is loaded
export function resetValidators(validators) {
	_.forEach(validators, function(validator) {
		validator.errors = [];
		validator.state  = '';
		validator.valid  = false;
	});
}

// Display validation errors
export function displayValidationErrors(validator) {
	if (validator && !validator.valid) {
		return validator.errors.join("\r\n");
	}

	return "";
}

// Check if form is valid
export function isFormValid(validators) {
	let status = true;

	_.forEach(validators, function(validator) {
		if (!validator.valid) {
			status = false;
		}
	});

	return status;
}