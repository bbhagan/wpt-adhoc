import React from "react";
import PropTypes from "prop-types";
import { calcUOMPrecision } from "../../public/static/js/mathUtils";

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
		return (
			<tr className="table-light">
				<th scope="row">
					<strong>Avg.</strong>
				</th>
				{this.props.resultOptions.map((resultOption, idx) => (
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
	resultOptions: PropTypes.array.isRequired
};

export default TestResultAverageLine;
