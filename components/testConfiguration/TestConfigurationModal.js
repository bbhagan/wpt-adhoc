import React from "react";
import PropTypes from "prop-types";
import TestConfigurationTabs from "./TestConfigurationTabs";
import TestConfigurationBasic from "./TestConfigurationBasic";
import TestConfigurationResults from "./TestConfigurationResults";
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
				<div
					className="modal"
					style={
						this.props.openClose ? { display: "block" } : { display: "none" }
					}
				>
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
								<TestConfigurationTabs
									selectedTab={this.state.selectedTab}
									updateTab={this.updateTab}
								/>

								<TestConfigurationBasic
									grouping={this.props.grouping}
									updateGrouping={this.props.updateGrouping}
									sorting={this.props.sorting}
									updateSorting={this.props.updateSorting}
									testLocations={this.props.testLocations}
									updateLocations={this.props.updateLocations}
									numberOfTests={this.props.numberOfTests}
									updateNumberOfTests={this.props.updateNumberOfTests}
									shown={this.state.selectedTab === "basic"}
								/>

								<TestConfigurationResults
									testResultOptions={this.props.testResultOptions}
									updateTestResultOptions={this.props.updateTestResultOptions}
									shown={this.state.selectedTab === "results"}
								/>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-primary"
									onClick={this.props.handleClose}
								>
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
	updateGrouping: PropTypes.func.isRequired,
	sorting: PropTypes.string.isRequired,
	updateSorting: PropTypes.func.isRequired,
	testLocations: PropTypes.array.isRequired,
	updateLocations: PropTypes.func.isRequired,
	numberOfTests: PropTypes.number.isRequired,
	updateNumberOfTests: PropTypes.func.isRequired,
	testResultOptions: PropTypes.array.isRequired,
	updateTestResultOptions: PropTypes.func.isRequired,
	openClose: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired
};

export default TestConfigurationModal;
