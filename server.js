import express from "express";
import next from "next";
import apiGetLocations from "./routes/api/getLocations.js";
import apiSubmitTests from "./routes/api/submitTests.js";
import apiGetTestResults from "./routes/api/getTestResults.js";
import downloadCSV from "./routes/download/downloadCSV.js";
import logger from "./middleware/logger.js";

const router = express.Router();
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	//Logging
	server.use(logger);

	//Body Parser
	server.use(express.json());
	server.use(express.urlencoded({ extended: false }));

	router.use("/api/getLocations", apiGetLocations);
	router.use("/api/submitTests", apiSubmitTests);
	router.use("/api/getTestResults", apiGetTestResults);

	router.use("/download/downloadCSV", downloadCSV);

	server.use(router);

	server.all("*", (req, res) => {
		return handle(req, res);
	});

	server.listen(port, err => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
});
