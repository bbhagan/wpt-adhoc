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
						<div className="collapse navbar-collapse" id="navbarColor01">
							<ul className="navbar-nav mr-auto">
								<li className="nav-item active">
									<Link href="/">
										<a className="nav-link">
											Home <span className="sr-only">(current)</span>
										</a>
									</Link>
								</li>
								<li className="nav-item">
									<Link href="/help">
										<a className="nav-link">Help</a>
									</Link>
								</li>
								<li className="nav-item">
									<Link href="/about">
										<a className="nav-link">About</a>
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

export default Masthead;
