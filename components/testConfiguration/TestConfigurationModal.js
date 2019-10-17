import PropTypes from "prop-types";
import "./TestConfigurationModal.scss";

class TestConfigurationModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: true
		};
	}

	handleClose = () => {
		this.setState({ open: false });
	};
	render() {
		return (
			<div className="TestConfigurationModalContainer">
				<div
					className="modal"
					style={this.state.open ? { display: "block" } : { display: "none" }}
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
									onClick={this.handleClose}
								>
									<span aria-hidden="true">×</span>
								</button>
							</div>
							<div className="modal-body">
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
									facilisis lobortis elementum. Aenean ac pharetra lacus.
									Integer ut mollis magna. Sed accumsan in nisl vitae
									vestibulum. Maecenas vitae posuere libero. Suspendisse
									bibendum libero at molestie lacinia. Maecenas ut lacus et
									metus volutpat vulputate. Duis in neque hendrerit, congue
									nulla ut, porta sapien. Nulla leo est, tempus eu tincidunt ac,
									vehicula ut tortor. Nam semper feugiat tortor, eget rutrum
									quam vestibulum at.
								</p>

								<p>
									Maecenas posuere consectetur dictum. Donec vitae semper justo.
									Nullam augue nisi, tincidunt quis erat a, fringilla ultrices
									nulla. In et elementum ipsum. Sed dictum tellus sit amet quam
									pharetra finibus. Praesent ac egestas nisi. Maecenas ultricies
									volutpat velit at rutrum. In pellentesque massa et bibendum
									euismod. Fusce lacus eros, venenatis sit amet blandit et,
									porttitor id lectus. Nulla iaculis cursus metus, et tincidunt
									eros dignissim eu. Vivamus quis quam nec nibh placerat
									vulputate vel vel risus. Vivamus ullamcorper hendrerit leo
									quis luctus. Sed consequat laoreet libero, eget lobortis magna
									luctus vitae. Nulla quam odio, porttitor sit amet erat sit
									amet, sagittis tempor nibh. Aliquam lectus sem, auctor egestas
									tortor non, facilisis vestibulum lorem.
								</p>

								<p>
									Nam id elementum lorem. Nulla hendrerit, purus vel maximus
									vestibulum, tellus purus mollis nisl, nec lobortis nunc justo
									non ipsum. Etiam varius aliquet placerat. Praesent sit amet
									nibh tincidunt, pharetra felis ut, vehicula justo. Ut vel
									sodales metus. Vivamus tempor nisl ultricies purus vestibulum,
									a tempus dui facilisis. Donec magna quam, volutpat id arcu
									vel, bibendum malesuada tellus. Fusce quis orci enim.
									Curabitur eu porttitor neque.{" "}
								</p>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-primary"
									onClick={this.handleClose}
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
