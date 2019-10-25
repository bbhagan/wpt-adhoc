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
	/**
	 * Creates an instance of TestConfiguration.
	 * @param {object} props
	 * @memberof TestConfiguration
	 */
	constructor(props) {
		super(props);
		this.state = {
			urls: [
				{ url: "", index: 0 },
				{ url: "", index: 1 },
				{ url: "", index: 2 }
			],
			grouping: "mobVsDesk",
			sorting: "alpha",
			testLocations: [],
			numberOfTests: 2,
			testResultOptions: resultsOptions,
			advancedConfigOpen: false,
			showTestLocationFetchError: true
		};
	}

	/**
	 * Receives call from component to submit test. Sets React state. Calls React props function.
	 *
	 * @memberof TestConfiguration
	 */
	submitTests = () => {
		this.setState({ advancedConfigOpen: false });
		this.props.submitTests(this.state);
	};

	/**
	 * Receives call from component to add more URLs to main test billboard. Sets React state.
	 *
	 * @memberof TestConfiguration
	 */
	addMoreURLs = () => {
		const urls = [
			...this.state.urls,
			{ url: "", index: this.state.urls.length },
			{ url: "", index: this.state.urls.length + 1 },
			{ url: "", index: this.state.urls.length + 2 }
		];
		this.setState({ urls });
	};

	/**
	 * Handles call to open/close advanced config modal. Sets React state.
	 *
	 * @memberof TestConfiguration
	 */
	handleToggleAdvancedConfig = () => {
		this.setState({ advancedConfigOpen: !this.state.advancedConfigOpen });
	};

	/**
	 * Receives call from component to update URLs to test. Sets React state.
	 *
	 * @param {array} urls -- URL array to test
	 * @memberof TestConfiguration
	 */
	updateURLs = urls => {
		this.setState({ urls: urls });
	};

	/**
	 * Receives call from component to update the test grouping. Sets React State.
	 *
	 * @param {string} grouping -- The grouping value
	 * @memberof TestConfiguration
	 */
	updateGrouping = grouping => {
		this.setState({ grouping });
	};

	/**
	 * Receives call from component to update the test sorting. Sets React State.
	 *
	 * @param {string} sorting -- The sorting value
	 * @memberof TestConfiguration
	 */
	updateSorting = sorting => {
		this.setState({ sorting });
	};

	/**
	 * Receives call from component to update locations to test against. Sets React state.
	 *
	 * @param {array} locations -- Locations to test against
	 * @memberof TestConfiguration
	 */
	updateLocations = locations => {
		this.setState({ locations: locations });
	};

	/**
	 * Receives call from component to update the number of tests to run. Sets React state.
	 *
	 * @param {number} numberOfTests -- Number of tests to run
	 * @memberof TestConfiguration
	 */
	updateNumberOfTests = numberOfTests => {
		this.setState({ numberOfTests: numberOfTests });
	};

	/**
	 * Receives call from component to update test result options. Sets React state.
	 *
	 * @param {array} options -- Array of test result options
	 * @memberof TestConfiguration
	 */
	updateTestResultOptions = options => {
		this.setState({ testResultOptions: options });
	};

	/**
	 * Handles user closing of error dialog. Sets React state.
	 *
	 * @memberof TestConfiguration
	 */
	closeError = () => {
		this.setState({ showTestLocationFetchError: false });
	};

	/**
	 * React lifecycle method.
	 * Takes Next js getInitialProps of locations and sets React state.
	 *
	 * @memberof TestConfiguration
	 */
	componentDidMount = () => {
		if (!this.props.testLocationFetchError && this.props.testLocations) {
			// move test locations into state so we can change them
			this.setState({ testLocations: this.props.testLocations });
		}
	};

	/**
	 * React lifecycle method.
	 *
	 * @returns {object}
	 * @memberof TestConfiguration
	 */
	render() {
		let error;
		if (
			this.props.testLocationFetchError &&
			this.state.showTestLocationFetchError
		) {
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
						grouping={this.state.grouping}
						updateGrouping={this.updateGrouping}
						sorting={this.state.sorting}
						updateSorting={this.updateSorting}
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
