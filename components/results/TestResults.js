import React from "react";
import TestResultNoGrouping from "./TestResultNoGrouping";
import PropTypes from "prop-types";

/**
 * Renders the outer test results (not the individual tests)
 *
 * @class TestResults
 * @extends {React.Component}
 */
class TestResults extends React.Component {
	/**
	 * React lifecycle method
	 *
	 * @returns {object}
	 * @memberof TestResults
	 */
	render() {
		const header = this.props.tests.length ? "Test Results" : "";
		let result;
		if (this.props.grouping === "none") {
			result = this.props.tests.map((test, idx) => (
				<TestResultNoGrouping
					test={test}
					key={idx}
					resultOptions={this.props.resultOptions}
				/>
			));
		}
		return (
			<div className="TestResultsContainer">
				<div className="wptah-section clearfix">
					<h2>{header}</h2>
					{result}
				</div>
			</div>
		);
	}
}

TestResults.propTypes = {
	tests: PropTypes.array.isRequired,
	resultOptions: PropTypes.array.isRequired,
	grouping: PropTypes.string.isRequired
};

export default TestResults;
