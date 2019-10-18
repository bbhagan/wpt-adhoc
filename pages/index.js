import TestConfiguration from "../components/testConfiguration/TestConfiguration";
import StandardLayout from "../layouts/StandardLayout";
import TestResults from "../components/results/TestResults";
import TestsInProgress from "../components/results/TestsInProgress";

class index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tests: [],
			resultOptions: []
		};
		this.inProgress = React.createRef();
	}

	submitTests = async testConfiguration => {
		//populate state's result options with the selected options
		const selectedResultOptions = [];
		testConfiguration.testResultOptions.forEach(resultOption => {
			if (resultOption.active) selectedResultOptions.push(resultOption);
		});
		this.setState({ resultOptions: selectedResultOptions });

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

		const res = await fetch("/api/submitTests", fetchInit);
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

		this.inProgress.current.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	};

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

	fetchTestResults = async test => {
		const res = await fetch(`/api/getTestResults/${test.testId}`);
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
	};

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
				/>
			);
		}
		return (
			<StandardLayout>
				<div className="indexPageContainer">
					<div className="container">
						<TestConfiguration submitTests={this.submitTests} />

						<div ref={this.inProgress}></div>
						<TestsInProgress
							tests={testsInProgress}
							totalNumberOfTests={this.state.tests.length}
						/>
						{completedTestsComponent}
					</div>
				</div>
			</StandardLayout>
		);
	}
}

/*

*/
export default index;
