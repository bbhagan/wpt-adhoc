import React from "react";
import PropTypes from "prop-types";

/**
 * Provides the main URL input text fields
 *
 * @class TestConfigurationURLs
 * @extends {React.Component}
 */
class TestConfigurationURLs extends React.Component {
	/**
	 * Creates an instance of TestConfigurationURLs.
	 * @param {*} props
	 * @memberof TestConfigurationURLs
	 */
	constructor(props) {
		super(props);
		this.urlRefs = this.props.urls.reduce((acc, value, idx) => {
			acc[idx] = React.createRef();
			return acc;
		}, {});
	}

	/**
	 * React lifecycle method
	 *
	 * @memberof TestConfigurationURLs
	 */
	componentDidMount = () => {
		this.urlRefs[0].current.focus();
	};

	/**
	 * Handles the changing of URL. Modifies React props function
	 * @param {number} idx -- Index of URL field
	 * @memberof TestConfigurationURLs
	 */
	handleUrlChange = idx => e => {
		const tempUrls = this.props.urls.map((url, urlIdx) => {
			if (idx !== urlIdx) return url;
			return e.target.value;
		});
		this.props.handleUpdateURLs(tempUrls);
	};

	/**
	 * Handles when user moves out of URL field (adds https). Modifies React props function
	 *
	 * @memberof TestConfigurationURLs
	 */
	handleUrlBlur = idx => e => {
		const tempUrls = this.props.urls.map((url, urlIdx) => {
			if (idx !== urlIdx) return url;
			if (e.target.value.indexOf("http") === -1 && e.target.value !== "") {
				return "https://" + e.target.value;
			} else {
				return e.target.value;
			}
		});
		this.props.handleUpdateURLs(tempUrls);
	};

	/**
	 * React lifecycle method
	 *
	 * @returns {object}
	 * @memberof TestConfigurationURLs
	 */
	render() {
		return (
			<div className="TestConfigurationURLsContainer">
				{this.props.urls.map((url, idx) => (
					<div key={idx} className="form-group">
						<input
							key={idx}
							type="text"
							size="83"
							value={url}
							onChange={this.handleUrlChange(idx)}
							onBlur={this.handleUrlBlur(idx)}
							ref={this.urlRefs[idx]}
						/>
					</div>
				))}
			</div>
		);
	}
}

TestConfigurationURLs.propTypes = {
	urls: PropTypes.array.isRequired,
	handleUpdateURLs: PropTypes.func.isRequired
};

export default TestConfigurationURLs;
