import React from "react";
import PropTypes from "prop-types";

class testConfigurationResultOption extends React.Component {
	handleResultOptionChange = e => {
		this.props.updateResultOption(e.target.checked, e.target.value);
	};

	render() {
		return (
			<div className="col-3">
				<input
					type="checkbox"
					value={this.props.resultOption.wptField}
					onChange={this.handleResultOptionChange}
					checked={this.props.resultOption.active === true ? "checked" : ""}
				/>
				&nbsp;{this.props.resultOption.name}
			</div>
		);
	}
}

testConfigurationResultOption.propTypes = {
	resultOption: PropTypes.object.isRequired,
	updateResultOption: PropTypes.func.isRequired,
	synthetic: PropTypes.bool
};

export default testConfigurationResultOption;
