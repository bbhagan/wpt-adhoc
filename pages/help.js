import StandardLayout from "../layouts/StandardLayout";

/**
 * Renders the help page
 *
 * @class Help
 * @extends {React.Component}
 */
class Help extends React.Component {
	render() {
		return (
			<StandardLayout>
				<div className="helpPageContainer">
					<div className="container">
						<div className="wptah-section clearfix">
							<h2>Help Running Ad-hoc Webpage Tests</h2>
						</div>
					</div>
				</div>
			</StandardLayout>
		);
	}
}

export default Help;
