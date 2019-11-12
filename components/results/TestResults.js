import React from "react";
import TestResultNoGrouping from "./TestResultNoGrouping";
import TestResultMobileVsDesktop from "./TestResultMobileVsDesktop";
import TestResultCompetativeAnalysis from "./TestResultCompetativeAnalysis";
import { sortTestsByURL } from "../../public/static/js/sortTests";
import { sortTestsByLocation } from "../../public/static/js/sortTests";
import PropTypes from "prop-types";

/**
 * Renders the outer test results (not the individual tests)
 *
 * @class TestResults
 * @extends {React.Component}
 */
class TestResults extends React.Component {
	constructor(props) {
		super(props);
		this.state = { csvData: [] };
	}

	downloadCSV = () => {
		const testIds = this.props.tests.map(test => test.testId);

		let postBody = {
			testIds,
			resultOptions: this.props.resultOptions,
			grouping: this.props.grouping,
			sorting: this.props.sorting
		};

		let hiddenForm = document.createElement("form");
		hiddenForm.style = "display:none;";
		hiddenForm.method = "post";
		hiddenForm.action = "/download/downloadCSV";
		let hiddenInput = document.createElement("input");
		hiddenInput.type = "text";
		hiddenInput.name = "testConfig";
		hiddenInput.value = JSON.stringify(postBody);
		hiddenForm.appendChild(hiddenInput);
		document.body.appendChild(hiddenForm);
		hiddenForm.submit();
	};

	/**
	 * React lifecycle method
	 *
	 * @returns {object}
	 * @memberof TestResults
	 */
	render() {
		const header = this.props.tests.length ? "Test Results" : "";
		let downloadCSVButton = [];
		let result = [];

		if (
			this.props.totalNumberOfTests >= 1 &&
			this.props.totalNumberOfTests === this.props.tests.length
		) {
			downloadCSVButton = (
				<button
					key={0}
					type="button"
					className="btn btn-primary"
					onClick={this.downloadCSV}
				>
					Download Results (CSV)
				</button>
			);
		}

		if (this.props.grouping === "none") {
			result = sortTestsByURL(this.props.tests, this.props.sorting).map(
				(test, idx) => (
					<TestResultNoGrouping
						test={test}
						key={idx}
						resultOptions={this.props.resultOptions}
					/>
				)
			);
		} else if (this.props.grouping === "mobVsDesk") {
			const sortedTests = sortTestsByURL(this.props.tests, this.props.sorting);
			//using for loop here for look ahead/behind
			for (var i = 0; i < sortedTests.length; i++) {
				let pairAhead = false;
				let pairBehind = false;

				//Does this test not have a pair? Look forward and back (safely)
				if (i !== 0 && sortedTests[i].url === sortedTests[i - 1].url) {
					pairBehind = true;
				}

				if (
					i !== sortedTests.length - 1 &&
					sortedTests[i].url === sortedTests[i + 1].url
				) {
					pairAhead = true;
				}
				if (!pairAhead && !pairBehind) {
					result.push(
						<TestResultNoGrouping
							test={sortedTests[i]}
							key={i}
							resultOptions={this.props.resultOptions}
						/>
					);
				}
				if (pairAhead) {
					result.push(
						<TestResultMobileVsDesktop
							key={i}
							test1={sortedTests[i]}
							test2={sortedTests[i + 1]}
							resultOptions={this.props.resultOptions}
						/>
					);
				}
			}
		} else if (this.props.grouping === "competative") {
			const locSortTests = sortTestsByLocation(this.props.tests);

			locSortTests.forEach(testSet => {
				if (testSet.length > 0) {
					this.props.resultOptions.map((resultOption, idx) => {
						result.push(
							<TestResultCompetativeAnalysis
								tests={testSet}
								resultOption={resultOption}
								downloadCSVData={this.takeCSVData}
								key={resultOption.wptField + testSet[0].location + idx}
							/>
						);
					});
				}
			});
		}
		return (
			<div className="TestResultsContainer">
				<div className="wptah-section clearfix">
					<h2>{header}</h2> {downloadCSVButton}
					{result}
				</div>
			</div>
		);
	}
}

TestResults.propTypes = {
	tests: PropTypes.array.isRequired,
	resultOptions: PropTypes.array.isRequired,
	grouping: PropTypes.string.isRequired,
	sorting: PropTypes.string.isRequired,
	totalNumberOfTests: PropTypes.number.isRequired
};

export default TestResults;
