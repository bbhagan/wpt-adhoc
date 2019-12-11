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
	console.log(`getPreviousTest previousTestId: --${previousTestId}--`);
	getAllPreviousTests().forEach(test => {
		if (test.id.toString() === previousTestId) {
			previousTest = test;
		}
	});
	return previousTest;
};

/**
 *
 * @param {string} date -- Moment formatted date string
 * @param {object} tests -- State object representing a test set
 *
 * @returns {array} -- All previous tests
 */
export const addPreviousTest = (date, tests) => {
	let previousTests = getAllPreviousTests() || [];
	if (localStorage) {
		previousTests.push({ date: date, id: sha256(date), testConfig: tests });
		localStorage.setItem("previousTests", JSON.stringify(previousTests));
	}
	return previousTests;
};
