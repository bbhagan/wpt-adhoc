import PropTypes from "prop-types";

class TestConfigurationTabs extends React.Component {
	render() {
		return (
			<div className="TestConfigurationTabsContainer">
				<ul className="nav nav-tabs" style={{ margin: "1rem 0" }}>
					<li className="nav-item">
						<a
							className={
								this.props.selectedTab === "basic"
									? "nav-link active"
									: "nav-link"
							}
							onClick={e => this.props.updateTab(e, "basic")}
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
							onClick={e => this.props.updateTab(e, "results")}
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
