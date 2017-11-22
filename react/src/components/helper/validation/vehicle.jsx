import { emptyRule, illegalCharsRule } from "./rules";

export const vehicleValidators = {
	mfg_id: {
		rules: [ emptyRule ],
		errors: [],
		valid: false,
		state: '',
	},
	model_id: {
		rules: [ emptyRule ],
		errors: [],
		valid: false,
		state: '',
	},
	year: {
		rules: [ emptyRule ],
		errors: [],
		valid: false,
		state: '',
	},
	color: {
		rules: [ emptyRule ],
		errors: [],
		valid: false,
		state: '',
	},
	vin: {
		rules: [ emptyRule, illegalCharsRule ],
		errors: [],
		valid: false,
		state: '',
	},
	plate: {
		rules: [ emptyRule, illegalCharsRule ],
		errors: [],
		valid: false,
		state: ''
	}
};