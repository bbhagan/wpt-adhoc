import React from "react";
import TestConfiguration from "../components/testConfiguration/TestConfiguration.js";
import StandardLayout from "../layouts/StandardLayout.js";
import TestResults from "../components/results/TestResults.js";
import TestsInProgress from "../components/results/TestsInProgress.js";
import { resultsOptions } from "../data/resultsOptionsData.js";
import moment from "moment";
import { fetchTestResults } from "../public/static/js/wptInterface.js";
import { fetchLocations } from "../public/static/js/wptInterface.js";
import { submitTests as APISubmitTests } from "../public/static/js/wptInterface.js";
import { addPreviousTest } from "../public/static/js/localStorageInterface.js";
import { getPreviousTest } from "../public/static/js/localStorageInterface.js";

const SERVER_URL = process.env.SERVER_URL;
const SERVER_PORT = process.env.SERVER_PORT;
const UI_GET_LOCATIONS_FETCH_TIMEOUT = process.env.UI_GET_LOCATIONS_FETCH_TIMEOUT;
const UI_SUBMIT_TESTS_TIMEOUT = process.env.UI_SUBMIT_TESTS_TIMEOUT;
const UI_GET_TEST_RESULTS_TIMEOUT = process.env.UI_GET_TEST_RESULTS_TIMEOUT;
const DEFAULT_NUMBER_OF_RUNS = Number(process.env.DEFAULT_NUMBER_OF_RUNS);
const DEFAULT_GROUPING = process.env.DEFAULT_GROUPING;
const DEFAULT_SORTING = process.env.DEFAULT_SORTING;
const DEFAULT_NUMBER_OF_URLS = Number(process.env.DEFAULT_NUMBER_OF_URLS);
const WATCH_TEST_CHECK_FREQUENCY = Number(process.env.WATCH_TEST_CHECK_FREQUENCY);
const WATCH_TEST_MAX_REQUESTS = Number(process.env.WATCH_TEST_MAX_REQUESTS);
const WATCH_TEST_INTERVAL_RETRY = Number(process.env.WATCH_TEST_MAX_REQUESTS);

