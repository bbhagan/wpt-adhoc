import React from "react";
import TestResultNoGrouping from "./TestResultNoGrouping";
import TestResultMobileVsDesktop from "./TestResultMobileVsDesktop";
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
		let result = [];
		if (this.props.grouping === "none") {
			result = this.props.tests.map((test, idx) => (
				<TestResultNoGrouping
					test={test}
					key={idx}
					resultOptions={this.props.resultOptions}
				/>
			));
		} else if (this.props.grouping === "mobVsDesk") {
			/*
			const sortedTests = this.props.tests.sort((a, b) => {
				console.log(
					`a.url: ${a.url} b.url: ${b.url} a.url > b.url: ${a.url > b.url}`
				);
				if (a.url > b.url) return -1;
				if (a.url < b.url) return 1;
				return 0;
			});
			result = this.props.tests.map((test, idx) => (
				<TestResultNoGrouping
					test={test}
					key={idx}
					resultOptions={this.props.resultOptions}
				/>
			));
			*/
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
