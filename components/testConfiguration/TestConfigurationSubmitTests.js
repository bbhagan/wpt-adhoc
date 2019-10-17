import React from "react";
import PropTypes from "prop-types";

class TestConfigurationSubmitTests extends React.Component {
	handleSubmitTests = e => {
		e.preventDefault();
		this.props.submitTests();
	};

	render() {
		return (
			<div className="TestConfigurationSubmitTestsContainer">
				<button
					onClick={this.handleSubmitTests}
					className="btn btn-success btn-lg btn-block"
				>
					Start Test(s)
				</button>
			</div>
		);
	}
}

TestConfigurationSubmitTests.propTypes = {
	submitTests: PropTypes.func.isRequired
};

export default TestConfigurationSubmitTests;
