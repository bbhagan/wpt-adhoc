import PropTypes from "prop-types";

/**
 * Renders the test results progress bar
 *
 * @class TestResultsProgressBar
 * @extends {React.Component}
 */
class TestResultsProgressBar extends React.Component {
	/**
	 * Calculates percentage of tests complete
	 *
	 * @return {string}
	 * @memberof TestResultsProgressBar
	 */
	calculateProgressPercentage = () => {
		return (
			((this.props.totalNumberOfTests -
				this.props.numberOfTestsInProgress +
				1) /
				(this.props.totalNumberOfTests + 1)) *
				100 +
			"%"
		);
	};

	/**
	 * Custom render of progress bar
	 * @return {object}
	 * @memberof TestResultsProgressBar
	 */
	renderProgressBar = () => {
		if (this.props.totalNumberOfTests > 0) {
			if (this.props.numberOfTestsInProgress > 0) {
				return (
					<div className="progress">
						<div
							className="progress-bar progress-bar-striped progress-bar-animated"
							role="progressbar"
							aria-valuenow="75"
							aria-valuemin="0"
							aria-valuemax="100"
							style={{ width: this.calculateProgressPercentage() }}
						></div>
					</div>
				);
			} else {
				return (
					<div className="progress">
						<div
							className="progress-bar"
							role="progressbar"
							style={{ width: "100%" }}
							aria-valuenow="25"
							aria-valuemin="0"
							aria-valuemax="100"
						></div>
					</div>
				);
			}
		} else {
			return;
		}
	};

	/**
	 * React lifecycle method
	 *
	 * @returns
	 * @memberof TestResultsProgressBar
	 */
	render() {
		return (
			<div className="TestResultsProgressBarContainer">
				{this.renderProgressBar()}
			</div>
		);
	}
}

TestResultsProgressBar.propTypes = {
	numberOfTestsInProgress: PropTypes.number.isRequired,
	totalNumberOfTests: PropTypes.number.isRequired
};

export default TestResultsProgressBar;
