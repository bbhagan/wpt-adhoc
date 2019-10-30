import { Router as _Router } from "express";

import stringify from "csv-stringify";
require("dotenv").config();
const router = _Router();

router.post("/", async (req, res) => {
	console.log(`body ${JSON.stringify(req.body)}`);
	let tests = [];
	req.body.testIds.forEach();
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
});

export default router;
