import React from "react";
import TestConfiguration from "../components/testConfiguration/TestConfiguration";
import StandardLayout from "../layouts/StandardLayout";
import TestResults from "../components/results/TestResults";
import TestsInProgress from "../components/results/TestsInProgress";
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
			urls: [
				{ url: "", index: 0 },
				{ url: "", index: 1 },
				{ url: "", index: 2 }
			],
			tests: [],
			resultOptions: [],
			grouping: "",
			sorting: ""
		};
		this.inProgress = React.createRef();
	}

	/**
	 * Looks up previous test set and loads into state. Also calls watch tests to populate data into state
	 *
	 * @param {string} previousTestId -- Test set ID (in moment date format)
	 */
	populateStateFromInitialProps = previousTestId => {
		const previousTest = getPreviousTest(previousTestId);
		//Maybe we don't have a previous test to lookup?
		if (previousTest.testConfig) {
			this.setState({
				tests: previousTest.testConfig.tests,
				resultOptions: previousTest.testConfig.resultOptions,
				grouping: previousTest.testConfig.grouping,
				sorting: previousTest.testConfig.sorting
			});
			previousTest.testConfig.tests.forEach(test => {
				this.watchTest(test);
			});
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
		initialProps.locations = await fetchLocations(UI_GET_LOCATIONS_FETCH_TIMEOUT, `${SERVER_URL}:${SERVER_PORT}`);
		return initialProps;
	}

	componentDidMount() {
		this.populateStateFromInitialProps(this.props.previousTestId);
	}

	handleSubmitTests = async testConfiguration => {
		//populate state's result options with the selected options
		const selectedResultOptions = [];
		testConfiguration.testResultOptions.forEach(resultOption => {
			if (resultOption.active) selectedResultOptions.push(resultOption);
		});
		this.setState({
			resultOptions: selectedResultOptions,
			grouping: testConfiguration.grouping,
			sorting: testConfiguration.sorting
		});

		//filter the tests for URLs and locations
		const urls = testConfiguration.urls.filter(url => url),
			locations = testConfiguration.testLocations.filter(location => location.active);

		try {
			const tests = await submitTests(
				{
					testUrls: urls,
					testLocations: locations,
					numberOfTests: testConfiguration.numberOfTests
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
		const testsInProgress = this.state.tests.filter(test => test.completed === false);
		const completedTests = this.state.tests.filter(test => test.completed === true);
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
							submitTests={this.handleSubmitTests}
							testLocations={this.props.locations.testLocations}
							testLocationFetchError={this.props.locations.testLocationFetchError}
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
