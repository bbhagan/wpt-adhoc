import { Router as _Router } from "express";
import fetch from "node-fetch";
import { syntheticTests } from "../../data/syntheticTestsData";
require("dotenv").config();
const router = _Router();
const WPTSERVER = process.env.WPTSERVER || "http://10.10.0.90";

router.get("/:testId", (req, res) => {
	fetch(WPTSERVER + "/jsonResult.php?test=" + req.params.testId)
		.then(serviceResponse => serviceResponse.json())
		.then(resJson => {
			switch (resJson.statusCode) {
				//Returned data
				case 200:
					let data = resJson.data;
					data.runs = reformatRunData(data.runs);
					findTTFB(data);
					return res.json({ statusCode: 200, statusMsg: "Ok", data });
				//Test started, not completed
				case 100:
					return res.json({
						statusCode: 100,
						statusMsg: "Not complete",
						testElapsedSeconds: resJson.data.elapsed
					});
				case 101:
					return res.json({
						statusCode: 101,
						statusMsg: "Waiting behind other tests",
						behindCount: resJson.data.behindCount
					});
				default:
					return res.json({
						statusCode: 400,
						statusMsg: `Error: WPT statusCode: ${resJson.statusCode}, WPT statusText: ${resJson.statusText}`
					});
			}
		})
		.catch(error => {
			return res.json({ statusCode: 400, statusMsg: `Error: ${error}` });
		});

	function findTTFB(data) {
		for (var node in data) {
			if (data.hasOwnProperty(node)) {
				if (typeof data[node] === "string" || typeof data[node] === "number") {
					syntheticTests.forEach(syntheticTest => {
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

	//Takes JSON object formatted results and puts them into an array (more easily consumed)
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
