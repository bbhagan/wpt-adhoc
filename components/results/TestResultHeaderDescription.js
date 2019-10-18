import PropTypes from "prop-types";
const WPTSERVER = process.env.WPTSERVE;

class TestResultHeaderDescription extends React.Component {
	render() {
		return (
			<div className="TestResultHeaderDescription">
				<p>
					Test Id:
					<a
						href={WPTSERVER + "/result/" + this.props.test.testId}
						target="_blank"
						rel="noopener noreferrer"
					>
						{this.props.test.testId}
					</a>
					, Test URL:
					<a
						href={this.props.test.url}
						target="_blank"
						rel="noopener noreferrer"
					>
						{this.props.test.url}
					</a>
					, Location: {this.props.test.location}
					{this.props.test.elapsedSeconds
						? ", Elapsed Time: " + this.props.test.elapsedSeconds + " seconds"
						: ""}
					{this.props.behindCount
						? ", Behind Count: " + this.props.behindCount
						: ""}
				</p>
			</div>
		);
	}
}

TestResultHeaderDescription.propTypes = {
	test: PropTypes.object.isRequired
};

export default TestResultHeaderDescription;
