import timeoutFetch from "./timeoutFetch";
import moment from "moment";

/**
 * Fetches location data from server
 *
 * @param {number} timeout -- Timeout (in ms) to wait for return from server
 * @param {string} FQDN -- Domain of the local API server to get the locations
 *
 * @returns {object}
 * @memberof Index
 */
export const fetchLocations = async (timeout, FQDN) => {
	try {
		const response = await timeoutFetch(`${FQDN}/api/getLocations`, timeout);
		if (response.ok) {
			const data = await response.json();
			let testLocations = [];
			if (data.statusCode === 200) {
				if (data.locations.desktop.length > 0) {
					testLocations.push({
						location: data.locations.desktop[0].location,
						label: "Desktop",
						active: true
					});
				}
				if (data.locations.mobile.length > 0) {
					testLocations.push({
						location: data.locations.mobile[0].location,
						label: "Mobile",
						active: true
					});
				}
				return { testLocations: testLocations };
			}
		} else {
			throw new Error(`No 200 response from fetching locations`);
		}
	} catch (e) {
		console.log(`${moment().format()} Failure fetching locations. ${e}`);
		return { testLocationFetchError: "Locations service unavailable" };
	}
};

/**
 * Gets the status of each test
 *
 * @param {object} test -- Test object to be modified and returned
 * @param {number} timeout -- Timeout (in ms) to wait for return
 *
 * @return {object}
 * @see watchTest
 */
export const fetchTestResults = async (test, timeout, FQDN) => {
	try {
		const res = await timeoutFetch(
			`${FQDN}/api/getTestResults/${test.testId}`,
			timeout
		);
		const resJson = await res.json();
		switch (resJson.statusCode) {
			//Test complete, data came back
			case 200:
				//update the state with new test values
				test.completed = true;
				test.behindCount = null;
				test.data = resJson.data;
				break;
			//Test started, not complete
			case 100:
				//update the test with elapsed time
				test.elapsedSeconds = resJson.testElapsedSeconds;
				test.behindCount = null;
				break;
			//Waiting behind other tests
			case 101:
				test.behindCount = resJson.behindCount;
				break;
			case 400:
				//test maybe too new to request data on. Retry one time after 5 seconds
				break;
			default:
				console.log(
					`Error in fetchTestResults, unknown statusCode: ${resJson.statusCode}`
				);
		}
		return test;
	} catch (e) {
		console.log(`Failure fetching test results. ${e}`);
		return test;
	}
};

export const submitTests = async (testsConfig, timeout) => {
	const fetchInit = {
		headers: { "Content-Type": "application/json" },
		method: "POST",
		body: JSON.stringify(testsConfig)
	};

	try {
		const res = await timeoutFetch("/api/submitTests", timeout, fetchInit);
		const data = await res.json();
		//add some artificial data onto each test
		if (data.statusCode === 200) {
			const tests = data.tests.map(test => {
				test.completed = false;
				test.elapsedSeconds = 0;
				return test;
			});
			return tests;
		} else {
			console.log(`Submit tests error: ${data.statusMsg}`);
		}
	} catch (e) {
		console.log(`Failure submitting tests. $(e)`);
	}
};

export const getTestSet = (testIds, serverConfig) => {
	return new Promise((resolve, reject) => {
		let promises = [];

		testIds.forEach(testId => {
			promises.push(
				fetchTestResults(
					{ testId },
					1000,
					`${serverConfig.SERVER_URL}:${serverConfig.SERVER_PORT}`
				)
					.then(test => {
						return test;
					})
					.catch(error => {
						console.log(`Promise rejected: ${error}`);
						return {};
					})
			);
		});
		Promise.all(promises)
			.then(tests => {
				resolve(tests);
			})
			.catch(e => {
				console.log(`getTestSet error: ${e}`);
				reject(e);
			});
	});
};
