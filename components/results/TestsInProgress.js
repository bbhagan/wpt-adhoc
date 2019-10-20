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
	 * @return {object}
	 * @memberof TestsInProgress
	 */
	renderDoneInProgressToggle = () => {
		if (this.props.tests.length === 0 && this.props.totalNumberOfTests > 0) {
			return (
				<React.Fragment>
					- Done!{" "}
					<span
						style={{
							backgroundColor: "#5cb85c",
							borderRadius: "50%",
							padding: "0 .3rem",
							fontSize: "1.6rem"
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
		if (this.props.totalNumberOfTests > 0) {
			return (
				<div className="TestsInProgressContainer">
					<div className="wptah-section clearfix">
						<h2>Test(s) in Progress {this.renderDoneInProgressToggle()}</h2>
						<TestResultsProgressBar
							numberOfTestsInProgress={this.props.tests.length}
							totalNumberOfTests={this.props.totalNumberOfTests}
						/>
						{this.props.tests.map((test, idx) => (
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
	tests: PropTypes.array.isRequired,
	totalNumberOfTests: PropTypes.number.isRequired
};

export default TestsInProgress;
