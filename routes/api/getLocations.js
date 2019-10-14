import { Router as _Router } from 'express';
import fetch from 'node-fetch';
require('dotenv').config();
const router = _Router();
const WPTSERVER = process.env.WPTSERVER || 'http://10.10.0.90';


router.get('/', (req, res) => {
    let returnJson = {};
    fetch(WPTSERVER + '/getLocations.php?f=json')
    .then(serviceResponse => serviceResponse.json())
    .then(resJson => {
        if (resJson.statusCode === 200) {
            returnJson.statusCode = 200;
            returnJson.statusMsg = 'Ok';
            returnJson.locations = {desktop: [], mobile: []};
            Object.keys(resJson.data).forEach((location, index) => {
                if (location.indexOf('mobile') > -1) {
                    returnJson.locations.mobile.push({location: location});
                } else {
                    returnJson.locations.desktop.push({location: location});
                }
            });
        } else {
            returnJson.statusCode = resJson.statusCode;
            returnJson.statusMsg = resJson.statusText;
        }
        
        return res.json(returnJson);
    })
    .catch(error => {
        return res.json({statusCode: 400, statusMsg: `Error fetching locations: ${error}`});
    });
});

export default router;