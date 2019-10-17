import PropTypes from "prop-types";
import TestConfigurationTabs from "./TestConfigurationTabs";
import TestConfigurationBasic from "./TestConfigurationBasic";
import TestConfigurationResults from "./TestConfigurationResults";
import "./TestConfigurationModal.scss";

class TestConfigurationModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: "basic"
		};
	}

	updateTab = (e, tabName) => {
		this.setState({ selectedTab: tabName });
	};

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

export default TestConfigurationModal;
