import React from "react";
import PropTypes from "prop-types";
import { calcUOMPrecision } from "../../public/static/js/MathUtils";

class TestResultAverageLine extends React.Component {
	render() {
		return (
			<tr>
				<td style={{ border: "1px solid black" }}>
					<strong>Avg.</strong>
				</td>
				{this.props.resultOptions.map((resultOption, idx) => (
					<td
						key={idx}
						style={{ border: "1px solid black", textAlign: "right" }}
					>
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
