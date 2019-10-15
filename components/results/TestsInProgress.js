import TestResultHeaderDescription from "./TestResultHeaderDescription";
import PropTypes from "prop-types";

class TestsInProgress extends React.Component {
	render() {
		const header = this.props.tests.length ? "Test(s) in Progress" : "";
		return (
			<div className="TestsInProgressContainer">
				<h2>{header}</h2>
				<ul>
					{this.props.tests.map((test, idx) => (
						<TestResultHeaderDescription key={idx} test={test} />
					))}
				</ul>
			</div>
		);
	}
}

TestsInProgress.propTypes = {
	tests: PropTypes.array.isRequired
};

export default TestsInProgress;
