import React from "react";
import "./TestConfigurationBasic.scss";
import PropTypes from "prop-types";

/**
 * "Basic" tab content in test configuration modal.
 *
 * @class TestConfigurationBasic
 * @extends {React.Component}
 */
class TestConfigurationBasic extends React.Component {
  /**
   * Handles updates to number of tests. Calls React props function.
   * @param {event} -- The field change event
   * @memberof TestConfigurationBasic
   */
  handleChangeNumberOfRuns = (e) => {
    this.props.handleUpdateNumberOfRuns(Number(e.target.value));
  };

  /**
   * Handles change (checkbox) of location options. Calls React props function.
   *
   * @memberof TestConfigurationBasic
   */
  handleTestLocationChange = (idx) => (e) => {
    const tempLocations = this.props.testLocations.map(
      (location, locationIdx) => {
        if (idx !== locationIdx) return location;
        const tempLoc = location;
        tempLoc.active = e.target.checked;
        return tempLoc;
      }
    );
    this.props.handleUpdateTestLocations(tempLocations);
  };

  /**
   * Handles the change of the sorting select
   *
   * @param {object} e -- The change event object
   * @memberof TestConfigurationBasic
   */
  handleSortingChange = (e) => {
    this.props.handleUpdateSorting(e.target.value);
  };

  /**
   * Handles change of the grouping select
   *
   * @param {object} e -- The click event object
   * @memberof TestConfigurationBasic
   */
  handleGroupingChange = (e) => {
    this.props.handleUpdateGrouping(e.target.value);
  };

  /**
   * React lifecycle method
   *
   * @returns {object}
   * @memberof TestConfigurationBasic
   */
  render() {
    const showBlock = { display: this.props.shown ? "block" : "none" };
    return (
      <div className="TestConfigurationBasicContainer" style={showBlock}>
        <div className="form-group">
          <label>
            Grouping
            <select
              className="form-control form-control-sm"
              id="test-configuration-grouping"
              onChange={this.handleGroupingChange}
              value={this.props.grouping}
            >
              <option value="none">None (Just run the tests)</option>
              <option value="mobVsDesk">Mobile Vs. Desktop</option>
              <option value="competative">Competative Analysis</option>
              <option value="beforeAndAfter">Before &amp; After</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label>
            Sorting
            <select
              className="form-control form-control-sm"
              id="test-configuration-sorting"
              onChange={this.handleSortingChange}
              value={this.props.sorting}
            >
              <option value="none">None</option>
              <option value="alpha">Alphabetical by URL</option>
              <option value="reverseAlpha">Reverse Alphabetical by URL</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label>
            Mobile/desktop
            {this.props.testLocations.map((location, idx) => (
              <div key={idx}>
                <input
                  key={idx}
                  type="checkbox"
                  value={location.location}
                  onChange={this.handleTestLocationChange(idx)}
                  checked={location.active === true ? "checked" : ""}
                />
                &nbsp;{location.label} ({location.location})
              </div>
            ))}
          </label>
        </div>

        <div className="form-group">
          <label>
            Number of runs per test{" "}
            <input
              type="text"
              value={this.props.numberOfRuns}
              size="2"
              onChange={this.handleChangeNumberOfRuns}
            />
          </label>
        </div>
      </div>
    );
  }
}

TestConfigurationBasic.propTypes = {
  grouping: PropTypes.string.isRequired,
  handleUpdateGrouping: PropTypes.func.isRequired,
  sorting: PropTypes.string.isRequired,
  handleUpdateSorting: PropTypes.func.isRequired,
  testLocations: PropTypes.array,
  handleUpdateTestLocations: PropTypes.func.isRequired,
  numberOfRuns: PropTypes.number.isRequired,
  handleUpdateNumberOfRuns: PropTypes.func.isRequired,
};

export default TestConfigurationBasic;