/**
 * Renders main index page
 *
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
	/**
	 *Creates an instance of Index.
	 * @param {object} props
	 * @memberof Index
	 */
	constructor(props) {
		super(props);
		this.state = {
			testLocations: this.props.testLocations.testLocations,
			urls: [],
			tests: [],
			afterTests: [],
			resultOptions: resultsOptions,
			grouping: "",
			sorting: "",
			numberOfRuns: 0
		};
		this.inProgress = React.createRef();
		//This will limit number of watches so server doesn't get bogged down
		this.activeWatchRequests = 0;
	}

	/**
	 * Looks up previous test set and loads into state. Also calls watch tests to populate data into state
	 *
	 * @param {object} props -- props object
	 */
	populateStateFromInitialProps = props => {
		if (props.previousTestId) {
			const previousTest = getPreviousTest(props.previousTestId);
			//Maybe we don't have a previous test to lookup?
			if (previousTest.testConfig) {
				this.setState({
					urls: previousTest.testConfig.urls,
					tests: previousTest.testConfig.tests,
					afterTests: previousTest.testConfig.afterTests,
					resultOptions: previousTest.testConfig.resultOptions,
					grouping: previousTest.testConfig.grouping,
					sorting: previousTest.testConfig.sorting,
					numberOfRuns: previousTest.testConfig.numberOfRuns
				});
				previousTest.testConfig.tests.forEach(test => {
					this.watchTest(test);
				});
				previousTest.testConfig.afterTests.forEach(test => {
					this.watchTest(test);
				});
			}
		}
	};

	/**
	 * Populates React state from .env defaults
	 */
	pupulateSateFromDeafaults = () => {
		let defaultUrls = [];
		for (let i = 0; i < DEFAULT_NUMBER_OF_URLS; i++) {
			defaultUrls.push("");
		}
		this.setState({
			urls: defaultUrls,
			grouping: DEFAULT_GROUPING,
			sorting: DEFAULT_SORTING,
			numberOfRuns: DEFAULT_NUMBER_OF_RUNS,
			tests: [],
			afterTests: [],
			resultOptions: resultsOptions,
			testLocations: this.props.testLocations.testLocations
		});
	};

	/**
	 * Next lifecycle method. Return the Page's initial properties.
	 *
	 * @static
	 * @param {*} { req }
	 * @returns {object}
	 * @memberof Index
	 */
	static async getInitialProps({ query }) {
		let initialProps = {};
		initialProps.previousTestId = query.previousTestId;
		initialProps.testLocations = await fetchLocations(UI_GET_LOCATIONS_FETCH_TIMEOUT, `${SERVER_URL}:${SERVER_PORT}`);
		return initialProps;
	}

	/**
	 * Standard React lifecycle method, called on client only
	 */
	componentDidMount() {
		if (this.props.previousTestId) {
			this.populateStateFromInitialProps(this.props);
		} else {
			//no previous tests, populate state defaults
			this.pupulateSateFromDeafaults();
		}
	}

	/**
	 * Receives call from component to add more URLs to main test billboard. Sets React state.
	 */
	handleAddMoreURLs = () => {
		const urls = [...this.state.urls, "", "", ""];
		this.setState({ urls });
	};

	/**
	 * Receives call from component to update URLs to test. Sets React state.
	 *
	 * @param {array} urls -- URL array to test
	 */
	handleUpdateURLs = urls => {
		this.setState({ urls: urls });
	};

	/**
	 * Receives call from component to update the test grouping. Sets React State.
	 *
	 * @param {string} grouping -- The grouping value
	 */
	handleUpdateGrouping = grouping => {
		this.setState({ grouping });
	};

	/**
	 * Receives call from component to update the test sorting. Sets React State.
	 *
	 * @param {string} sorting -- The sorting value
	 */
	handleUpdateSorting = sorting => {
		this.setState({ sorting });
	};

	/**
	 * Receives call from component to update the number of tests to run. Sets React state.
	 *
	 * @param {number} numberOfRuns -- Number of tests to run
	 */
	handleUpdateNumberOfRuns = numberOfRuns => {
		this.setState({ numberOfRuns });
	};

	/**
	 * Receives call from component to update test result options. Sets React state.
	 *
	 * @param {array} options -- Array of test result options
	 */
	handleUpdateResultOptions = options => {
		this.setState({ resultOptions: options });
	};

	/**
	 * Receives call from component to update locations to test against. Sets React state.
	 *
	 * @param {array} locations -- Locations to test against
	 *
	 */
	handleUpdateTestLocations = testLocations => {
		this.setState({ testLocations });
	};

	/**
	 * Takes event and submits tests for re-test (for comparison to formerly run tests)
	 */
	handleResubmitTests = () => {
		this.submitTests(true);
	};

	/**
	 * Takes event and submits tests
	 */
	handleSubmitTests = () => {
		//clear out any old lingering tests (from possibly previousTests)
		this.setState({ tests: [], afterTests: [] });
		this.submitTests(false);
	};

	/**
	 * Takes event from submit tests button and kicks off the tests
	 *
	 * @param {boolean} afterTest -- Trigger to re-run tests as afterTests (comparison to previous tests)
	 */
	submitTests = async afterTest => {
		try {
			const tests = await APISubmitTests(
				//filter the tests for populated URLs and active locations
				{
					testUrls: this.state.urls.filter(url => url),
					testLocations: this.state.testLocations.filter(location => location.active),
					numberOfRuns: this.state.numberOfRuns
				},
				UI_SUBMIT_TESTS_TIMEOUT
			);
			//At this point we have the basic test structure (with test id, without any data)
			if (afterTest) {
				this.setState({ afterTests: tests });
			} else {
				this.setState({ tests });
			}

			//Save off to local storage (deep copy state so state does not get modified)
			addPreviousTest(moment().format(), JSON.parse(JSON.stringify(this.state)));

			//Start watching tests for completion
			tests.forEach(test => {
				this.watchTest(test, afterTest);
			});

			//Scroll page to in progress section
			this.inProgress.current.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		} catch (e) {
			console.log(`index:handleSubmitTests Failure submitting tests. ${e}`);
		}
	};

	/**
	 * Takes event from button and calls pupulateSateFromDeafaults to reset the state
	 */
	handleResetTests = () => {
		this.pupulateSateFromDeafaults();
	};

	/**
	 * Monitors state of test. Sets React state. Recursive.
	 *
	 * @param {object} testToWatch -- Test object
	 * @param {boolean} afterTest -- Whether this is a comparison after test
	 */
	watchTest = (testToWatch, afterTest) => {
		let newTest = {};
		//The following logic prevents too many watch requests going out at once, clogging the server
		const checkMaxWatcTestsInterval = setInterval(async () => {
			if (this.activeWatchRequests < WATCH_TEST_MAX_REQUESTS) {
				this.activeWatchRequests++;
				clearInterval(checkMaxWatcTestsInterval);
				newTest = await fetchTestResults(testToWatch, UI_GET_TEST_RESULTS_TIMEOUT, `${SERVER_URL}:${SERVER_PORT}`);
				this.activeWatchRequests--;
				let srcTests = [];
				if (afterTest) {
					srcTests = this.state.afterTests;
				} else {
					srcTests = this.state.tests;
				}

				const updatedTests = srcTests.map(test => {
					//not the test we are looking for
					if (test.testId !== testToWatch.testId) return test;

					//test we are looking for
					if (!newTest.completed) {
						setTimeout(() => {
							this.watchTest(newTest, afterTest);
						}, WATCH_TEST_CHECK_FREQUENCY);
					}
					return newTest;
				});
				if (afterTest) {
					this.setState({ afterTests: updatedTests });
				} else {
					this.setState({ tests: updatedTests });
				}
			}
		}, WATCH_TEST_INTERVAL_RETRY);
	};

	/**
	 * React lifecycle method
	 *
	 * @returns {object}
	 * @memberof Index
	 */
	render() {
		let testsInProgress = [];
		let testsCompleted = [];
		let afterTestsInProgress = [];
		let afterTestsCompleted = [];
		let completedTestsComponent;
		let numberOfTests = 0;
		let numberOfAfterTests = 0;

		if (this.state.tests) {
			testsInProgress = this.state.tests.filter(test => !test.completed);
			testsCompleted = this.state.tests.filter(test => test.completed);
			numberOfTests = this.state.tests.length;
		}
		if (this.state.afterTests) {
			afterTestsInProgress = this.state.afterTests.filter(test => test.completed === false);
			afterTestsCompleted = this.state.afterTests.filter(test => test.completed === true);
			numberOfAfterTests = this.state.afterTests.length;
		}

		if (testsCompleted) {
			completedTestsComponent = (
				<TestResults
					tests={testsCompleted}
					afterTests={afterTestsCompleted}
					resultOptions={this.state.resultOptions}
					grouping={this.state.grouping}
					sorting={this.state.sorting}
					totalNumberOfTests={numberOfTests}
					totalNumberOfAfterTests={numberOfAfterTests}
					handleResubmitTests={this.handleResubmitTests}
				/>
			);
		}
		return (
			<StandardLayout>
				<div className="indexPageContainer">
					<div className="container">
						<TestConfiguration
							urls={this.state.urls}
							handleAddMoreURLs={this.handleAddMoreURLs}
							handleUpdateURLs={this.handleUpdateURLs}
							grouping={this.state.grouping}
							handleUpdateGrouping={this.handleUpdateGrouping}
							sorting={this.state.sorting}
							handleUpdateSorting={this.handleUpdateSorting}
							numberOfRuns={this.state.numberOfRuns}
							handleUpdateNumberOfRuns={this.handleUpdateNumberOfRuns}
							resultOptions={this.state.resultOptions}
							handleUpdateResultOptions={this.handleUpdateResultOptions}
							submitTests={this.handleSubmitTests}
							resetTests={this.handleResetTests}
							testLocations={this.state.testLocations}
							handleUpdateTestLocations={this.handleUpdateTestLocations}
							testLocationFetchError={this.props.testLocations.testLocationFetchError}
						/>
						<div ref={this.inProgress}></div>
						<TestsInProgress
							testsInProgress={testsInProgress}
							afterTestsInProgress={afterTestsInProgress}
							totalNumberOfTests={numberOfTests}
							totalNumberOfAfterTests={numberOfAfterTests}
						/>
						{completedTestsComponent}
					</div>
				</div>
			</StandardLayout>
		);
	}
}

export default Index;
