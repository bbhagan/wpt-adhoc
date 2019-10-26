import React from "react";
import { calcUOMPrecision } from "../../public/static/js/mathUtils";
import PropTypes from "prop-types";

class TestResultDifferenceLine extends React.Component {
	determineWinner = (test1, test2, test1MobDesk, test2MobDesk) => {
		let winner = test1 > test2 ? test2MobDesk : test1MobDesk;
		let returnText = winner;
		if (winner === test1MobDesk) {
			returnText += ` (${Math.round(100 - (test1 / test2) * 100)}%)`;
		} else {
			returnText += ` (${Math.round(100 - (test2 / test1) * 100)}%)`;
		}
		return returnText;
	};

	render() {
		return (
			<>
				<tr className="table-info">
					<th scope="row">Difference</th>
					{this.props.resultOptions.map((resultOption, idx) => (
						<td key={idx} style={{ textAlign: "right" }}>
							{calcUOMPrecision(
								this.props.test1Data[resultOption.wptField] -
									this.props.test2Data[resultOption.wptField],
								resultOption.uom,
								resultOption.decimalPlacePrecision
							)}
						</td>
					))}
				</tr>
				<tr className="table-danger">
					<th scope="row">Winner</th>
					{this.props.resultOptions.map((resultOption, idx) => (
						<td key={idx} style={{ textAlign: "right" }}>
							{this.determineWinner(
								this.props.test1Data[resultOption.wptField],
								this.props.test2Data[resultOption.wptField],
								this.props.test1MobDesk,
								this.props.test2MobDesk
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
	test1MobDesk: PropTypes.string.isRequired,
	test2Data: PropTypes.object.isRequired,
	test2MobDesk: PropTypes.string.isRequired,
	resultOptions: PropTypes.array.isRequired
};

export default TestResultDifferenceLine;
