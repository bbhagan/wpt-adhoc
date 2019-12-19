import React from "react";
import Link from "next/link";
import StandardLayout from "../layouts/StandardLayout";
import { getAllPreviousTests } from "../public/static/js/localStorageInterface";
import { getReadableDateFromMoment } from "../public/static/js/dateUtil";
import { getUniqueURLsString } from "../public/static/js/filterUtils";

class PreviousTests extends React.Component {
	/**
	 * Determine if a set of tests was run against Desktop, Mobile or both
	 *
	 * @param {array} testArray -- Allthe tests that were run in a test group
	 *
	 * @returns {string}
	 */
	getMobDeskFlag = testArray => {
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

	/**
	 * Produces the row dom for all of the tests
	 *
	 * @returns {array}
	 */
	getTests = () => {
		let prevTests = getAllPreviousTests();
		if (prevTests && prevTests.length) {
			prevTests = prevTests.reverse();
			return prevTests.map((test, idx) => {
				return (
					<tr key={idx}>
						<td>
							<Link href={`/?previousTestId=${test.id}`}>
								<a className="text-primary">{getReadableDateFromMoment(test.date)}</a>
							</Link>
						</td>
						<td>{getUniqueURLsString(test.testConfig.tests)}</td>
						<td>{test.testConfig.grouping}</td>
						<td>{this.getMobDeskFlag(test.testConfig.tests)}</td>
					</tr>
				);
			});
		} else {
			return "";
		}
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
									</tr>
								</thead>
								<tbody>{this.getTests()}</tbody>
							</table>
						</div>
					</div>
				</div>
			</StandardLayout>
		);
	}
}

export default PreviousTests;
