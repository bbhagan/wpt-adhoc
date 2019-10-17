import React from "react";
import "./TestConfigurationResults.scss";
import PropTypes from "prop-types";

class TestConfigurationResults extends React.Component {
	handleResultOptionChange = e => {
		const tempResultOptions = this.props.testResultOptions.map(resultOption => {
			if (resultOption.wptField !== e.target.value) return resultOption;
			const tempresultOption = resultOption;
			tempresultOption.active = e.target.checked;
			return tempresultOption;
		});
		this.props.updateTestResultOptions(tempResultOptions);
	};

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

/*
<fieldset class="form-group">
                    <legend>Checkboxes</legend>
                    <div class="form-check">
                      <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" value="" checked="">
                        Option one is this and that—be sure to include why it's great
                      </label>
                    </div>
                    <div class="form-check disabled">
                      <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" value="" disabled="">
                        Option two is disabled
                      </label>
                    </div>
						</fieldset>
						*/

TestConfigurationResults.propTypes = {
	testResultOptions: PropTypes.array.isRequired,
	updateTestResultOptions: PropTypes.func.isRequired
};

export default TestConfigurationResults;
