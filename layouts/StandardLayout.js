import Masthead from "../components/Masthead";
import Head from "next/head";
import "../public/static/scss/global.scss";

class StandardLayout extends React.Component {
	render() {
		return (
			<div className="StandardLayoutContainer">
				<Head>
					<title>WebPageTest Adhoc Helper</title>
				</Head>
				<Masthead />
				{this.props.children}
			</div>
		);
	}
}

export default StandardLayout;
