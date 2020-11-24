import React from "react";
import Link from "next/link";
import StandardLayout from "../layouts/StandardLayout";
import {
  getAllPreviousTests,
  deletePreviousTest,
} from "../public/static/js/localStorageInterface";
import { getReadableDateFromMoment } from "../public/static/js/dateUtil";
import { getUniqueURLs } from "../public/static/js/filterUtils";

class PreviousTests extends React.Component {
  constructor(props) {
    super(props);
    this.state = { previousTests: [] };
  }

  componentWillMount() {
    this.getTests();
  }
  /**
   * Determine if a set of tests was run against Desktop, Mobile or both
   *
   * @param {array} testArray -- Allthe tests that were run in a test group
   *
   * @returns {string}
   */
  getMobDeskFlag = (testArray) => {
    let foundMob = false;
    let foundDesk = false;
    let returnString = "";
    testArray.forEach((test, idx) => {
      if (test.location.indexOf("mobile") === -1) {
        foundDesk = true;
      } else {
        foundMob = true;
      }
    });
    if (foundMob && !foundDesk) {
      returnString = "Mobile";
    } else if (foundDesk && !foundMob) {
      returnString = "Desktop";
    } else {
      returnString = "Both";
    }
    return returnString;
  };

  handleDeletePreviousTest = (testId) => (e) => {
    const filteredTests = deletePreviousTest(testId);
    this.setState({ previousTests: filteredTests.reverse() });
  };

  renderURLBlock = (tests) => {
    return getUniqueURLs(tests).map((URL) => {
      return (
        <span>
          {URL}
          <br />
        </span>
      );
    });
  };

  /**
   * Produces the row dom for all of the tests
   *
   * @returns {array}
   */
  getTests = () => {
    let prevTests = getAllPreviousTests();
    if (prevTests && prevTests.length) {
      prevTests = prevTests.reverse();
      this.setState({ previousTests: prevTests });
    }
  };

  renderPreviousTests = () => {
    return this.state.previousTests.map((test, idx) => {
      const validAfterTest =
        test.testConfig.afterTests && test.testConfig.afterTests.length;
      return (
        <tr key={idx}>
          <td>
            <Link href={`/?previousTestId=${test.id}`}>
              <a className="text-primary">
                {getReadableDateFromMoment(test.date)}
              </a>
            </Link>
          </td>
          <td>{this.renderURLBlock(test.testConfig.tests)}</td>
          <td>{`${test.testConfig.grouping} ${
            validAfterTest ? "(Before & After)" : ""
          }`}</td>
          <td>{this.getMobDeskFlag(test.testConfig.tests)}</td>
          <td>{test.testConfig.numberOfRuns}</td>
          <td>
            <button
              className="btn btn-primary btn-sm"
              onClick={this.handleDeletePreviousTest(test.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <StandardLayout>
        <div className="PreviousTestsContainer">
          <div className="container">
            <div className="wptah-section clearfix">
              <h2>Previous Tests</h2>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Test Date/Time</th>
                    <th scope="col">URL(s)</th>
                    <th scope="col">Test Grouping</th>
                    <th scope="col">Mob/Desk</th>
                    <th scope="col">Runs Per Test</th>
                    <th scope="col">Delete Test</th>
                  </tr>
                </thead>
                <tbody>{this.renderPreviousTests()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </StandardLayout>
    );
  }
}

export default PreviousTests;
