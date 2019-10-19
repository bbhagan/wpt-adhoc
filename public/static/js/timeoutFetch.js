import fetch from "isomorphic-unfetch";
import moment from "moment";

/**
 * Wraps fetch in a timeout (will Promise reject on timeout)
 * @param {string} url -- URL to fetch from
 * @param {number} miliseconds -- Timeout length (in millisecons)
 * @param {object} init -- fetch init object
 */
const timeoutFetch = (url, miliseconds, init) => {
	const timeoutError = `Request for ${url} timed out after ${miliseconds} milliseconds`;
	return new Promise((resolve, reject) => {
		const fetcher = new Promise((fetcherResolve, fetcherReject) => {
			fetch(url, init).then(
				response => {
					fetcherResolve(response);
				},
				error => {
					fetcherReject(error);
				}
			);
		});

		const timeout = new Promise((timeoutResolve, timeoutReject) => {
			setTimeout(() => {
				timeoutReject(new Error(timeoutError));
			}, miliseconds);
		});

		Promise.race([fetcher, timeout]).then(
			function(returnValue) {
				resolve(returnValue);
			},
			function(error) {
				console.log(`${moment().format()} ${timeoutError}`);
				reject(error);
			}
		);
	});
};

export default timeoutFetch;
