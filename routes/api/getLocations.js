import { Router as _Router } from "express";
import fetch from "isomorphic-unfetch";
require("dotenv").config();
const router = _Router();
const WPTSERVER = process.env.WPTSERVER;

router.get("/", (req, res) => {
	let returnJson = {};
	fetch(WPTSERVER + "/getLocations.php?f=json")
		.then(serviceResponse => serviceResponse.json())
		.then(resJson => {
			if (resJson.statusCode === 200) {
				returnJson.statusCode = 200;
				returnJson.statusMsg = "Ok";
				returnJson.locations = { desktop: [], mobile: [] };
				Object.keys(resJson.data).forEach((location, index) => {
					if (location.indexOf("mobile") > -1) {
						returnJson.locations.mobile.push({ location: location });
					} else {
						returnJson.locations.desktop.push({ location: location });
					}
				});
			} else {
				res.status = resJson.statusCode;
				returnJson.statusCode = resJson.statusCode;
				returnJson.statusMsg = resJson.statusText;
			}

			return res.json(returnJson);
		})
		.catch(error => {
			const statusMsg = `Error fetching locations: ${error}`;

			console.log(statusMsg);
			res.status(400);	// TODO: should this be 503 on timeout (Service Unavailable?)
			return res.json({
				statusCode: 400,
				statusMsg
			});
		});
});

export default router;
