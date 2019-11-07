import { getTestSet } from "./wptInterface";
import { sortTestsByURL } from "./sortTests";
import { calcUOMPrecision } from "./mathUtils";

require("dotenv").config();
const SERVER_URL = process.env.SERVER_URL;
const SERVER_PORT = process.env.SERVER_PORT;

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
			//Description header
			csvData.push([
				`Test Id: ${test.testId}, Test URL: ${test.data.url}, Location: ${test.data.location}`
			]);
			//Table header
			csvData.push(
				[" "].concat(
					testConfig.resultOptions.map(requestOption => {
						return `${requestOption.name} (${requestOption.uom})`;
					})
				)
			);
			//Iterate over run data
			test.data.runs.forEach((run, idx) => {
				csvData.push(
					[`Run ${idx + 1}`].concat(
						testConfig.resultOptions.map(requestOption => {
							return calcUOMPrecision(
								run.firstView[requestOption.wptField],
								requestOption.uom,
								requestOption.decimalPlacePrecision
							);
						})
					)
				);
			});
			//Average Line
			csvData.push(
				[`Avg.`].concat(
					testConfig.resultOptions.map(requestOption => {
						return calcUOMPrecision(
							test.data.average.firstView[requestOption.wptField],
							requestOption.uom,
							requestOption.decimalPlacePrecision
						);
					})
				)
			);
			//Blank line to separate the tests
			csvData.push([" "]);
		});
	} catch (e) {
		console.log(e);
	}

	return csvData;
};

const generateMobVsDeskGroupingData = async testConfig => {
	const csvData = [];
	try {
		const tests = sortTestsByURL(
			await getTestSet(testConfig.testIds, {
				SERVER_URL,
				SERVER_PORT
			}),
			testConfig.sorting
		);

		tests.forEach(test => {});
	} catch (e) {
		console.log(e);
	}
};
