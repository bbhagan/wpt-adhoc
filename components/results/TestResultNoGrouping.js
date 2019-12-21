import React from "react";
import TestResultTableHeader from "./resultsTable/TestResultTableHeader";
import TestResultsLine from "./resultsTable/TestResultLine";
import TestResultAverageLine from "./resultsTable/TestResultAverageLine";
import TestResultHeaderDescription from "./TestResultHeaderDescription";
import TestResultDifferenceLine from "./resultsTable/TestResultDifferenceLine";
import PropTypes from "prop-types";

/**
 * Renders the individual test result without any grouping (Grouping: none in test config)
 *
 * @class TestResultNoGrouping
 * @extends {React.Component}
 */
class TestResultNoGrouping extends React.Component {
	/**
	 * Renders individual data table lines
	 *
	 * @param {object} test -- Test object
	 *
	 * @return {object}
	 */
	renderResultsLines = (test, beforeAfter) => {
		let domResults = [];

		domResults = test.data.runs.map((run, idx) => (
			<TestResultsLine
				key={idx}
				idx={idx}
				run={run}
				resultOptions={this.props.resultOptions}
				mobDesk={test.location.indexOf("mobile") > -1 ? "Mob" : "Desk"}
				beforeAfterLabel={beforeAfter}
			/>
		));

		return domResults;
	};

	/**
	 * Renders average table line
	 *
	 * @param {object} test -- Test object
	 *
	 * @return {string}
	 */
	renderAverageLine = (test, beforeAfter) => {
		return (
			<TestResultAverageLine
				data={test.data.average.firstView}
				resultOptions={this.props.resultOptions}
				mobDesk={test.location.indexOf("mobile") > -1 ? "Mob" : "Desk"}
				beforeAfterLabel={beforeAfter}
			/>
		);
	};

	/**
	 * React lifecycle method
	 *
	 * @returns {object}
	 * @memberof TestResultNoGrouping
	 */
	render() {
		const validAfterTest = this.props.afterTest && this.props.afterTest.location && this.props.afterTest.data;
		return (
			<div className="TestResultNoGroupingContainer">
				<TestResultHeaderDescription test={this.props.test} />
				<table className="table table-hover">
					<TestResultTableHeader resultOptions={this.props.resultOptions} />
					<tbody>
						{this.renderResultsLines(this.props.test, validAfterTest ? "Before" : "")}
						{this.renderAverageLine(this.props.test, validAfterTest ? "Before" : "")}
						{validAfterTest ? this.renderResultsLines(this.props.afterTest, "After") : ""}
						{validAfterTest ? this.renderAverageLine(this.props.afterTest, "After") : ""}
						{validAfterTest ? (
							<TestResultDifferenceLine
								test1Data={this.props.test.data.average.firstView}
								test1Label="Before"
								test2Data={this.props.afterTest.data.average.firstView}
								test2Label="After"
								resultOptions={this.props.resultOptions}
							/>
						) : (
							""
						)}
					</tbody>
				</table>
			</div>
		);
	}
}

TestResultNoGrouping.propTypes = {
	test: PropTypes.object.isRequired,
	afterTest: PropTypes.object,
	resultOptions: PropTypes.array.isRequired
};

export default TestResultNoGrouping;
