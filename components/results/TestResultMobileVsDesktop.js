import PropTypes from "prop-types";

class TestResultMobileVsDesktop extends React.Component {
	render() {
		return (
			<div className="TestResultMobileVsDesktopContainer">
				<p>deskTest: {this.props.deskTest.url}</p>
				<p>deskTest: {this.props.deskTest.location}</p>
				<p>mobTest: {this.props.mobTest.url}</p>
				<p>mobTest: {this.props.mobTest.location}</p>
			</div>
		);
	}
}

TestResultMobileVsDesktop.propTypes = {
	deskTest: PropTypes.object,
	mobTest: PropTypes.object,
	key: PropTypes.number,
	resultOptions: PropTypes.array.isRequired
};

export default TestResultMobileVsDesktop;
