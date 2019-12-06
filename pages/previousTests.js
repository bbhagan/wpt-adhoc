import React from "react";
import Link from "next/link";
import StandardLayout from "../layouts/StandardLayout";
import { getAllPreviousTests } from "../public/static/js/localStorageInterface";
import { getReadableDateFromMoment } from "../public/static/js/dateUtil";

class PreviousTests extends React.Component {
	getUniqueURLs = testArray => {
		let returnString = "";
		testArray.forEach((test, idx) => {
			if (idx === 0) {
				returnString = test.url;
			} else {
				if (test.url !== testArray[idx - 1].url) {
					returnString += `, ${test.url}`;
				}
			}
		});
		return returnString;
	};

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

	getTests = () => {
		const prevTests = getAllPreviousTests().reverse();
		return prevTests.map((test, idx) => {
			return (
				<tr>
					<td>
						<Link href={`/?previousTestId=${encodeURI(test.date)}`}>
							<a className="text-primary">{getReadableDateFromMoment(test.date)}</a>
						</Link>
					</td>
					<td>{this.getUniqueURLs(test.testConfig.tests)}</td>
					<td>{test.testConfig.grouping}</td>
					<td>{this.getMobDeskFlag(test.testConfig.tests)}</td>
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
