import { Router as _Router } from "express";
import fetch from "node-fetch";
require("dotenv").config();
const router = _Router();
const WPTSERVER = process.env.WPTSERVER || "http://10.10.0.90";

router.post("/", (req, res) => {
	let promises = [],
		atLeastOneTest = false;
	//Iterate over the URLs
	req.body.testUrls.forEach(testObj => {
		if (testObj.url && testObj.url !== "" && Number.isInteger(testObj.index)) {
			atLeastOneTest = true;
			req.body.testLocations.forEach(location => {
				const requestUrl =
					WPTSERVER +
					`/runtest.php?url=${testObj.url}&f=json&location=${location.location}&runs=${req.body.numberOfTests}&fvonly=1`;
				promises.push(
					fetch(requestUrl)
						.then(serviceResponse => serviceResponse.json())
						.then(resJson => {
							return {
								url: testObj.url,
								location: location.location,
								testId: resJson.data.testId
							};
						})
						.catch(error => {
							console.log(`Promise rejected: ${error}`);
							return res.json({
								statusCode: 400,
								statusMsg: `submitTests error: ${error}`
							});
						})
				);
			});
		}
		if (!atLeastOneTest) {
			return res.json({
				statusCode: 400,
				statusMsg: `submitTests error: No valid tests`
			});
		}
	});
	Promise.all(promises)
		.then(values => {
			return res.json({ statusCode: 200, statusMsg: "Ok", tests: values });
		})
		.catch(error => {
			console.log(`submitTests.js error: ${error}`);
			return res.json({
				statusCode: 400,
				statusMsg: `submitTests error: ${error}`
			});
		});
});

export default router;
