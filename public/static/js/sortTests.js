/**
 * Sorts the tests based on URL, dependent on the "Sorting" test configuration
 *
 * @param tests {array} -- The test array to sort
 * @param sorting {string} -- The sorting methodology
 * @returns {array}
 */
export const sortTestsByURL = (tests, sorting) => {
	return tests.sort((a, b) => {
		switch (sorting) {
			case "none":
				return 0;
			case "alpha":
				if (a.url > b.url) return 1;
				if (a.url < b.url) return -1;
				return 0;
			case "reverseAlpha":
				if (a.url > b.url) return -1;
				if (a.url < b.url) return 1;
				return 0;
			default:
				return 0;
		}
	});
};

/**
 * Sorts tests given a result field (ex: TTFB)
 *
 * @param {array} tests -- The array of tests to sort
 * @param {string} field -- The WPT field name to look up
 * @return {array}
 */
export const sortTestsByField = (tests, field) => {
	return tests.sort((a, b) => {
		if (
			parseFloat(a.data.average.firstView[field]) >
			parseFloat(b.data.average.firstView[field])
		)
			return 1;
		if (
			parseFloat(a.data.average.firstView[field]) <
			parseFloat(b.data.average.firstView[field])
		)
			return -1;
		return 0;
	});
};

/**
 * Sorts tests by location, returning mob tests, then desk tests
 *
 * @param {array} tests -- WPT tests array
 * @returns {array}
 */
export const sortTestsByLocation = tests => {
	const mobTests = tests.filter(test => {
		return test.data.location.indexOf("mobile") !== -1 ? true : false;
	});
	const deskTests = tests.filter(test => {
		return test.data.location.indexOf("mobile") !== -1 ? false : true;
	});

	return [mobTests, deskTests];
};
