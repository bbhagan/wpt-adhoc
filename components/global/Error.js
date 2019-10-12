import PropTypes from "prop-types";

class Error extends React.Component {
	closeError = () => {
		this.props.closeError();
	};
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
