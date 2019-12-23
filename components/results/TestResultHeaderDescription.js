import PropTypes from "prop-types";
const WPTSERVER = process.env.WPTSERVER;

/**
 * Renders the in progress or result test description (test id, url, elapsed time, etc.)
 *
 * @class TestResultHeaderDescription
 * @extends {React.Component}
 */
class TestResultHeaderDescription extends React.Component {
	renderTestId = test => {
		return (
			<a href={WPTSERVER + "/result/" + test.testId} target="_blank" rel="noopener noreferrer">
				{test.testId}
			</a>
		);
	};

	renderTestURL = test => {
		return (
			<a href={test.url} target="_blank" rel="noopener noreferrer">
				{test.url}
			</a>
		);
	};

	renderElapsedSeconds = test => {
		return test.elapsedSeconds ? ", Elapsed Time: " + this.props.test.elapsedSeconds + " seconds" : "";
	};

	renderBehindCount = test => {
		return test.behindCount ? ", Behind Count: " + this.props.behindCount : "";
	};

	renderHeaderBlock = (test, testLabel) => {
		if (test && test.testId && test.url) {
			return (
				<p>
					Test Id{testLabel}: {this.renderTestId(test)}, Test URL: {this.renderTestURL(test)}, Location:{" "}
					{this.props.test.location} {this.renderElapsedSeconds(test)} {this.renderBehindCount(test)}
				</p>
			);
		} else {
			return "";
		}
	};

	/**
	 * React lifecycle method.
	 *
	 * @returns {object}
	 * @memberof TestResultHeaderDescription
	 */
	render() {
		return (
			<div className="TestResultHeaderDescriptionContainer">
				{this.renderHeaderBlock(
					this.props.test,
					this.props.afterTest && this.props.afterTest.testId && this.props.afterTest.url ? " (Before)" : ""
				)}
				{this.renderHeaderBlock(this.props.afterTest, " (After)")}
			</div>
		);
	}
}

TestResultHeaderDescription.propTypes = {
	test: PropTypes.object.isRequired,
	afterTest: PropTypes.object
};

export default TestResultHeaderDescription;
