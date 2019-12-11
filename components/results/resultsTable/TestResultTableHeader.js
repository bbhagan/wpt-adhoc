import React from "react";
import PropTypes from "prop-types";
import { getActiveResultOptions } from "../../../public/static/js/filterUtils";

/**
 * Renders the table header (column description) (row) for each test
 *
 * @class TestResultTableHeader
 * @extends {React.Component}
 */
class TestResultTableHeader extends React.Component {
	/**
	 * Custom render of description header
	 *
	 * @return {object}
	 * @memberof TestResultTableHeader
	 */
	renderCopy = resultOption => {
		let copy = resultOption.name;
		if (resultOption.uom) copy += " (" + resultOption.uom + ")";
		return copy;
	};

	/**
	 * React lifecycle method.
	 *
	 * @returns {object}
	 * @memberof TestResultTableHeader
	 */
	render() {
		const activeResultOptions = getActiveResultOptions(this.props.resultOptions);
		return (
			<thead>
				<tr>
					<th scope="col"></th>
					{activeResultOptions.map((resultOption, idx) => (
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
