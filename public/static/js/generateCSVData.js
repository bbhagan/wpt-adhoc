import { getTestSet } from "./wptInterface.js";
import { sortTestsByURL } from "./sortTests.js";
import { sortTestsByLocation } from "./sortTests.js";
import { sortTestsByField } from "./sortTests.js";
import { calcUOMPrecision } from "./mathUtils.js";
import { determineWinner } from "./mathUtils.js";
import { calcDiffFromRank1 } from "./mathUtils.js";
import { calcPercentFromRank1 } from "./mathUtils.js";

require("dotenv").config();
const SERVER_URL = process.env.SERVER_URL;
const SERVER_PORT = process.env.SERVER_PORT;

/**
 * Determines "Mob" or "Desk" for location label
 *
 * @param {string} location -- Test location (should include "desktop" or "mobile")
 * @returns {string}
 */
const mobDeskLabel = location => {
	return location.indexOf("mobile") > -1 ? "Mob" : "Desk";
};

/**
 * Formats a string that describes basic info about a test (test id, url, location)
 *
 * @param {object} test -- WPT test
 * @param {boolean} beforeAfterLabel -- Label text to mark as before/after test
 * @returns {string}
 */
const getTestTextHeader = (test, beforeAfterLabel) => {
	return `Test Id${beforeAfterLabel}: ${test.testId}, Test URL: ${test.data.url}, Location: ${test.data.location}`;
};

const getCompAnalysisTextHeader = (test, resultOption) => {
	return `${test.data.location.indexOf("mobile") > -1 ? "Mobile" : "Desktop"} ${resultOption.name}, Using Average`;
};

/**
 * Formats a CSV table header for test facets (result options)
 *
 * @param {object} resultOptions -- Result options that are shown
 * @returns {string}
 */
const getTableHeader = resultOptions => {
	return [" "].concat(
		resultOptions.map(requestOption => {
			return `${requestOption.name} (${requestOption.uom})`;
		})
	);
};

const getCompAnalysisTableHeader = resultOption => {
	return [
		"Rank",
		"URL",
		`${resultOption.name} (${resultOption.uom})`,
		`Difference from Lead  (${resultOption.uom})`,
		"Percentage from Lead"
	];
};

/**
 * Formats CSV row for a run inside of a test
 *
 * @param {object} run -- Run data inside a test
 * @param {number} index -- Row number to show (1-based)
 * @param {object} resultOptions -- Result options that are shown
 * @param {string} mobDesk -- "Mob" or "Desk" label
 * @returns {string}
 */
const getRunRow = (run, index, resultOptions, mobDesk) => {
	return [`${mobDesk} Run ${index + 1}`].concat(
		resultOptions.map(requestOption => {
			return calcUOMPrecision(
				run.firstView[requestOption.wptField],
				requestOption.uom,
				requestOption.decimalPlacePrecision
			);
		})
	);
};

const formatCompAnalysisRow = (test, rowNum, resultOption, bestValue) => {
	const testValue = test.data.average.firstView[resultOption.wptField];
	let returnRow = [rowNum, test.data.url, testValue];
	//Row one is the winner, get's N/A for comparisons
	if (rowNum === 1) {
		returnRow.push("N/A");
		returnRow.push("N/A");
	} else {
		//Not winner, cal difference and percentage diff
		returnRow.push(calcDiffFromRank1(testValue, bestValue, resultOption.uom, resultOption.decimalPlacePrecision));
		returnRow.push(calcPercentFromRank1(testValue, bestValue));
	}
	return returnRow;
};

/**
 * Formats CSV row for an average line
 *
 * @param {object} test -- WPT test object
 * @param {object} resultOptions -- Result options that are shown
 * @param {string} mobDesk -- "Mob" or "Desk" label
 * @returns {string}
 */
