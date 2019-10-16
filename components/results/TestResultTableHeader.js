import React from "react";
import PropTypes from "prop-types";

class TestResultTableHeader extends React.Component {
	renderCopy = resultOption => {
		let copy = resultOption.name;
		if (resultOption.uom) copy += " (" + resultOption.uom + ")";
		return copy;
	};
	render() {
		return (
			<thead>
				<tr>
					<th scope="col"></th>
					{this.props.resultOptions.map((resultOption, idx) => (
						<th key={idx} scope="col">
							{this.renderCopy(resultOption)}
						</th>
					))}
				</tr>
			</thead>
		);
	}
}

TestResultTableHeader.propTypes = {
	resultOptions: PropTypes.array.isRequired
};

export default TestResultTableHeader;
