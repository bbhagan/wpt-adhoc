import { Router as _Router } from "express";
import { generateNoGroupingData } from "../../public/static/js/generateCSVData";
import stringify from "csv-stringify";

const router = _Router();

router.post("/", async (req, res) => {
	try {
		let testConfig = req.body.testConfig;
		if (typeof testConfig === "string") {
			testConfig = JSON.parse(testConfig);
		}

		let csvData = [];

		switch (testConfig.grouping) {
			case "mobVsDesk":
				break;
			case "competative":
				break;
			default:
				//"none"
				csvData = await generateNoGroupingData(testConfig);
		}

		res.setHeader("Content-Type", "text/csv");
		res.setHeader(
			"Content-Disposition",
			'attachment; filename="' + "download-" + Date.now() + '.csv"'
		);
		res.setHeader("Cache-Control", "no-cache");
		res.setHeader("Pragma", "no-cache");

		stringify(csvData, {}).pipe(res);
	} catch (e) {
		console.log(`downloadCSV Error: ${e}`);
	}
});

export default router;
