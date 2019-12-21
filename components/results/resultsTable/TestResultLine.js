import React from "react";
import { calcUOMPrecision } from "../../../public/static/js/mathUtils";
import { getActiveResultOptions } from "../../../public/static/js/filterUtils";
import PropTypes from "prop-types";

/**
 * Renders individual result table line (row)
 *
 * @class TestResultLine
 * @extends {React.Component}
 */
class TestResultLine extends React.Component {
	/**
	 * React lifecucle method
	 *
	 * @returns {object}
	 * @memberof TestResultLine
	 */
	render() {
		const activeResultOptions = getActiveResultOptions(this.props.resultOptions);
		return (
			<tr className="table-active">
				<th scope="row">
					{this.props.mobDesk} Run {this.props.idx + 1}{" "}
					{this.props.beforeAfterLabel ? `(${this.props.beforeAfterLabel})` : ``}
				</th>
				{activeResultOptions.map((resultOption, idx) => (
					<td key={idx} style={{ textAlign: "right" }}>
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
	resultOptions: PropTypes.array.isRequired,
	mobDesk: PropTypes.string.isRequired,
	beforeAfterLabel: PropTypes.string
};

export default TestResultLine;
