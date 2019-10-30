import TestConfiguration from "../components/testConfiguration/TestConfiguration";
import StandardLayout from "../layouts/StandardLayout";
import TestResults from "../components/results/TestResults";
import TestsInProgress from "../components/results/TestsInProgress";
import { fetchTestResults } from "../public/static/js/wptInterface";
import { fetchLocations } from "../public/static/js/wptInterface";
import { submitTests } from "../public/static/js/wptInterface";

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
			grouping: "",
			sorting: ""
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
		return await fetchLocations(
			UI_GET_LOCATIONS_FETCH_TIMEOUT,
			`${LOCALHOST}:${PORT}`
		);
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
			locations = testConfiguration.testLocations.filter(
				location => location.active
			);

		try {
			const tests = await submitTests(
				{
					testUrls: urls,
					testLocations: locations,
					numberOfTests: testConfiguration.numberOfTests
				},
				UI_SUBMIT_TESTS_TIMEOUT
			);
			this.setState({ tests });
			tests.forEach(test => {
				this.watchTest(test);
			});

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
			const newTest = await fetchTestResults(
				testToWatch,
				UI_GET_TEST_RESULTS_TIMEOUT
			);

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
							submitTests={this.handleSubmitTests}
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
