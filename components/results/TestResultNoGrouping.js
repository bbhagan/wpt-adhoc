import React from "react";
import TestResultTableHeader from "./TestResultTableHeader";
import TestResultsLine from "./TestResultLine";
import TestResultAverageLine from "./TestResultAverageLine";
import TestResultHeaderDescription from "./TestResultHeaderDescription";
import PropTypes from "prop-types";

/**
 * Renders the individual test result without any grouping (Grouping: none in test config)
 *
 * @class TestResultNoGrouping
 * @extends {React.Component}
 */
class TestResultNoGrouping extends React.Component {
	/**
	 * Render function for custom output
	 *
	 * @memberof TestResult
	 * @return {object}
	 */
	renderResultsTable = () => {
		return (
			<div className="TestResultNoGroupingContainer">
				<TestResultHeaderDescription test={this.props.test} />
				<table className="table table-hover">
					<TestResultTableHeader resultOptions={this.props.resultOptions} />
					<tbody>
						{this.props.test.data.runs.map((run, idx) => (
							<TestResultsLine
								key={idx}
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
	 * @memberof TestResultNoGrouping
	 */
	render() {
		return (
			<div className="TestResultContainer">{this.renderResultsTable()}</div>
		);
	}
}

TestResultNoGrouping.propTypes = {
	test: PropTypes.object.isRequired,
	resultOptions: PropTypes.array.isRequired
};

export default TestResultNoGrouping;
