import React from "react";

class TestConfigurationGrouping extends React.Component {
	render() {
		return (
			<div className="TestConfigurationGroupingContainer">
				<h5>Grouping</h5>
				<div className="form-group">
					<select className="custom-select">
						<option value="mobVsDesk">None (Just run the tests)</option>
						<option value="mobVsDesk">Mobile Vs. Desktop</option>
						<option value="mobVsDesk">Competative Analysis</option>
						<option value="mobVsDesk">Before &amp; After</option>
					</select>
				</div>
			</div>
		);
	}
}

export default TestConfigurationGrouping;
