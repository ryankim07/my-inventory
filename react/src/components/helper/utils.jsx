export function numberFormat(value) {
	let num         = value.toString().replace(/,/gi, "").split("").reverse().join("");
	let replacement = removeRougeChar(num.replace(/(.{3})/g,"$1,").split("").reverse().join(""));

	return replacement;
}

export function upperFirstLetter(str) {
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

function removeRougeChar(convertString) {
	if (convertString.substring(0, 1) === ",") {
		return convertString.substring(1, convertString.length)
	}

	return convertString;
}