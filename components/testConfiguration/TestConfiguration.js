import TestConfigurationURLs from "./TestConfigurationURLs";
import TestConfigurationGrouping from "./TestConfigurationGrouping";
import TestConfigurationTabs from "./TestConfigurationTabs";
import TestConfigurationSubmitTests from "./TestConfigurationSubmitTests";
import TestConfigurationBasic from "./TestConfigurationBasic";
import TestConfigurationAddMoreURLs from "./TestConfigurationAddMoreURLs";
import TestConfigurationResults from "./TestConfigurationResults";
import Error from "../global/Error";
import { resultsOptions } from "../../data/resultsOptionsData";
import PropTypes from "prop-types";
import "./testConfiguration.scss";

/**
 * Component to provide the UI to configure a set of tests
 *
 * @class TestConfiguration
 * @extends {React.Component}
 */
class TestConfiguration extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			urls: [
				{ url: "", index: 0 },
				{ url: "", index: 1 },
				{ url: "", index: 2 }
			],
			testLocations: [],
			testLocationFetchError: "",
			numberOfTests: 2,
			testResultOptions: resultsOptions,
			advancedConfigOpen: false,
			selectedTab: "basic"
		};
	}

	submitTests = () => {
		this.setState({ advancedConfigOpen: false });
		this.props.submitTests(this.state);
	};

	addMoreURLs = () => {
		const urls = [
			...this.state.urls,
			{ url: "", index: this.state.urls.length },
			{ url: "", index: this.state.urls.length + 1 },
			{ url: "", index: this.state.urls.length + 2 }
		];
		this.setState({ urls });
	};

	handleToggleAdvancedConfig = () => {
		this.setState({ advancedConfigOpen: !this.state.advancedConfigOpen });
	};

	updateURLs = urls => {
		this.setState({ urls: urls });
	};

	updateLocations = locations => {
		this.setState({ locations: locations });
	};

	updateNumberOfTests = numberOfTests => {
		this.setState({ numberOfTests: numberOfTests });
	};

	updateTab = tabName => {
		this.setState({ selectedTab: tabName });
	};

	updateTestResultOptions = options => {
		this.setState({ testResultOptions: options });
	};

	closeError = () => {
		this.setState({ testLocationFetchError: "" });
	};

	openCloseAdvancedConfig = () => {
		console.log();
		if (this.state.advancedConfigOpen) {
			return {
				height: "430px",
				overflow: "hidden",
				opacity: 1,
				transition: "height .3s"
			};
		} else {
			return {
				height: 0,
				overflow: "hidden",
				opacity: 0,
				transition: "height .3s"
			};
		}
	};

	componentDidMount = () => {
		fetch("/api/getLocations")
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					this.setState({
						testLocationFetchError: "Locations service unavailable"
					});
					throw new Error("Locations service unavailable");
				}
			})
			.then(data => {
				let testLocations = [];
				if (data.statusCode === 200) {
					if (data.locations.desktop.length > 0) {
						testLocations.push({
							location: data.locations.desktop[0].location,
							label: "Desktop",
							active: true
						});
					}
					if (data.locations.mobile.length > 0) {
						testLocations.push({
							location: data.locations.mobile[0].location,
							label: "Mobile",
							active: true
						});
					}
					this.setState({ testLocations: testLocations });
				}
			})
			.catch(e => {
				console.log(e);
			});
	};

	render() {
		let error;
		if (this.state.testLocationFetchError) {
			error = (
				<Error closeError={this.closeError}>
					<strong>An error occured fetching WebPageTest locations:</strong>{" "}
					{this.state.testLocationFetchError}
				</Error>
			);
		}

		return (
			<div className="TestConfigurationContainer">
				<div className="wptah-section clearfix">
					<div className="row">
						<div className="col-lg-12">
							<div className="jumbotron">
								<fieldset>
									{error}
									<h2>URL(s)</h2>
									<div className="row">
										<div className="col-8">
											<TestConfigurationURLs
												urls={this.state.urls}
												updateURLs={this.updateURLs}
											/>
											<TestConfigurationAddMoreURLs
												addMoreURLs={this.addMoreURLs}
											/>
										</div>
										<div className="col-4">
											<TestConfigurationSubmitTests
												submitTests={this.submitTests}
											/>
										</div>
									</div>

									<div
										className="btn-group test-configuration-opener"
										role="group"
										onClick={this.handleToggleAdvancedConfig}
									>
										<button type="button" className="btn btn-primary">
											Test Configuration
										</button>
										<div className="btn-group" role="group">
											<button
												id="btnGroupDrop1"
												type="button"
												className="btn btn-primary dropdown-toggle"
												data-toggle="dropdown"
												aria-haspopup="true"
												aria-expanded="false"
											></button>
										</div>
									</div>

									<div className="row" style={this.openCloseAdvancedConfig()}>
										<div className="col">
											<TestConfigurationTabs
												selectedTab={this.state.selectedTab}
												updateTab={this.updateTab}
											/>
											<TestConfigurationBasic
												testLocations={this.state.testLocations}
												updateLocations={this.updateLocations}
												numberOfTests={this.state.numberOfTests}
												updateNumberOfTests={this.updateNumberOfTests}
												shown={this.state.selectedTab === "basic"}
											/>
											<TestConfigurationResults
												testResultOptions={this.state.testResultOptions}
												updateTestResultOptions={this.updateTestResultOptions}
												shown={this.state.selectedTab === "results"}
											/>
										</div>
									</div>
								</fieldset>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

TestConfiguration.propTypes = {
	submitTests: PropTypes.func.isRequired
};

export default TestConfiguration;
