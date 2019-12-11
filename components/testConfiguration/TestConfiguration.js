import React from "react";
import TestConfigurationURLs from "./TestConfigurationURLs";
import TestConfigurationSubmitTests from "./TestConfigurationSubmitTests";
import TestConfigurationModal from "./TestConfigurationModal";

import TestConfigurationAddMoreURLs from "./TestConfigurationAddMoreURLs";

import Error from "../global/Error";

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
			testLocations: [],
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
	 * Handles call to open/close advanced config modal. Sets React state.
	 *
	 * @memberof TestConfiguration
	 */
	handleToggleAdvancedConfig = () => {
		this.setState({ advancedConfigOpen: !this.state.advancedConfigOpen });
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
		if (this.props.testLocationFetchError && this.state.showTestLocationFetchError) {
			error = (
				<Error closeError={this.closeError}>
					<strong>An error occured fetching WebPageTest locations:</strong> {this.props.testLocationFetchError}
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
											<TestConfigurationURLs urls={this.props.urls} handleUpdateURLs={this.props.handleUpdateURLs} />
											<TestConfigurationAddMoreURLs handleAddMoreURLs={this.props.handleAddMoreURLs} />
										</div>
										<div className="col-4">
											<TestConfigurationSubmitTests submitTests={this.submitTests} />
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
						grouping={this.props.grouping}
						handleUpdateGrouping={this.props.handleUpdateGrouping}
						sorting={this.props.sorting}
						handleUpdateSorting={this.props.handleUpdateSorting}
						testLocations={this.state.testLocations}
						updateLocations={this.updateLocations}
						numberOfTests={this.props.numberOfTests}
						handleUpdateNumberOfTests={this.props.handleUpdateNumberOfTests}
						resultOptions={this.props.resultOptions}
						handleUpdateResultOptions={this.props.handleUpdateResultOptions}
						openClose={this.state.advancedConfigOpen}
						handleClose={this.handleToggleAdvancedConfig}
					/>
				</div>
			</div>
		);
	}
}

TestConfiguration.propTypes = {
	urls: PropTypes.array.isRequired,
	handleAddMoreURLs: PropTypes.func.isRequired,
	handleUpdateURLs: PropTypes.func.isRequired,
	grouping: PropTypes.string.isRequired,
	handleUpdateGrouping: PropTypes.func.isRequired,
	sorting: PropTypes.string.isRequired,
	handleUpdateSorting: PropTypes.func.isRequired,
	numberOfTests: PropTypes.number.isRequired,
	handleUpdateNumberOfTests: PropTypes.func.isRequired,
	resultOptions: PropTypes.array.isRequired,
	handleUpdateResultOptions: PropTypes.func.isRequired,
	submitTests: PropTypes.func.isRequired,
	testLocationFetchError: PropTypes.string,
	testLocations: PropTypes.array
};

export default TestConfiguration;
