import { emptyRule } from "./rules";

export const passwordResetValidators = {
	username: {
		rules: [ emptyRule ],
		errors: [],
		valid: false,
		state: ''
	},
	password: {
		rules: [ emptyRule ],
		errors: [],
		valid: false,
		state: ''
	},
	confirm_password: {
		rules: [ emptyRule ],
		errors: [],
		valid: false,
		state: ''
	}
};