import TestConfigurationURLs from "./TestConfigurationURLs";
import TestConfigurationSubmitTests from "./TestConfigurationSubmitTests";
import TestConfigurationModal from "./TestConfigurationModal";

import TestConfigurationAddMoreURLs from "./TestConfigurationAddMoreURLs";

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
			numberOfTests: 2,
			testResultOptions: resultsOptions,
			advancedConfigOpen: false
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

	updateTestResultOptions = options => {
		this.setState({ testResultOptions: options });
	};

	closeError = () => {
		this.setState({ testLocationFetchError: "" });
	};

	componentDidMount = () => {
		console.log(JSON.stringify(this.props));

		if((!this.props.testLocationFetchError) && this.props.testLocations) {
			//
			// move test locations into state so we can change them
			//
			this.setState({testLocations: this.props.testLocations});
		}
	};

	render() {
		let error;
		if (this.props.testLocationFetchError) {
			error = (
				<Error closeError={this.closeError}>
					<strong>An error occured fetching WebPageTest locations:</strong>{" "}
					{this.props.testLocationFetchError}
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

									<button
										type="button"
										className="btn btn-primary test-configuration-opener"
										onClick={this.handleToggleAdvancedConfig}
									>
										Test Configuration
									</button>
								</fieldset>
							</div>
						</div>
					</div>
					<TestConfigurationModal
						testLocations={this.state.testLocations}
						updateLocations={this.updateLocations}
						numberOfTests={this.state.numberOfTests}
						updateNumberOfTests={this.updateNumberOfTests}
						testResultOptions={this.state.testResultOptions}
						updateTestResultOptions={this.updateTestResultOptions}
						openClose={this.state.advancedConfigOpen}
						handleClose={this.handleToggleAdvancedConfig}
					/>
				</div>
			</div>
		);
	}
}

TestConfiguration.propTypes = {
	submitTests: PropTypes.func.isRequired,
	testLocationFetchError: PropTypes.string,
	testLocations: PropTypes.array
};

export default TestConfiguration;
