import { getTestSet } from "./wptInterface";
import { sortTestsByURL } from "./sortTests";
import { calcUOMPrecision } from "./mathUtils";
import { determineWinner } from "./mathUtils";

require("dotenv").config();
const SERVER_URL = process.env.SERVER_URL;
const SERVER_PORT = process.env.SERVER_PORT;

const mobDeskLabel = location => {
	return location.indexOf("mobile") > -1 ? "Mob" : "Desk";
};

const getTestTextHeader = test => {
	return `Test Id: ${test.testId}, Test URL: ${test.data.url}, Location: ${test.data.location}`;
};

const getTableHeader = resultOptions => {
	return [" "].concat(
		resultOptions.map(requestOption => {
			return `${requestOption.name} (${requestOption.uom})`;
		})
	);
};

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

const getDifferenceRow = (test1, test2, resultOptions) => {
	return [`Difference`].concat(
		resultOptions.map(requestOption => {
			return calcUOMPrecision(
				test1.data.average.firstView[requestOption.wptField] -
					test2.data.average.firstView[requestOption.wptField],
				requestOption.uom,
				requestOption.decimalPlacePrecision
			);
		})
	);
};

const getWinnerRow = (
	test1,
	test2,
	resultOptions,
	test1MobDesk,
	test2MobDesk
) => {
	return [`Winner`].concat(
		resultOptions.map(requestOption => {
			return determineWinner(
				test1.data.average.firstView[requestOption.wptField],
				test2.data.average.firstView[requestOption.wptField],
				test1MobDesk,
				test2MobDesk
			);
		})
	);
};

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

		tests.forEach(test => {
			const mobDesk = mobDeskLabel(test.data.location);
			//Description header
			csvData.push([getTestTextHeader(test)]);
			//Table header
			csvData.push(getTableHeader(testConfig.resultOptions));
			//Iterate over run data
			test.data.runs.forEach((run, idx) => {
				csvData.push(getRunRow(run, idx, testConfig.resultOptions, mobDesk));
			});
			//Average Line
			csvData.push(getAvgRow(test, testConfig.resultOptions, mobDesk));
			//Blank line to separate the tests
			csvData.push([" "]);
		});
	} catch (e) {
		console.log(e);
	}

	return csvData;
};

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
					csvData.push(
						getRunRow(run, idx, testConfig.resultOptions, mobDeskAhead)
					);
				});
				//Average
				csvData.push(
					getAvgRow(tests[i + 1], testConfig.resultOptions, mobDeskAhead)
				);
				//Difference
				csvData.push(
					getDifferenceRow(tests[i], tests[i + 1], testConfig.resultOptions)
				);
				//Winner
				csvData.push(
					getWinnerRow(
						tests[i],
						tests[i + 1],
						testConfig.resultOptions,
						mobDesk,
						mobDeskAhead
					)
				);
				//Blank line to separate the tests
				csvData.push([" "]);
			}
		}
	} catch (e) {
		console.log(e);
	}

	return csvData;
};
