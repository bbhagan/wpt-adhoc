import React from "react";
import TestResultTableHeader from "./TestResultTableHeader";
import TestResultsLine from "./TestResultLine";
import TestResultAverageLine from "./TestResultAverageLine";
import TestResultHeaderDescription from "./TestResultHeaderDescription";
import PropTypes from "prop-types";

class TestResults extends React.Component {
	renderResultsTable = () => {
		return (
			<div className="TestResultsContainer">
				<TestResultHeaderDescription test={this.props.test} />
				<table style={{ margin: "0 0 40px 0" }}>
					<tbody>
						<TestResultTableHeader resultOptions={this.props.resultOptions} />
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

	render() {
		return (
			<div className="TestResultContainer">{this.renderResultsTable()}</div>
		);
	}
}

TestResults.propTypes = {
	test: PropTypes.object.isRequired,
	resultOptions: PropTypes.array.isRequired
};

export default TestResults;
