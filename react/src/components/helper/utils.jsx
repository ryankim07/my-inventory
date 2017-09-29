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
				if (word[0] === undefined) {
					return word;
				} else {
					return word[0].toUpperCase() + word.substr(1);
				}
			})
			.join(' ');
	}

	return str;
}

export function arrayDiff(arr1, arr2) {
	let arr1Filtered = arr1.filter(function (value){
		return arr2.indexOf(value) === -1;
	});

	let arr2Filtered = arr2.filter(function (value){
		return arr1.indexOf(value) === -1;
	});

	return arr1Filtered.concat(arr2Filtered);
}

export function removeRougeChar(convertString) {
	if (convertString.substring(0, 1) === ",") {
		return convertString.substring(1, convertString.length)
	}

	return convertString;
}