import { Router as _Router } from "express";
import timeoutFetch from "../../public/static/js/timeoutFetch";
require("dotenv").config();
const router = _Router();
const SERVER_SUBMIT_TESTS_TIMEOUT = process.env.SERVER_SUBMIT_TESTS_TIMEOUT;
const WPTSERVER = process.env.WPTSERVER;

router.post("/", (req, res) => {
	let promises = [];
	let atLeastOneTest = false;
	//Iterate over the URLs
	req.body.testUrls.forEach(url => {
		if (url && url !== "") {
			atLeastOneTest = true;
			req.body.testLocations.forEach(location => {
				const requestUrl = `${WPTSERVER}/runtest.php?url=${url}&f=json&location=${location.location}&runs=${req.body.numberOfRuns}&fvonly=1`;
				promises.push(
					timeoutFetch(requestUrl, SERVER_SUBMIT_TESTS_TIMEOUT)
						.then(serviceResponse => serviceResponse.json())
						.then(resJson => {
							return {
								url: url,
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
