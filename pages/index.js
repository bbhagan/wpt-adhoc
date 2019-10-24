import TestConfiguration from "../components/testConfiguration/TestConfiguration";
import StandardLayout from "../layouts/StandardLayout";
import TestResults from "../components/results/TestResults";
import TestsInProgress from "../components/results/TestsInProgress";
import timeoutFetch from "../public/static/js/timeoutFetch";
import moment from "moment";

const LOCALHOST = process.env.LOCALHOST;
const PORT = process.env.PORT;
const UI_GET_LOCATIONS_FETCH_TIMEOUT =
	process.env.UI_GET_LOCATIONS_FETCH_TIMEOUT;
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
			tests: [],
			resultOptions: [],
			grouping: ""
		};
		this.inProgress = React.createRef();
	}

	/**
	 * Next lifecycle method. Return the Page's initial properties.
	 *
	 * @static
	 * @param {*} { req }
	 * @returns {object}
	 * @memberof Index
	 */
	static async getInitialProps({ req }) {
		return await Index.fetchLocations();
	}

	/**
	 * Fetches location data from server
	 *
	 * @static
	 * @returns {object}
	 * @memberof Index
	 */
	static async fetchLocations() {
		try {
			const response = await timeoutFetch(
				`${LOCALHOST}:${PORT}/api/getLocations`,
				UI_GET_LOCATIONS_FETCH_TIMEOUT
			);
			if (response.ok) {
				const data = await response.json();
				let testLocations = [];
				if (data.statusCode === 200) {
					if (data.locations.desktop.length > 0) {
						testLocations.push({
							location: data.locations.desktop[0].location,
							label: "Desktop",
							active: true
						});
					}
					if (data.locations.mobile.length > 0) {
						testLocations.push({
							location: data.locations.mobile[0].location,
							label: "Mobile",
							active: true
						});
					}
					return { testLocations: testLocations };
				}
			} else {
				throw new Error(`No 200 response from fetching locations`);
			}
		} catch (e) {
			console.log(`${moment().format()} Failure fetching locations. ${e}`);
			return { testLocationFetchError: "Locations service unavailable" };
		}
	}

	/**
	 * Submits tests to WPT API. Sets React state
	 *
	 * @memberof index
	 */
	submitTests = async testConfiguration => {
		//populate state's result options with the selected options
		const selectedResultOptions = [];
		testConfiguration.testResultOptions.forEach(resultOption => {
			if (resultOption.active) selectedResultOptions.push(resultOption);
		});
		this.setState({
			resultOptions: selectedResultOptions,
			grouping: testConfiguration.grouping
		});

		//filter the tests for URLs and locations
		const urls = testConfiguration.urls.filter(url => url),
			locations = testConfiguration.testLocations.filter(
				location => location.active
			);

		const fetchInit = {
			headers: { "Content-Type": "application/json" },
			method: "POST",
			body: JSON.stringify({
				testUrls: urls,
				testLocations: locations,
				numberOfTests: testConfiguration.numberOfTests
			})
		};

		try {
			const res = await timeoutFetch(
				"/api/submitTests",
				UI_SUBMIT_TESTS_TIMEOUT,
				fetchInit
			);
			const data = await res.json();
			if (data.statusCode === 200) {
				data.tests.map(test => {
					test.completed = false;
					test.elapsedSeconds = 0;
					return test;
				});
				//intermediate set state, before we start real getting results back
				this.setState({ tests: data.tests });
				data.tests.forEach(test => {
					this.watchTest(test);
				});
			} else {
				console.log(`Submit tests error: ${data.statusMsg}`);
			}

			//Scroll page to in progress section
			this.inProgress.current.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		} catch (e) {
			console.log(`Failure submitting tests. $(e)`);
		}
	};

	/**
	 * Monitors state of test. Sets React state. Recursive.
	 *
	 * @memberof index
	 */
	watchTest = testToWatch => {
		setTimeout(async () => {
			const newTest = await this.fetchTestResults(testToWatch);

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
	 * Gets the status of each test
	 *
	 * @return {object}
	 * @see watchTest
	 * @memberof index
	 */
	fetchTestResults = async test => {
		try {
			const res = await timeoutFetch(
				`/api/getTestResults/${test.testId}`,
				UI_GET_TEST_RESULTS_TIMEOUT
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
	 * React lifecycle method
	 *
	 * @returns {object}
	 * @memberof Index
	 */
	render() {
		const testsInProgress = this.state.tests.filter(
			test => test.completed === false
		);
		const completedTests = this.state.tests.filter(
			test => test.completed === true
		);
		let completedTestsComponent;
		if (completedTests) {
			completedTestsComponent = (
				<TestResults
					tests={completedTests}
					resultOptions={this.state.resultOptions}
					grouping={this.state.grouping}
				/>
			);
		}
		return (
			<StandardLayout>
				<div className="indexPageContainer">
					<div className="container">
						<TestConfiguration
							submitTests={this.submitTests}
							testLocations={this.props.testLocations}
							testLocationFetchError={this.props.testLocationFetchError}
						/>

						<div ref={this.inProgress}></div>
						<TestsInProgress
							tests={testsInProgress}
							totalNumberOfTests={this.state.tests.length}
						/>
						{completedTestsComponent}
					</div>
					<div>{this.props.foo}</div>
				</div>
			</StandardLayout>
		);
	}
}

export default Index;