const getAvgRow = (test, resultOptions, mobDesk) => {
	return [`${mobDesk} Avg.`].concat(
		resultOptions.map(requestOption => {
			return calcUOMPrecision(
				test.data.average.firstView[requestOption.wptField],
				requestOption.uom,
				requestOption.decimalPlacePrecision
			);
		})
	);
};

/**
 * Formats CSV row for a difference line between two tests averages
 *
 * @param {object} test1 -- WPT test object
 * @param {object} test2 -- WPT test object
 * @param {object} resultOptions -- Result options that are shown
 * @returns {string}
 */
const getDifferenceRow = (test1, test2, resultOptions) => {
	return [`Difference`].concat(
		resultOptions.map(requestOption => {
			return calcUOMPrecision(
				test1.data.average.firstView[requestOption.wptField] - test2.data.average.firstView[requestOption.wptField],
				requestOption.uom,
				requestOption.decimalPlacePrecision
			);
		})
	);
};

/**
 * Formats CSV row for a winner between two tests, includes label and percentage
 *
 * @param {object} test1 -- WPT test object
 * @param {object} test2 -- WPT test object
 * @param {object} resultOptions -- Result options that are shown
 * @param {string} test1Label -- Label to prepend
 * @param {string} test2Label -- Label to prepend
 * @returns {string}
 */
const getWinnerRow = (test1, test2, resultOptions, test1Label, test2Label) => {
	return [`Winner`].concat(
		resultOptions.map(requestOption => {
			return determineWinner(
				test1.data.average.firstView[requestOption.wptField],
				test2.data.average.firstView[requestOption.wptField],
				test1Label,
				test2Label
			);
		})
	);
};

/**
 * Constructs a "No Grouping" CSV array to be consumed and output to a CSV file
 * See grouping test configuration
 *
 * @param {object} testConfig -- WPT Test config (contains result options)
 * @returns {array}
 */
export const generateNoGroupingData = async testConfig => {
	const csvData = [];
	try {
		const tests = sortTestsByURL(
			await getTestSet(testConfig.testIds, {
				SERVER_URL,
				SERVER_PORT
			}),
			testConfig.sorting
		);
		let afterTests = [];
		if (testConfig.afterTestIds && testConfig.afterTestIds.length) {
			(afterTests = await getTestSet(testConfig.afterTestIds, {
				SERVER_URL,
				SERVER_PORT
			})),
				testConfig.sorting;
		}

		tests.forEach(test => {
			//Do we have a corresponding afterTest?
			let matchingAfterTest = {};
			if (afterTests.length) {
				afterTests.forEach(afterTest => {
					if (test.data.url === afterTest.data.url && test.data.location === afterTest.data.location) {
						matchingAfterTest = afterTest;
					}
				});
			}
			const mobDesk = mobDeskLabel(test.data.location);
			//Description header
			csvData.push([getTestTextHeader(test, matchingAfterTest ? " (Before)" : "")]);
			if (Object.entries(matchingAfterTest).length !== 0) {
				csvData.push([getTestTextHeader(matchingAfterTest, " (After)")]);
			}

			//Table header
			csvData.push(getTableHeader(testConfig.resultOptions));

			//Iterate over run data
			test.data.runs.forEach((run, idx) => {
				csvData.push(getRunRow(run, idx, testConfig.resultOptions, mobDesk));
			});
			//Average Line
			csvData.push(getAvgRow(test, testConfig.resultOptions, mobDesk));
			if (Object.entries(matchingAfterTest).length !== 0) {
				//AfterTest run data
				matchingAfterTest.data.runs.forEach((run, idx) => {
					csvData.push(getRunRow(run, idx, testConfig.resultOptions, mobDesk));
				});
				//Average Line
				csvData.push(getAvgRow(matchingAfterTest, testConfig.resultOptions, mobDesk));

				//Difference
				csvData.push(getDifferenceRow(test, matchingAfterTest, testConfig.resultOptions));
				//Winner
				csvData.push(getWinnerRow(test, matchingAfterTest, testConfig.resultOptions, "Before", "After"));
			}
			//Blank line to separate the tests
			csvData.push([" "]);
		});
	} catch (e) {
		console.log(`generateCSVData.generateNoGroupingData ${e}`);
	}

	return csvData;
};

