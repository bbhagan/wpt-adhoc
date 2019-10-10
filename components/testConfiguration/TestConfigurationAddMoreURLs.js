import React from "react";
import PropTypes from "prop-types";

class TestConfigurationAddMoreURLs extends React.Component {
	handleAddMoreURLs = e => {
		e.preventDefault();
		this.props.addMoreURLs();
	};

	render() {
		return (
			<div className="TestConfigurationAddMoreURLsContainer">
				<button className="btn btn-info" onClick={this.handleAddMoreURLs}>
					+ Add more URLs
				</button>
			</div>
		);
	}
}

TestConfigurationAddMoreURLs.propTypes = {
	addMoreURLs: PropTypes.func.isRequired
};

export default TestConfigurationAddMoreURLs;
