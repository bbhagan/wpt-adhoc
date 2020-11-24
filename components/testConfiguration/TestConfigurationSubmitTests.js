import React from "react";
import PropTypes from "prop-types";

/**
 * Renders test submit button
 *
 * @class TestConfigurationSubmitTests
 * @extends {React.Component}
 */
class TestConfigurationSubmitTests extends React.Component {
  /**
   * Handles click on the submit tests button. Calls React props function
   * @props {object} e -- Event on the input
   * @memberof TestConfigurationSubmitTests
   */
  handleSubmitTests = (e) => {
    e.preventDefault();
    this.props.submitTests();
  };

  handleResetTests = (e) => {
    this.props.resetTests();
  };

  /**
   * React lifecycle method
   *
   * @returns {object}
   * @memberof TestConfigurationSubmitTests
   */
  render() {
    return (
      <div className="TestConfigurationSubmitTestsContainer">
        <button
          onClick={this.handleSubmitTests}
          className="btn btn-success btn-lg btn-block"
        >
          Start Test(s)
        </button>
        <button
          onClick={this.handleResetTests}
          className="btn btn-warning btn-block"
        >
          Reset Test(s)
        </button>
      </div>
    );
  }
}

TestConfigurationSubmitTests.propTypes = {
  submitTests: PropTypes.func.isRequired,
  resetTests: PropTypes.func.isRequired,
};

export default TestConfigurationSubmitTests;
