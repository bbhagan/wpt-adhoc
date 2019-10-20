import React from "react";
import TestResultTableHeader from "./TestResultTableHeader";
import TestResultsLine from "./TestResultLine";
import TestResultAverageLine from "./TestResultAverageLine";
import TestResultHeaderDescription from "./TestResultHeaderDescription";
import PropTypes from "prop-types";

/**
 * Renders the individual test result
 *
 * @class TestResult
 * @extends {React.Component}
 */
class TestResult extends React.Component {
	/**
	 * Render function for custom output
	 *
	 * @memberof TestResults
	 * @return {object}
	 */
	renderResultsTable = () => {
		return (
			<div className="TestResultsContainer">
				<TestResultHeaderDescription test={this.props.test} />
				<table className="table table-hover">
					<TestResultTableHeader resultOptions={this.props.resultOptions} />
					<tbody>
						{this.props.test.data.runs.map((run, idx) => (
							<TestResultsLine
								idx={idx}
								run={run}
								resultOptions={this.props.resultOptions}
							/>
						))}

						<TestResultAverageLine
							data={this.props.test.data.average.firstView}
							resultOptions={this.props.resultOptions}
						/>
					</tbody>
				</table>
			</div>
		);
	};

	/**
	 * React lifecycle method
	 *
	 * @returns {object}
	 * @memberof TestResults
	 */
	render() {
		return (
			<div className="TestResultContainer">{this.renderResultsTable()}</div>
		);
	}
}

TestResult.propTypes = {
	test: PropTypes.object.isRequired,
	resultOptions: PropTypes.array.isRequired
};

export default TestResult;
