import React from "react";
import TestConfigurationURLs from "./TestConfigurationURLs";
import TestConfigurationSubmitTests from "./TestConfigurationSubmitTests";
import TestConfigurationModal from "./TestConfigurationModal";

import TestConfigurationAddMoreURLs from "./TestConfigurationAddMoreURLs";

import Error from "../global/Error";

import PropTypes from "prop-types";
import "./testConfiguration.scss";

/**
 * Component to provide the UI to configure a set of tests
 *
 * @class TestConfiguration
 * @extends {React.Component}
 */
class TestConfiguration extends React.Component {
  /**
   * Creates an instance of TestConfiguration.
   * @param {object} props
   * @memberof TestConfiguration
   */
  constructor(props) {
    super(props);
    this.state = {
      advancedConfigOpen: false,
      showTestLocationFetchError: true,
    };
  }

  /**
   * Receives call from component to submit test. Sets React state. Calls React props function.
   *
   * @memberof TestConfiguration
   */
  submitTests = () => {
    this.setState({ advancedConfigOpen: false });
    this.props.submitTests();
  };

  resetTests = () => {
    this.setState({ advancedConfigOpen: false });
    this.props.resetTests();
  };

  /**
   * Handles call to open/close advanced config modal. Sets React state.
   *
   * @memberof TestConfiguration
   */
  handleToggleAdvancedConfig = () => {
    this.setState({ advancedConfigOpen: !this.state.advancedConfigOpen });
  };

  /**
   * Handles user closing of error dialog. Sets React state.
   *
   * @memberof TestConfiguration
   */
  closeError = () => {
    this.setState({ showTestLocationFetchError: false });
  };

  /**
   * React lifecycle method.
   *
   * @returns {object}
   * @memberof TestConfiguration
   */
  render() {
    let error;
    if (
      this.props.testLocationFetchError &&
      this.state.showTestLocationFetchError
    ) {
      error = (
        <Error closeError={this.closeError}>
          <strong>An error occured fetching WebPageTest locations:</strong>{" "}
          {this.props.testLocationFetchError}
        </Error>
      );
    }

    return (
      <div className="TestConfigurationContainer">
        <div className="wptah-section clearfix">
          <div className="row">
            <div className="col-lg-12">
              <div className="jumbotron">
                <fieldset>
                  {error}
                  <h2>URL(s)</h2>
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: 4 }}>
                      <TestConfigurationURLs
                        urls={this.props.urls}
                        handleUpdateURLs={this.props.handleUpdateURLs}
                      />
                      <TestConfigurationAddMoreURLs
                        handleAddMoreURLs={this.props.handleAddMoreURLs}
                      />
                    </div>
                    <div style={{ flex: 2 }}>
                      <TestConfigurationSubmitTests
                        submitTests={this.submitTests}
                        resetTests={this.resetTests}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary test-configuration-opener"
                    onClick={this.handleToggleAdvancedConfig}
                  >
                    Test Configuration
                  </button>
                </fieldset>
              </div>
            </div>
          </div>
          <TestConfigurationModal
            grouping={this.props.grouping}
            handleUpdateGrouping={this.props.handleUpdateGrouping}
            sorting={this.props.sorting}
            handleUpdateSorting={this.props.handleUpdateSorting}
            testLocations={this.props.testLocations}
            handleUpdateTestLocations={this.props.handleUpdateTestLocations}
            numberOfRuns={this.props.numberOfRuns}
            handleUpdateNumberOfRuns={this.props.handleUpdateNumberOfRuns}
            resultOptions={this.props.resultOptions}
            handleUpdateResultOptions={this.props.handleUpdateResultOptions}
            openClose={this.state.advancedConfigOpen}
            handleClose={this.handleToggleAdvancedConfig}
          />
        </div>
      </div>
    );
  }
}

TestConfiguration.propTypes = {
  urls: PropTypes.array.isRequired,
  handleAddMoreURLs: PropTypes.func.isRequired,
  handleUpdateURLs: PropTypes.func.isRequired,
  grouping: PropTypes.string.isRequired,
  handleUpdateGrouping: PropTypes.func.isRequired,
  sorting: PropTypes.string.isRequired,
  handleUpdateSorting: PropTypes.func.isRequired,
  numberOfRuns: PropTypes.number.isRequired,
  handleUpdateNumberOfRuns: PropTypes.func.isRequired,
  resultOptions: PropTypes.array.isRequired,
  handleUpdateResultOptions: PropTypes.func.isRequired,
  submitTests: PropTypes.func.isRequired,
  resetTests: PropTypes.func.isRequired,
  testLocationFetchError: PropTypes.string,
  testLocations: PropTypes.array,
  handleUpdateTestLocations: PropTypes.func.isRequired,
};

export default TestConfiguration;
