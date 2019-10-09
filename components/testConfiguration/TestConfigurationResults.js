import React from "react";
import PropTypes from "prop-types";
import TestConfigurationResultOption from "./TestConfigurationResultOption";

class TestConfigurationResults extends React.Component {
	handleResultOptionChange = (checked, wptField) => {
		const tempResultOptions = this.props.testResultOptions.map(resultOption => {
			if (resultOption.wptField !== wptField) return resultOption;
			const tempresultOption = resultOption;
			tempresultOption.active = checked;
			return tempresultOption;
		});
		this.props.updateTestResultOptions(tempResultOptions);
	};

	render() {
		const showBlock = { display: this.props.shown ? "block" : "none" };
		return (
			<div className="TestConfigurationResultsContainer" style={showBlock}>
				<div className="row">
					<div className="col">Common Tests:</div>
				</div>
				<div className="row">
					{this.props.testResultOptions.map((resultOption, idx) => {
						if (resultOption.type === "common") {
							return (
								<TestConfigurationResultOption
									resultOption={resultOption}
									updateResultOption={this.handleResultOptionChange}
									key={idx}
								/>
							);
						} else {
							return "";
						}
					})}
				</div>
				<div className="row">
					<div className="col">Uncommon Tests:</div>
				</div>
				<div className="row">
					{this.props.testResultOptions.map((resultOption, idx) => {
						if (resultOption.type === "uncommon") {
							return (
								<TestConfigurationResultOption
									resultOption={resultOption}
									updateResultOption={this.handleResultOptionChange}
									key={idx}
								/>
							);
						} else {
							return "";
						}
					})}
				</div>
				<div className="row">
					<div className="col">Synthetic Tests:</div>
				</div>
				<div className="row">
					{this.props.testResultOptions.map((resultOption, idx) => {
						if (resultOption.type === "synthetic") {
							return (
								<TestConfigurationResultOption
									resultOption={resultOption}
									updateResultOption={this.handleResultOptionChange}
									key={idx}
								/>
							);
						} else {
							return "";
						}
					})}
				</div>
			</div>
		);
	}
}

TestConfigurationResults.propTypes = {
	testResultOptions: PropTypes.array.isRequired,
	updateTestResultOptions: PropTypes.func.isRequired
};

export default TestConfigurationResults;
