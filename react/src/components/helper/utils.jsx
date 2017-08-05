export function removeRougeChar(convertString) {
	if (convertString.substring(0, 1) == ",") {
		return convertString.substring(1, convertString.length)
	}

	return convertString;
}

export function titleCase(str) {
	if (isNaN(str)) {
		return str
			.toLowerCase()
			.split(' ')
			.map(function (word) {
				return word[0].toUpperCase() + word.substr(1);
			})
			.join(' ');
	}

	return str;
}