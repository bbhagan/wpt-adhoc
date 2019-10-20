import PropTypes from "prop-types";

/**
 * Renders error box
 *
 * @class Error
 * @extends {React.Component}
 */
class Error extends React.Component {
	/**
	 * Handles click of close button or (x). Calls React props function.
	 *
	 * @memberof Error
	 */
	closeError = () => {
		this.props.closeError();
	};

	/**
	 * React lifecycle method.
	 *
	 * @returns {object}
	 * @memberof Error
	 */
	render() {
		return (
			<div className="ErrorContainer">
				<div className="alert alert-dismissible alert-danger">
					<button
						type="button"
						className="close"
						data-dismiss="alert"
						onClick={this.closeError}
					>
						×
					</button>
					{this.props.children}
				</div>
			</div>
		);
	}
}

Error.propTypes = {
	children: PropTypes.array.isRequired,
	closeError: PropTypes.func.isRequired
};

export default Error;
