import React from "react";
import {
  calcUOMPrecision,
  calcPercentFromRank1,
  calcDiffFromRank1,
} from "../../public/static/js/mathUtils";
import { sortTestsByField } from "../../public/static/js/sortTests";
import PropTypes from "prop-types";

/**
 * Renders the individual set of comptetative analysis tests
 *
 * @class TestResultCompetativeAnalysis
 * @extends {React.Component}
 */
class TestResultCompetativeAnalysis extends React.Component {
  /**
   * Creates an instance of TestResultCompetativeAnalysis.
   * @param {object} props
   * @memberof TestResultCompetativeAnalysis
   */
  constructor(props) {
    super(props);
    this.rank1Value = undefined;
  }

  /**
   * Updates the rank1Value with the best (lowest) value
   *
   * @memberof TestResultCompetativeAnalysis
   */
  setRank1Value = (value) => {
    if (!this.rank1Value || value < this.rank1Value) this.rank1Value = value;
  };

  /**
   * Calculates ratio of test to best test and returns a class state for the table
   *
   * @param {number} fieldValue -- The field number to test against
   * @returns {string}
   *
   * @memberof TestResultCompetativeAnalysis
   */
  getRowClass = (fieldValue) => {
    const percent = calcPercentFromRank1(fieldValue, this.rank1Value);

    if (percent === 0) return "table-active";
    if (percent < 10) return "table-success";
    if (percent < 25) return "table-warning";
    if (percent < 40) return "table-primary";
    return "table-danger";
  };

  /**
   * React lifecycle method
   *
   * @returns {object}
   * @memberof TestResultCompetativeAnalysis
   */
  render() {
    const tests = sortTestsByField(
      this.props.tests,
      this.props.resultOption.wptField
    );

    return (
      <div
        className="TestResultCompetativeAnalysisContainer"
        style={{ marginBottom: "50px" }}
      >
        <p>
          {this.props.tests[0].location.indexOf("mobile") > -1
            ? "Mobile"
            : "Desktop"}{" "}
          {this.props.resultOption.wptField}, {tests[0].data.runs.length} Tests,
          Using Average
        </p>

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">URL</th>
              <th scope="col">
                {this.props.resultOption.wptField} (
                {this.props.resultOption.uom})
              </th>
              <th scope="col">
                Difference from Lead ({this.props.resultOption.uom})
              </th>
              <th scope="col">Percentage from Lead</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, idx) => {
              const dataValue =
                test.data.average.firstView[this.props.resultOption.wptField];
              this.setRank1Value(dataValue);
              return (
                <tr
                  key={idx}
                  className={this.getRowClass(dataValue, this.rank1Value)}
                >
                  <td>{idx + 1}</td>
                  <td>{test.url}</td>
                  <td>
                    {calcUOMPrecision(
                      dataValue,
                      this.props.resultOption.uom,
                      this.props.resultOption.decimalPlacePrecision
                    )}
                  </td>
                  <td>
                    {calcDiffFromRank1(
                      dataValue,
                      this.rank1Value,
                      this.props.resultOption.uom,
                      this.props.resultOption.decimalPlacePrecision
                    ) === 0
                      ? "N/A"
                      : calcDiffFromRank1(
                          dataValue,
                          this.rank1Value,
                          this.props.resultOption.uom,
                          this.props.resultOption.decimalPlacePrecision
                        )}
                  </td>
                  <td>
                    {calcPercentFromRank1(dataValue, this.rank1Value) === 0
                      ? "N/A"
                      : calcPercentFromRank1(dataValue, this.rank1Value) + "%"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

TestResultCompetativeAnalysis.propTypes = {
  tests: PropTypes.array.isRequired,
  resultOption: PropTypes.object.isRequired,
};

export default TestResultCompetativeAnalysis;
