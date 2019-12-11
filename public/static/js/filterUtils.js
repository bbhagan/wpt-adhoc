/**
 * Given a list of URLs, return list of unique entries
 *
 * @param {array} testArray -- An array of tests URLs
 *
 * @returns {array}
 */
export const getUniqueURLs = testArray => {
	let returnArray = [];
	if (testArray && testArray.length) {
		testArray.forEach((test, idx) => {
			if (idx === 0) {
				returnArray.push(test.url);
			} else {
				if (test.url !== testArray[idx - 1].url) {
					returnArray.push(test.url);
				}
			}
		});
	}

	return returnArray;
};

/**
 * Given a list of URLs, return a formatted string of unique URLs
 *
 * @param {array} testArray -- An array of tests URLs
 *
 * @returns {string}
 */
export const getUniqueURLsString = testArray => {
	const testsArray = getUniqueURLs(testArray);
	return testsArray.join(", ");
};

/**
 * Returns an array of just active resultOptions
 *
 * @param {array} resultOptions -- Result options array to filter through
 *
 * @return {array}
 */
export const getActiveResultOptions = resultOptions => {
	return resultOptions.filter(resultOption => resultOption.active);
};
