import React from "react";
import PropTypes from "prop-types";

/**
 * Renders button to add more URLs to main test billboard
 *
 * @class TestConfigurationAddMoreURLs
 * @extends {React.Component}
 */
class TestConfigurationAddMoreURLs extends React.Component {
	handleAddMoreURLs = e => {
		e.preventDefault();
		this.props.addMoreURLs();
	};
	/**
	 * React lifecycle method
	 *
	 * @returns {object}
	 * @memberof TestConfigurationAddMoreURLs
	 */
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
