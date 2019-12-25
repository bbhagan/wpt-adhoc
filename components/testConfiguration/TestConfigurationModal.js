import React from "react";
import PropTypes from "prop-types";
import TestConfigurationTabs from "./TestConfigurationTabs.js";
import TestConfigurationBasic from "./TestConfigurationBasic.js";
import TestConfigurationResults from "./TestConfigurationResults.js";
import "./TestConfigurationModal.scss";

/**
 * Renders the test configuration modal.
 *
 * @class TestConfigurationModal
 * @extends {React.Component}
 */
class TestConfigurationModal extends React.Component {
	/**
	 *Creates an instance of TestConfigurationModal.
	 * @param {*} props
	 * @memberof TestConfigurationModal
	 */
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: "basic"
		};
	}

	/**
	 * Handle clicking of tabs. Sets React state.
	 *
	 * @memberof TestConfigurationModal
	 */
	updateTab = (e, tabName) => {
		this.setState({ selectedTab: tabName });
	};

	/**
	 * React lifecycle method.
	 *
	 * @returns {object}
	 * @memberof TestConfigurationModal
	 */
	render() {
		return (
			<div className="TestConfigurationModalContainer">
				<div className="modal" style={this.props.openClose ? { display: "block" } : { display: "none" }}>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Test Configuration</h5>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close"
									onClick={this.props.handleClose}
								>
									<span aria-hidden="true">×</span>
								</button>
							</div>
							<div className="modal-body">
								<TestConfigurationTabs selectedTab={this.state.selectedTab} updateTab={this.updateTab} />

								<TestConfigurationBasic
									grouping={this.props.grouping}
									handleUpdateGrouping={this.props.handleUpdateGrouping}
									sorting={this.props.sorting}
									handleUpdateSorting={this.props.handleUpdateSorting}
									testLocations={this.props.testLocations}
									handleUpdateTestLocations={this.props.handleUpdateTestLocations}
									numberOfRuns={this.props.numberOfRuns}
									handleUpdateNumberOfRuns={this.props.handleUpdateNumberOfRuns}
									shown={this.state.selectedTab === "basic"}
								/>

								<TestConfigurationResults
									resultOptions={this.props.resultOptions}
									handleUpdateResultOptions={this.props.handleUpdateResultOptions}
									shown={this.state.selectedTab === "results"}
								/>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary" onClick={this.props.handleClose}>
									Done
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

TestConfigurationModal.propTypes = {
	grouping: PropTypes.string.isRequired,
	handleUpdateGrouping: PropTypes.func.isRequired,
	sorting: PropTypes.string.isRequired,
	handleUpdateSorting: PropTypes.func.isRequired,
	testLocations: PropTypes.array,
	handleUpdateTestLocations: PropTypes.func.isRequired,
	numberOfRuns: PropTypes.number.isRequired,
	handleUpdateNumberOfRuns: PropTypes.func.isRequired,
	resultOptions: PropTypes.array.isRequired,
	handleUpdateResultOptions: PropTypes.func.isRequired,
	openClose: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired
};

export default TestConfigurationModal;
