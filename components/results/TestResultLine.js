import React from "react";
import { calcUOMPrecision } from "../../public/static/js/MathUtils";
import PropTypes from "prop-types";

class TestResultLine extends React.Component {
	render() {
		return (
			<tr>
				<td style={{ border: "1px solid black" }}>Run {this.props.idx + 1}</td>
				{this.props.resultOptions.map((resultOption, idx) => (
					<td
						key={idx}
						style={{ border: "1px solid black", textAlign: "right" }}
					>
						{calcUOMPrecision(
							this.props.run.firstView[resultOption.wptField],
							resultOption.uom,
							resultOption.decimalPlacePrecision
						)}
					</td>
				))}
			</tr>
		);
	}
}

TestResultLine.propTypes = {
	idx: PropTypes.number.isRequired,
	run: PropTypes.object.isRequired,
	resultOptions: PropTypes.array.isRequired
};

export default TestResultLine;
