import TestResultHeaderDescription from "./TestResultHeaderDescription";
import PropTypes from "prop-types";

class TestsInProgress extends React.Component {
	render() {
		return (
			<div className="TestsInProgressContainer">
				<div className="wptah-section clearfix">
					<h2>Test(s) in Progress</h2>

					{this.props.tests.map((test, idx) => (
						<TestResultHeaderDescription key={idx} test={test} />
					))}
				</div>
			</div>
		);
	}
}

TestsInProgress.propTypes = {
	tests: PropTypes.array.isRequired
};

export default TestsInProgress;
