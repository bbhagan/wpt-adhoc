import React from "react";
import TestConfiguration from "../components/testConfiguration/TestConfiguration";
import StandardLayout from "../layouts/StandardLayout";
import TestResults from "../components/results/TestResults";
import "./index.scss";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tests: [],
			resultOptions: []
		};
	}

	submitTests = testConfiguration => {
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

		fetch("/api/submitTests", fetchInit)
			.then(response => response.json())
			.then(data => {
				if (data.statusCode === 200) {
					data.tests.map(test => {
						test.completed = false;
						test.elapsedSeconds = 0;
						return test;
					});
					this.setState({ tests: data.tests });
				} else {
					console.log(`Submit tests error: ${data.statusMsg}`);
				}
			});
	};

	render() {
		return (
			<StandardLayout>
				<div className="indexPageContainer">
					<TestConfiguration submitTests={this.submitTests} />
					<TestResults
						tests={this.state.tests}
						resultOptions={this.state.resultOptions}
					/>
				</div>
			</StandardLayout>
		);
	}
}

export default App;
