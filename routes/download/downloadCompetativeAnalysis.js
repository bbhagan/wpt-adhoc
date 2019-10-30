import { Router as _Router } from "express";
import timeoutFetch from "../../public/static/js/timeoutFetch";
import moment from "moment";
import stringify from "csv-stringify";
require("dotenv").config();
const router = _Router();
const WPTSERVER = process.env.WPTSERVER;

router.get("/", async (req, res) => {
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
