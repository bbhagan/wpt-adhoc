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
	 * Sorts the tests based on URL, dependent on the "Sorting" test configuration
	 *
	 * @param tests {array} -- The test array to sort
	 * @param sorting {string} -- The sorting methodology
	 * @returns {array}
	 * @memberof TestResults
	 */
	sortTests = (tests, sorting) => {
		return tests.sort((a, b) => {
			switch (sorting) {
				case "none":
					return 0;
				case "alpha":
					if (a.url > b.url) return 1;
					if (a.url < b.url) return -1;
					return 0;
				case "reverseAlpha":
					if (a.url > b.url) return -1;
					if (a.url < b.url) return 1;
					return 0;
				default:
					return 0;
			}
		});
	};

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
			result = this.sortTests(this.props.tests, this.props.sorting).map(
				(test, idx) => (
					<TestResultNoGrouping
						test={test}
						key={idx}
						resultOptions={this.props.resultOptions}
					/>
				)
			);
		} else if (this.props.grouping === "mobVsDesk") {
			const sortedTests = this.sortTests(this.props.tests, this.props.sorting);
			//using for loop here for look ahead/behind
			for (var i = 0; i < sortedTests.length; i++) {
				let pairAhead = false;
				let pairBehind = false;

				//Does this test not have a pair? Look forward and back (safely)
				if (i !== 0 && sortedTests[i].url === sortedTests[i - 1].url) {
					pairBehind = true;
				}

				if (
					i !== sortedTests.length - 1 &&
					sortedTests[i].url === sortedTests[i + 1].url
				) {
					pairAhead = true;
				}
				if (!pairAhead && !pairBehind) {
					result.push(
						<TestResultNoGrouping
							test={sortedTests[i]}
							key={i}
							resultOptions={this.props.resultOptions}
						/>
					);
				}
				if (pairAhead) {
					result.push(
						<TestResultMobileVsDesktop
							test1={sortedTests[i]}
							test2={sortedTests[i + 1]}
							resultOptions={this.props.resultOptions}
							key={i}
						/>
					);
				}
			}
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
	grouping: PropTypes.string.isRequired,
	sorting: PropTypes.string.isRequired
};

export default TestResults;
