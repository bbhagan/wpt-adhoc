import timeoutFetch from "./timeoutFetch";
import moment from "moment";

/**
 * Fetches location data from server
 *
 * @static
 * @returns {object}
 * @memberof Index
 */
const fetchLocations = async (timeout, FQDN) => {
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

export { fetchLocations };

/**
 * Gets the status of each test
 *
 * @return {object}
 * @see watchTest
 */
const fetchTestResults = async (test, timeout) => {
	try {
		const res = await timeoutFetch(
			`/api/getTestResults/${test.testId}`,
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

export { fetchTestResults };

const submitTests = async (testsConfig, timeout) => {
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

export { submitTests };
