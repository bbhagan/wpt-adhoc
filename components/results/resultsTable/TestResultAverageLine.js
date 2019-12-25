import React from "react";
import PropTypes from "prop-types";
import { calcUOMPrecision } from "../../../public/static/js/mathUtils.js";
import { getActiveResultOptions } from "../../../public/static/js/filterUtils.js";

/**
 * Renders the result table average line (row)
 *
 * @class TestResultAverageLine
 * @extends {React.Component}
 */
class TestResultAverageLine extends React.Component {
	/**
	 * React lifecycle method.
	 *
	 * @returns {object}
	 * @memberof TestResultAverageLine
	 */
	render() {
		const activeResultOptions = getActiveResultOptions(this.props.resultOptions);
		return (
			<tr className="table-light">
				<th scope="row">
					<strong>
						{this.props.mobDesk} Avg. {this.props.beforeAfterLabel ? `(${this.props.beforeAfterLabel})` : ``}
					</strong>
				</th>
				{activeResultOptions.map((resultOption, idx) => (
					<td key={idx} style={{ textAlign: "right" }}>
						<strong key={idx}>
							{calcUOMPrecision(
								this.props.data[resultOption.wptField],
								resultOption.uom,
								resultOption.decimalPlacePrecision
							)}
						</strong>
					</td>
				))}
			</tr>
		);
	}
}

TestResultAverageLine.propTypes = {
	data: PropTypes.object.isRequired,
	resultOptions: PropTypes.array.isRequired,
	mobDesk: PropTypes.string.isRequired,
	beforeAfterLabel: PropTypes.string
};

export default TestResultAverageLine;
