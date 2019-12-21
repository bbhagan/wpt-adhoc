import React from "react";
import { calcUOMPrecision } from "../../../public/static/js/mathUtils";
import { determineWinner } from "../../../public/static/js/mathUtils";
import { getActiveResultOptions } from "../../../public/static/js/filterUtils";
import PropTypes from "prop-types";

/**
 * Renders test result difference & winner row
 *
 * @class TestResultDifferenceLine
 * @extends {React.Component}
 */
class TestResultDifferenceLine extends React.Component {
	/**
	 * React lifecycle method.
	 *
	 * @returns {object}
	 */
	render() {
		const activeResultOptions = getActiveResultOptions(this.props.resultOptions);
		return (
			<>
				<tr className="table-info">
					<th scope="row">Difference</th>
					{activeResultOptions.map((resultOption, idx) => (
						<td key={idx} style={{ textAlign: "right" }}>
							{calcUOMPrecision(
								this.props.test1Data[resultOption.wptField] - this.props.test2Data[resultOption.wptField],
								resultOption.uom,
								resultOption.decimalPlacePrecision
							)}
						</td>
					))}
				</tr>
				<tr className="table-danger">
					<th scope="row">Winner</th>
					{activeResultOptions.map((resultOption, idx) => (
						<td key={idx} style={{ textAlign: "right" }}>
							{determineWinner(
								this.props.test1Data[resultOption.wptField],
								this.props.test2Data[resultOption.wptField],
								this.props.test1Label,
								this.props.test2Label
							)}
						</td>
					))}
				</tr>
			</>
		);
	}
}

TestResultDifferenceLine.propTypes = {
	test1Data: PropTypes.object.isRequired,
	test1Label: PropTypes.string.isRequired,
	test2Data: PropTypes.object.isRequired,
	test2Label: PropTypes.string.isRequired,
	resultOptions: PropTypes.array.isRequired
};

export default TestResultDifferenceLine;
