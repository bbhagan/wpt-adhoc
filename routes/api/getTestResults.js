import { Router as _Router } from "express";
import timeoutFetch from "../../public/static/js/timeoutFetch";
import { syntheticTests } from "../../data/syntheticTestsData";
import moment from "moment";
require("dotenv").config();
const router = _Router();
const WPTSERVER = process.env.WPTSERVER;
const SERVER_GET_TEST_RESULTS_TIMEOUT = process.env.SERVER_GET_TEST_RESULTS_TIMEOUT;

router.get("/:testId", async (req, res) => {
	try {
		const serviceResponse = await timeoutFetch(
			`${WPTSERVER}/jsonResult.php?test=${req.params.testId}`,
			SERVER_GET_TEST_RESULTS_TIMEOUT
		);
		const resJSON = await serviceResponse.json();

		switch (resJSON.statusCode) {
			//Returned data
			case 200:
				let data = resJSON.data;
				data.runs = reformatRunData(data.runs);
				findTTFB(data);
				return res.json({ statusCode: 200, statusMsg: "Ok", data });
			//Test started, not completed
			case 100:
				return res.json({
					statusCode: 100,
					statusMsg: "Not complete",
					testElapsedSeconds: resJSON.data.elapsed,
				});
			//Waiting behind other tests in the queue
			case 101:
				return res.json({
					statusCode: 101,
					statusMsg: "Waiting behind other tests",
					behindCount: resJSON.data.behindCount,
				});
			//Something else
			default:
				return res.json({
					statusCode: 400,
					statusMsg: `Error: WPT statusCode: ${resJSON.statusCode}, WPT statusText: ${resJSON.statusText}`,
				});
		}
	} catch (e) {
		const statusMsg = `Error fetching test results: ${e}`;
		console.log(`${moment().format()} ${statusMsg}`);
		res.status(503);

		return res.json({ statusCode: 503, statusMsg: statusMsg });
	}

	/**
	 * Finds TTFB to use in synthetic test results
	 * @param {object} data -- Data object to parse
	 */
	function findTTFB(data) {
		for (var node in data) {
			if (data.hasOwnProperty(node)) {
				if (typeof data[node] === "string" || typeof data[node] === "number") {
					syntheticTests.forEach((syntheticTest) => {
						if (node === syntheticTest.origWptField) {
							data[syntheticTest.wptField] = data[node] - data.TTFB;
						}
					});
				} else if (typeof data[node] === "object") {
					findTTFB(data[node]);
				}
			}
		}
	}

	/**
	 * Takes JSON object formatted results and puts them into an array (more easily consumed)
	 * @param {object} runs -- Data formatted in an object
	 * @return {array}
	 */
	function reformatRunData(runs) {
		let replacementArray = [];
		for (const prop in runs) {
			if (runs.hasOwnProperty(prop)) {
				replacementArray.push(runs[prop]);
			}
		}
		return replacementArray;
	}
});

export default router;