/**
 * Constructs a "Mob vs Desk" CSV array to be consumed and output to a CSV file
 * See grouping test configuration
 *
 * @param {object} testConfig -- WPT Test config (contains result options)
 * @returns {array}
 */
export const generateMobVsDeskGroupingData = async testConfig => {
	const csvData = [];
	try {
		const tests = sortTestsByURL(
			await getTestSet(testConfig.testIds, {
				SERVER_URL,
				SERVER_PORT
			}),
			testConfig.sorting
		);

		//Need to work with grouped tests
		for (var i = 0; i < tests.length; i++) {
			//test to see if this test has the same url as the test ahead of it, if so they are a matched pair, write them out together
			if (i !== tests.length - 1 && tests[i].url === tests[i + 1].url) {
				//Get labels for this test, and the test ahead
				const mobDesk = mobDeskLabel(tests[i].data.location);
				const mobDeskAhead = mobDeskLabel(tests[i + 1].data.location);

				csvData.push([getTestTextHeader(tests[i])]);
				csvData.push([getTestTextHeader(tests[i + 1])]);
				//Table header
				csvData.push(getTableHeader(testConfig.resultOptions));
				//Mob/desk runs
				tests[i].data.runs.forEach((run, idx) => {
					csvData.push(getRunRow(run, idx, testConfig.resultOptions, mobDesk));
				});
				//Average
				csvData.push(getAvgRow(tests[i], testConfig.resultOptions, mobDesk));

				//Alternate Mob/Desk runs
				tests[i + 1].data.runs.forEach((run, idx) => {
					csvData.push(getRunRow(run, idx, testConfig.resultOptions, mobDeskAhead));
				});
				//Average
				csvData.push(getAvgRow(tests[i + 1], testConfig.resultOptions, mobDeskAhead));
				//Difference
				csvData.push(getDifferenceRow(tests[i], tests[i + 1], testConfig.resultOptions));
				//Winner
				csvData.push(getWinnerRow(tests[i], tests[i + 1], testConfig.resultOptions, mobDesk, mobDeskAhead));
				//Blank line to separate the tests
				csvData.push([" "]);
			}
		}
	} catch (e) {
		console.log(`generateCSVData.generateMobVsDeskGroupingData ${e}`);
	}

	return csvData;
};

/**
 * Constructs a competative analysis CSV array to be consumed and output to a CSV file
 * See grouping test configuration
 *
 * @param {object} testConfig -- WPT Test config (contains result options)
 * @returns {array}
 */
export const generateCompetativeAnalysisGroupingData = async testConfig => {
	const csvData = [];
	try {
		let tests = await getTestSet(testConfig.testIds, {
			SERVER_URL,
			SERVER_PORT
		});
		//Array of two arrays of tests, mob and desktop
		const testSets = sortTestsByLocation(tests);
		testSets.forEach(testSet => {
			testConfig.resultOptions.forEach(resultOption => {
				const testsSortedByField = sortTestsByField(testSet, resultOption.wptField);
				//This value is the "best" value that the others will be ranked against in their tests
				const bestResult = testSet[0].data.average.firstView[resultOption.wptField];

				//Test header
				//csvData.push(getCompAnalysisTextHeader());

				//Table header
				csvData.push(getCompAnalysisTableHeader(resultOption));
				//Table rows

				testsSortedByField.forEach((test, index) => {
					csvData.push(formatCompAnalysisRow(test, index + 1, resultOption, bestResult));
				});
				//Blank line to separate the tests
				csvData.push([" "]);
			});
		});
	} catch (e) {
		console.log(`generateCompetativeAnalysisGroupingData error: ${e.stack}`);
	}

	return csvData;
};
