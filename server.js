import express, { Router as _Router } from "express";
import next from "next";
import apiGetLocations from "./routes/api/getLocations";
import apiSubmitTests from "./routes/api/submitTests";
import apiGetTestResults from "./routes/api/getTestResults";
import downloadCSV from "./routes/download/downloadCSV";
import logger from "./middleware/logger";

const router = _Router();
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
