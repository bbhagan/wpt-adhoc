import sha256 from "js-sha256";
/**
 * Produces an array of a list of all pervios tests in localStorage
 *
 * @returns {array}
 */
export const getAllPreviousTests = () => {
	let previousTests = [];
	if (typeof localStorage === "object") {
		try {
			previousTests = JSON.parse(localStorage.getItem("previousTests"));
		} catch (e) {
			console.log(`localStorageInterface:getAllPreviousTests Error parsing previousTests ${e}`);
		}
	}
	return previousTests;
};

/**
 * Fetches previous test from localStorage
 *
 * @param {string} previousTestId -- Test set ID (in moment date format)
 *
 * @returns {object}
 */
export const getPreviousTest = previousTestId => {
	let previousTest = {};
	getAllPreviousTests().forEach(test => {
		if (test.id.toString() === previousTestId) {
			previousTest = test;
		}
	});
	return previousTest;
};

export const deletePreviousTest = previousTestId => {
	const filteredTests = getAllPreviousTests().filter(test => test.id !== previousTestId);
	localStorage.setItem("previousTests", JSON.stringify(filteredTests));
	return filteredTests;
};

/**
 *
 * @param {string} date -- Moment formatted date string
 * @param {object} reactState -- State object representing a test set
 *
 * @returns {array} -- All previous tests
 */
export const addPreviousTest = (date, reactState) => {
	let previousTests = getAllPreviousTests() || [];

	function cleanseDataFromTest(test) {
		let returnTest = test;
		//save off test as incomplete, bringing back up will "complete" it
		returnTest.completed = false;
		//Need to rip out any result data (doesn't need to be stored in local storage)
		returnTest.data = {};
		return returnTest;
	}

	if (localStorage) {
		let cleansedTests = [];
		let cleansedAfterTests = [];

		if (reactState.tests) {
			cleansedTests = reactState.tests.map(test => {
				return cleanseDataFromTest(test);
			});
		}

		if (reactState.afterTests) {
			cleansedAfterTests = reactState.afterTests.map(test => {
				return cleanseDataFromTest(test);
			});
		}

		reactState.tests = cleansedTests;
		reactState.afterTests = cleansedAfterTests;
		previousTests.push({ date: date, id: sha256(date), testConfig: reactState });
		localStorage.setItem("previousTests", JSON.stringify(previousTests));
	}
	return previousTests;
};
