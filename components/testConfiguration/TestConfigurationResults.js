import React from "react";
import "./TestConfigurationResults.scss";
import PropTypes from "prop-types";

/**
 * Renders the checkboxes to configure all of the result columns in the test(s)
 *
 * @class TestConfigurationResults
 * @extends {React.Component}
 */
class TestConfigurationResults extends React.Component {
	/**
	 * Handle checking/un-checking of result option boxes. Calls React props function.
	 *
	 * @memberof TestConfigurationResults
	 */
	handleResultOptionChange = e => {
		const tempResultOptions = this.props.testResultOptions.map(resultOption => {
			if (resultOption.wptField !== e.target.value) return resultOption;
			const tempresultOption = resultOption;
			tempresultOption.active = e.target.checked;
			return tempresultOption;
		});
		this.props.updateTestResultOptions(tempResultOptions);
	};

	/**
	 * React lifecycle method
	 *
	 * @returns object
	 * @memberof TestConfigurationResults
	 */
	render() {
		const showBlock = { display: this.props.shown ? "block" : "none" };
		return (
			<div className="TestConfigurationResultsContainer" style={showBlock}>
				<fieldset className="form-group">
					<legend>Common Tests:</legend>
					<div className="row">
						{this.props.testResultOptions.map((resultOption, idx) => {
							if (resultOption.type === "common") {
								return (
									<div className="col-3" key={idx}>
										<div className="form-check">
											<label className="form-check-label">
												<input
													type="checkbox"
													value={resultOption.wptField}
													onChange={this.handleResultOptionChange}
													checked={
														resultOption.active === true ? "checked" : ""
													}
													className="form-check-input"
													key={idx}
												/>
												&nbsp;{resultOption.name}
											</label>
										</div>
									</div>
								);
							} else {
								return "";
							}
						})}
					</div>
				</fieldset>

				<fieldset className="form-group">
					<legend>Uncommon Tests:</legend>
					<div className="row">
						{this.props.testResultOptions.map((resultOption, idx) => {
							if (resultOption.type === "uncommon") {
								return (
									<div className="col-3" key={idx}>
										<div className="form-check">
											<label className="form-check-label">
												<input
													type="checkbox"
													value={resultOption.wptField}
													onChange={this.handleResultOptionChange}
													checked={
														resultOption.active === true ? "checked" : ""
													}
													className="form-check-input"
													key={idx}
												/>
												&nbsp;{resultOption.name}
											</label>
										</div>
									</div>
								);
							} else {
								return "";
							}
						})}
					</div>
				</fieldset>

				<fieldset className="form-group">
					<legend>Synthetic Tests:</legend>

					<div className="row">
						{this.props.testResultOptions.map((resultOption, idx) => {
							if (resultOption.type === "synthetic") {
								return (
									<div className="col-3" key={idx}>
										<div className="form-check">
											<label className="form-check-label">
												<input
													type="checkbox"
													value={resultOption.wptField}
													onChange={this.handleResultOptionChange}
													checked={
														resultOption.active === true ? "checked" : ""
													}
													className="form-check-input"
													key={idx}
												/>
												&nbsp;{resultOption.name}
											</label>
										</div>
									</div>
								);
							} else {
								return "";
							}
						})}
					</div>
				</fieldset>
			</div>
		);
	}
}

TestConfigurationResults.propTypes = {
	testResultOptions: PropTypes.array.isRequired,
	updateTestResultOptions: PropTypes.func.isRequired
};

export default TestConfigurationResults;
