import _ from 'lodash';

export const emptyRule = {
	condition: (value) => {
		return !_.isEmpty(value.trim());
	},
	message: 'This field is required'
};

export const illegalCharsRule = {
	condition: /^[A-Za-z0-9_]+$/,
	message: 'This field must contain only alphabets-numeric characters'
};

export const phoneRule = {
	condition: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
	message: 'Phone should contain the following format: (XXX) XXX-XXXX'
};

export const zipRule = {
	condition: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
	message: 'Phone should contain the following format: (XXX) XXX-XXXX'
};

export const emailRule = {
	condition: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
	message: 'Invalid email'
};