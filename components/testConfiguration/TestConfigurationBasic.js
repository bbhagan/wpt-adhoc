import React from "react";
import "./TestConfigurationBasic.scss";
import PropTypes from "prop-types";

class TestConfigurationBasic extends React.Component {
	handleChangeNumberOfTests = e => {
		this.props.updateNumberOfTests(Number(e.target.value));
	};

	handleLocationChange = idx => e => {
		const tempLocations = this.props.testLocations.map(
			(location, locationIdx) => {
				if (idx !== locationIdx) return location;
				const tempLoc = location;
				tempLoc.active = e.target.checked ? true : false;
				return tempLoc;
			}
		);
		this.props.updateLocations(tempLocations);
	};

	render() {
		const showBlock = { display: this.props.shown ? "block" : "none" };
		return (
			<div className="TestConfigurationBasicContainer" style={showBlock}>
				<div className="form-group">
					<label>
						Grouping
						<select
							className="form-control form-control-sm"
							id="test-configuration-grouping"
						>
							<option value="mobVsDesk">None (Just run the tests)</option>
							<option value="mobVsDesk">Mobile Vs. Desktop</option>
							<option value="mobVsDesk">Competative Analysis</option>
							<option value="mobVsDesk">Before &amp; After</option>
						</select>
					</label>
				</div>

				<div className="form-group">
					<label>
						Mobile/desktop
						{this.props.testLocations.map((location, idx) => (
							<div key={idx}>
								<input
									key={idx}
									type="checkbox"
									value={location.location}
									onChange={this.handleLocationChange(idx)}
									checked={location.active === true ? "checked" : ""}
								/>
								&nbsp;{location.label} ({location.location})
							</div>
						))}
					</label>
				</div>

				<div className="form-group">
					<label>
						Number of tests
						<input
							type="text"
							value={this.props.numberOfTests}
							size="2"
							onChange={this.handleChangeNumberOfTests}
						/>
					</label>
				</div>
			</div>
		);
	}
}

TestConfigurationBasic.propTypes = {
	testLocations: PropTypes.array.isRequired,
	updateLocations: PropTypes.func.isRequired,
	numberOfTests: PropTypes.number.isRequired,
	updateNumberOfTests: PropTypes.func.isRequired
};

export default TestConfigurationBasic;
