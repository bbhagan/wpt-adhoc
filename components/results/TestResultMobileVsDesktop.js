import React from "react";
import TestResultTableHeader from "./resultsTable/TestResultTableHeader";
import TestResultsLine from "./resultsTable/TestResultLine";
import TestResultAverageLine from "./resultsTable/TestResultAverageLine";
import TestResultHeaderDescription from "./TestResultHeaderDescription";
import TestResultDifferenceLine from "./resultsTable/TestResultDifferenceLine";
import PropTypes from "prop-types";

class TestResultMobileVsDesktop extends React.Component {
	render() {
		let test1MobDesk =
			this.props.test1.location.indexOf("mobile") > -1 ? "Mob" : "Desk";
		let test2MobDesk =
			this.props.test2.location.indexOf("mobile") > -1 ? "Mob" : "Desk";
		return (
			<div className="TestResultMobileVsDesktopContainer">
				<TestResultHeaderDescription test={this.props.test1} />
				<TestResultHeaderDescription test={this.props.test2} />
				<table className="table table-hover">
					<TestResultTableHeader resultOptions={this.props.resultOptions} />
					<tbody>
						{this.props.test1.data.runs.map((run, idx) => (
							<TestResultsLine
								key={idx}
								idx={idx}
								run={run}
								resultOptions={this.props.resultOptions}
								mobDesk={test1MobDesk}
							/>
						))}
						<TestResultAverageLine
							data={this.props.test1.data.average.firstView}
							resultOptions={this.props.resultOptions}
							mobDesk={test1MobDesk}
						/>
						{this.props.test2.data.runs.map((run, idx) => (
							<TestResultsLine
								key={idx}
								idx={idx}
								run={run}
								resultOptions={this.props.resultOptions}
								mobDesk={test2MobDesk}
							/>
						))}
						<TestResultAverageLine
							data={this.props.test2.data.average.firstView}
							resultOptions={this.props.resultOptions}
							mobDesk={test2MobDesk}
						/>
						<TestResultDifferenceLine
							test1Data={this.props.test1.data.average.firstView}
							test1MobDesk={test1MobDesk}
							test2Data={this.props.test2.data.average.firstView}
							test2MobDesk={test2MobDesk}
							resultOptions={this.props.resultOptions}
						/>
					</tbody>
				</table>
			</div>
		);
	}
}

TestResultMobileVsDesktop.propTypes = {
	test1: PropTypes.object.isRequired,
	test2: PropTypes.object.isRequired,
	resultOptions: PropTypes.array.isRequired
};

export default TestResultMobileVsDesktop;
