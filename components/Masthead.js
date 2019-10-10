import Link from "next/link";

class Masthead extends React.Component {
	render() {
		return (
			<div className="MastheadContainer">
				<nav className="navbar navbar-expand-lg navbar-dark bg-light">
					<div className="container">
						<Link href="/">
							<a className="navbar-brand">Webpagetest Helper</a>
						</Link>
					</div>
				</nav>
			</div>
		);
	}
}

export default Masthead;
