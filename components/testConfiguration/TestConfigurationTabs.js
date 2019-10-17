import PropTypes from "prop-types";

class TestConfigurationTabs extends React.Component {
	render() {
		return (
			<div className="TestConfigurationTabsContainer">
				<ul className="nav nav-tabs" style={{ marginTop: "1rem" }}>
					<li className="nav-item">
						<a
							className={
								this.props.selectedTab === "basic"
									? "nav-link active"
									: "nav-link"
							}
							onClick={() => this.props.updateTab("basic")}
							data-toggle="tab"
							href="#"
						>
							Basic
						</a>
					</li>
					<li className="nav-item">
						<a
							className={
								this.props.selectedTab === "results"
									? "nav-link active"
									: "nav-link"
							}
							onClick={() => this.props.updateTab("results")}
							data-toggle="tab"
							href="#"
						>
							Results
						</a>
					</li>
				</ul>
			</div>
		);
	}
}

TestConfigurationTabs.propTypes = {
	selectedTab: PropTypes.string.isRequired,
	updateTab: PropTypes.func.isRequired
};

export default TestConfigurationTabs;
