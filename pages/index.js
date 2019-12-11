import React from "react";
import TestConfiguration from "../components/testConfiguration/TestConfiguration";
import StandardLayout from "../layouts/StandardLayout";
import TestResults from "../components/results/TestResults";
import TestsInProgress from "../components/results/TestsInProgress";
import { resultsOptions } from "../data/resultsOptionsData";
import moment from "moment";
import { fetchTestResults } from "../public/static/js/wptInterface";
import { fetchLocations } from "../public/static/js/wptInterface";
import { submitTests } from "../public/static/js/wptInterface";
import { addPreviousTest } from "../public/static/js/localStorageInterface";
import { getPreviousTest } from "../public/static/js/localStorageInterface";

const SERVER_URL = process.env.SERVER_URL;
const SERVER_PORT = process.env.SERVER_PORT;
const UI_GET_LOCATIONS_FETCH_TIMEOUT = process.env.UI_GET_LOCATIONS_FETCH_TIMEOUT;
const UI_SUBMIT_TESTS_TIMEOUT = process.env.UI_SUBMIT_TESTS_TIMEOUT;
const UI_GET_TEST_RESULTS_TIMEOUT = process.env.UI_GET_TEST_RESULTS_TIMEOUT;

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
			urls: ["", "", ""],
			tests: [],
			resultOptions: resultsOptions,
			grouping: "none",
			sorting: "alpha",
			numberOfTests: 2
		};
		this.inProgress = React.createRef();
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
					resultOptions: previousTest.testConfig.resultOptions,
					grouping: previousTest.testConfig.grouping,
					sorting: previousTest.testConfig.sorting,
					numberOfTests: previousTest.testConfig.numberOfTests
				});
				previousTest.testConfig.tests.forEach(test => {
					this.watchTest(test);
				});
			}
		}
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
		this.populateStateFromInitialProps(this.props);
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
	 * @param {number} numberOfTests -- Number of tests to run
	 */
	handleUpdateNumberOfTests = numberOfTests => {
		this.setState({ numberOfTests });
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
	 * Takes event from submit tests button and kicks off the tests
	 */
	handleSubmitTests = async () => {
		try {
			const tests = await submitTests(
				//filter the tests for populated URLs and active locations
				{
					testUrls: this.state.urls.filter(url => url),
					testLocations: this.state.testLocations.filter(location => location.active),
					numberOfTests: this.state.numberOfTests
				},
				UI_SUBMIT_TESTS_TIMEOUT
			);
			//At this point we have the basic test structure (with test id, without any data)
			this.setState({ tests });
			//Save off to local storage
			addPreviousTest(moment().format(), this.state);
			tests.forEach(test => {
				this.watchTest(test);
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
	 * Monitors state of test. Sets React state. Recursive.
	 *
	 * @memberof index
	 */
	watchTest = testToWatch => {
		setTimeout(async () => {
			const newTest = await fetchTestResults(testToWatch, UI_GET_TEST_RESULTS_TIMEOUT, `${SERVER_URL}:${SERVER_PORT}`);

			const updatedTests = this.state.tests.map(test => {
				//not the test we are looking for
				if (test.testId !== testToWatch.testId) return test;

				//test we are looking for
				if (!newTest.completed) this.watchTest(newTest);
				return newTest;
			});
			this.setState({ tests: updatedTests });
		}, 1500);
	};

	/**
	 * React lifecycle method
	 *
	 * @returns {object}
	 * @memberof Index
	 */
	render() {
		let testsInProgress = [];
		let completedTests = [];
		if (this.state.tests) {
			testsInProgress = this.state.tests.filter(test => test.completed === false);
			completedTests = this.state.tests.filter(test => test.completed === true);
		}

		let completedTestsComponent;
		if (completedTests) {
			completedTestsComponent = (
				<TestResults
					tests={completedTests}
					resultOptions={this.state.resultOptions}
					grouping={this.state.grouping}
					sorting={this.state.sorting}
					totalNumberOfTests={this.state.tests.length}
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
							numberOfTests={this.state.numberOfTests}
							handleUpdateNumberOfTests={this.handleUpdateNumberOfTests}
							resultOptions={this.state.resultOptions}
							handleUpdateResultOptions={this.handleUpdateResultOptions}
							submitTests={this.handleSubmitTests}
							testLocations={this.state.testLocations}
							handleUpdateTestLocations={this.handleUpdateTestLocations}
							testLocationFetchError={this.props.testLocations.testLocationFetchError}
						/>
						<div ref={this.inProgress}></div>
						<TestsInProgress tests={testsInProgress} totalNumberOfTests={this.state.tests.length} />
						{completedTestsComponent}
					</div>
				</div>
			</StandardLayout>
		);
	}
}

export default Index;
