import { emptyRule, illegalCharsRule } from "./rules";

export const loginValidators = {
	username: {
		rules: [ emptyRule, illegalCharsRule ],
		errors: [],
		valid: false,
		state: '',
	},
	password: {
		rules: [ emptyRule ],
		errors: [],
		valid: false,
		state: ''
	}
};