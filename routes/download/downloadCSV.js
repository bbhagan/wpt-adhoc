import { Router as _Router } from "express";
import { getTestSet } from "../../public/static/js/wptInterface";
import { sortTestsByURL } from "../../public/static/js/sortTests";
import { calcUOMPrecision } from "../../public/static/js/mathUtils";

import stringify from "csv-stringify";
require("dotenv").config();
const SERVER_URL = process.env.SERVER_URL;
const SERVER_PORT = process.env.SERVER_PORT;
const router = _Router();

router.post("/", async (req, res) => {
	//console.log(`body ${JSON.stringify(req.body)}`);

	try {
		const tests = sortTestsByURL(
			await getTestSet(req.body.testIds, {
				SERVER_URL,
				SERVER_PORT
			}),
			req.body.sorting
		);
		const csvData = [];
		tests.forEach(test => {
			//Description header
			csvData.push([
				`Test Id: ${test.testId}, Test URL: ${test.data.url}, Location: ${test.data.location}`
			]);
			//Table header
			csvData.push(
				[" "].concat(
					req.body.resultOptions.map(requestOption => {
						return `${requestOption.name} (${requestOption.uom})`;
					})
				)
			);
			//Iterate over run data
			test.data.runs.forEach((run, idx) => {
				csvData.push(
					[`Run ${idx + 1}`].concat(
						req.body.resultOptions.map(requestOption => {
							return calcUOMPrecision(
								run.firstView[requestOption.wptField],
								requestOption.uom,
								requestOption.decimalPlacePrecision
							);
						})
					)
				);
			});
			//Average Line
			csvData.push(
				[`Avg.`].concat(
					req.body.resultOptions.map(requestOption => {
						return calcUOMPrecision(
							test.data.average.firstView[requestOption.wptField],
							requestOption.uom,
							requestOption.decimalPlacePrecision
						);
					})
				)
			);
		});
		console.log(`csvData: ${JSON.stringify(csvData)}`);

		res.setHeader("Content-Type", "text/csv");
		res.setHeader(
			"Content-Disposition",
			'attachment; filename="' + "download-" + Date.now() + '.csv"'
		);
		res.setHeader("Cache-Control", "no-cache");
		res.setHeader("Pragma", "no-cache");

		stringify(csvData, {}).pipe(res);
	} catch (e) {
		console.log(e);
	}
});

export default router;
