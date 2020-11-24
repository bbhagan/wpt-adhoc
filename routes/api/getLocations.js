import { Router as _Router } from "express";
import timeoutFetch from "../../public/static/js/timeoutFetch";
import moment from "moment";
require("dotenv").config();
const router = _Router();
const WPTSERVER = process.env.WPTSERVER;
const SERVER_GET_LOCATIONS_FETCH_TIMEOUT =
  process.env.SERVER_GET_LOCATIONS_FETCH_TIMEOUT;

router.get("/", async (req, res) => {
  let returnJSON = {};
  try {
    const serviceResponse = await timeoutFetch(
      `${WPTSERVER}/getLocations.php?f=json`,
      SERVER_GET_LOCATIONS_FETCH_TIMEOUT
    );
    const resJSON = await serviceResponse.json();
    if (resJSON.statusCode === 200) {
      returnJSON = {
        statusCode: 200,
        statusMsg: "Ok",
        locations: { desktop: [], mobile: [] },
      };
      //Iterate over the received data and attach it to the response data
      Object.keys(resJSON.data).forEach((location, index) => {
        if (location.indexOf("mobile") > -1) {
          returnJSON.locations.mobile.push({ location: location });
        } else {
          returnJSON.locations.desktop.push({ location: location });
        }
      });
    } else {
      //Non 200 response
      res.status = resJSON.statusCode;
      returnJSON = {
        statusCode: resJSON.statusCode,
        statusMsg: resJSON.statusText,
      };
    }

    return res.json(returnJSON);
  } catch (e) {
    const statusMsg = `Error fetching locations: ${e}`;

    console.log(`${moment().format()} ${statusMsg}`);
    res.status(503); // TODO: should this be 503 on timeout (Service Unavailable?)
    return res.json({
      statusCode: 400,
      statusMsg,
    });
  }
});

export default router;
