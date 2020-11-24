import timeoutFetch from "./timeoutFetch";
import moment from "moment";

const SERVER_GET_TEST_RESULTS_TIMEOUT =
  process.env.SERVER_GET_TEST_RESULTS_TIMEOUT;
const WATCH_TEST_MAX_REQUESTS = process.env.WATCH_TEST_MAX_REQUESTS;

/**
 * Fetches location data from server
 *
 * @param {number} timeout -- Timeout (in ms) to wait for return from server
 * @param {string} FQDN -- Domain of the local API server to get the locations
 *
 * @returns {object}
 * @memberof Index
 */
export const fetchLocations = async (timeout, FQDN) => {
  try {
    const response = await timeoutFetch(`${FQDN}/api/getLocations`, timeout);
    if (response.ok) {
      const data = await response.json();
      const testLocations = [];
      if (data.statusCode === 200) {
        if (data.locations.desktop.length > 0) {
          testLocations.push({
            location: data.locations.desktop[0].location,
            label: "Desktop",
            active: true,
          });
        }
        if (data.locations.mobile.length > 0) {
          testLocations.push({
            location: data.locations.mobile[0].location,
            label: "Mobile",
            active: true,
          });
        }
        return { testLocations: testLocations };
      }
    } else {
      throw new Error(`No 200 response from fetching locations`);
    }
  } catch (e) {
    console.log(
      `${moment().format()} wptInterface.fetchLocations: Failure fetching locations. ${e}`
    );
    return { testLocationFetchError: "Locations service unavailable" };
  }
};

/**
 * Gets the status of each test
 *
 * @param {object} test -- Test object to be modified and returned
 * @param {number} timeout -- Timeout (in ms) to wait for return
 *
 * @return {object}
 * @see watchTest
 */
export const fetchTestResults = async (test, timeout, FQDN) => {
  try {
    const res = await timeoutFetch(
      `${FQDN}/api/getTestResults/${test.testId}`,
      timeout
    );
    const resJson = await res.json();
    switch (resJson.statusCode) {
      //Test complete, data came back
      case 200:
        //update the state with new test values
        test.completed = true;
        test.behindCount = null;
        test.data = resJson.data;
        break;
      //Test started, not complete
      case 100:
        //update the test with elapsed time
        test.elapsedSeconds = resJson.testElapsedSeconds;
        test.behindCount = null;
        break;
      //Waiting behind other tests
      case 101:
        test.behindCount = resJson.behindCount;
        break;
      case 400:
        //test maybe too new to request data on. Retry one time after 5 seconds
        break;
      default:
        console.log(
          `Error in fetchTestResults, unknown statusCode: ${resJson.statusCode}`
        );
    }
    return test;
  } catch (e) {
    console.log(`Failure fetching test results. ${e}`);
    return test;
  }
};

/**
 * Submit tests to the backend, returns array of test results
 *
 * @param {object} testsConfig -- WPT test configuration
 * @param {number} timeout -- Timeout in ms
 * @returns {array}
 */
export const submitTests = async (testsConfig, timeout) => {
  const fetchInit = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(testsConfig),
  };

  try {
    const res = await timeoutFetch("/api/submitTests", timeout, fetchInit);
    const data = await res.json();
    //add some artificial data onto each test
    if (data.statusCode === 200) {
      const tests = data.tests.map((test) => {
        test.completed = false;
        test.elapsedSeconds = 0;
        return test;
      });
      return tests;
    } else {
      console.log(
        `wptInterface.submitTests: Submit tests error: ${data.statusMsg}`
      );
    }
  } catch (e) {
    console.log(`wptInterface:submitTests Failure submitting tests. ${e}`);
  }
};

/**
 * Gets tests results and returns a resolved promise with an array of tests
 *
 * @param {array} testIds -- Array of testIds to fetch
 * @param {object} serverConfig -- SERVER_URL & SERVER_PORT
 * @returns {promise}
 */
export const getTestSet = (testIds, serverConfig) => {
  return new Promise((resolve, reject) => {
    //Reverse the tests since we will be fetching them in reverse order (making easier to pop() them off the stack)
    let reverseTestIds = testIds.reverse();
    let returnTests = [];

    /**
     * Recursive function that gets all of the tests in serial. This is to avoid overloading the server and not getting any of them back
     */
    function makeCall() {
      fetchTestResults(
        //Get testId from end of the array
        { testId: reverseTestIds[testIds.length - 1] },
        SERVER_GET_TEST_RESULTS_TIMEOUT,
        `${serverConfig.SERVER_URL}:${serverConfig.SERVER_PORT}`
      )
        .then((test) => {
          returnTests.push(test);
          //Remove test that we just got from the array
          reverseTestIds.pop();
          //If there are more to get, call self, else resolve the promise
          if (reverseTestIds.length > 0) {
            makeCall();
          } else {
            resolve(returnTests);
          }
        })
        .catch((error) => {
          console.log(`wptInterface.getTestSet Promise rejected: ${error}`);
          reject(error);
        });
    }

    //First time through, all other iterations are recursive from makeCall()
    if (reverseTestIds.length > 0) {
      makeCall();
    }
  });
};
