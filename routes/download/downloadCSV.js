import { Router as _Router } from "express";
import { getTestSet } from "../../public/static/js/wptInterface";

import stringify from "csv-stringify";
require("dotenv").config();
const SERVER_URL = process.env.SERVER_URL;
const SERVER_PORT = process.env.SERVER_PORT;
const router = _Router();

router.post("/", async (req, res) => {
	//console.log(`body ${JSON.stringify(req.body)}`);

	try {
		const tests = await getTestSet(req.body.testIds, {
			SERVER_URL,
			SERVER_PORT
		});
		console.log();
		const data = [
			{ Blah: "blort", Something: "awesome" },
			{ Blah: "foo", Something: "even better" },
			{ Blah: "apple", Something: "orange" }
		];

		res.setHeader("Content-Type", "text/csv");
		res.setHeader(
			"Content-Disposition",
			'attachment; filename="' + "download-" + Date.now() + '.csv"'
		);
		res.setHeader("Cache-Control", "no-cache");
		res.setHeader("Pragma", "no-cache");

		stringify(data, { header: true }).pipe(res);
	} catch (e) {
		console.log(e);
	}
});

export default router;
