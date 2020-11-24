import moment from "moment";

const logger = (req, res, next) => {
  //get rid of _next bundle requests
  if (req.originalUrl.indexOf("_next") === -1) {
    console.log(
      `${moment().format()} ${req.ip} ${req.method} ${
        req.originalUrl
      } ${req.get("User-Agent")}`
    );
  }

  next();
};
export default logger;
