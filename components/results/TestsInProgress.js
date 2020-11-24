import React from "react";
import TestResultHeaderDescription from "./TestResultHeaderDescription";
import TestResultsProgressBar from "./TestResultsProgressBar";
import PropTypes from "prop-types";

/**
 * Renders outside block of tests in progress
 *
 * @class TestsInProgress
 * @extends {React.Component}
 */
class TestsInProgress extends React.Component {
	/**
	 * Custom render of "done" in header
	 *
	 * @param {array} testsInProgress -- Tests in progress
	 * @param {number} totalNumberOfTests -- Total number of tests being run
	 *
	 * @return {object}
	 * @memberof TestsInProgress
	 */
	renderDoneInProgressToggle = (testsInProgress, totalNumberOfTests) => {
		if (testsInProgress.length === 0 && totalNumberOfTests > 0) {
			return (
				<React.Fragment>
					- Done!{" "}
					<span
						style={{
							backgroundColor: "#5cb85c",
							borderRadius: "50%",
							padding: "0 .3rem",
							fontSize: "1.6rem",
						}}
					>
						&#x2713;
					</span>
				</React.Fragment>
			);
		} else {
			return;
		}
	};

	/**
	 * React lifecycle method
	 *
	 * @returns {object}
	 * @memberof TestsInProgress
	 */
	render() {
		const mergedTests = [...this.props.testsInProgress, ...this.props.afterTestsInProgress];
		const mergedTotalNumberOfTests = this.props.totalNumberOfTests + this.props.totalNumberOfAfterTests;

		if (mergedTotalNumberOfTests > 0) {
			return (
				<div className="TestsInProgressContainer">
					<div className="wptah-section clearfix">
						<h2>Test(s) in Progress {this.renderDoneInProgressToggle(mergedTests, mergedTotalNumberOfTests)}</h2>
						<TestResultsProgressBar
							numberOfTestsInProgress={mergedTests.length}
							totalNumberOfTests={mergedTotalNumberOfTests}
						/>
						{mergedTests.map((test, idx) => (
							<TestResultHeaderDescription key={idx} test={test} />
						))}
					</div>
				</div>
			);
		} else {
			return <></>;
		}
	}
}

TestsInProgress.propTypes = {
	testsInProgress: PropTypes.array.isRequired,
	afterTestsInProgress: PropTypes.array,
	totalNumberOfTests: PropTypes.number.isRequired,
	totalNumberOfAfterTests: PropTypes.number,
};

export default TestsInProgress;
