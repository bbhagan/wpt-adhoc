import React from "react";
import TestResult from "./TestResult";

import PropTypes from "prop-types";

class TestResults extends React.Component {
	render() {
		const header = this.props.tests.length ? "Test Results" : "";
		return (
			<div className="TestResultsContainer">
				<div className="container">
					<h2>{header}</h2>
					{this.props.tests.map(test => (
						<TestResult
							test={test}
							key={test.testId}
							resultOptions={this.props.resultOptions}
						/>
					))}
				</div>
			</div>
		);
	}
}

TestResults.propTypes = {
	tests: PropTypes.array.isRequired,
	resultOptions: PropTypes.array.isRequired
};

export default TestResults;
