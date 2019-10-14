import moment from "moment";

const logger = (req, res, next) => {
	console.log(
		`${moment().format()} ${req.ip} ${req.method} ${req.originalUrl} ${req.get(
			"User-Agent"
		)}`
	);
	next();
};
export default logger;
