import React from "react";
import { calcUOMPrecision } from "../../public/static/js/mathUtils";
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
		return (
			<tr className="table-active">
				<th scope="row">Run {this.props.idx + 1}</th>
				{this.props.resultOptions.map((resultOption, idx) => (
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
	resultOptions: PropTypes.array.isRequired
};

export default TestResultLine;
