import React from "react";
import Masthead from "../components/global/Masthead";
import Footer from "../components/global/Footer";
import Head from "next/head";
import "../public/static/scss/global.scss";

/**
 * Layout class provides header/footer
 * @class StandardLayout
 * @extends {React.Component}
 */
class StandardLayout extends React.Component {
	/**
	 * React lifecycle method
	 *
	 * @returns {object}
	 * @memberof StandardLayout
	 */
	render() {
		return (
			<div className="StandardLayoutContainer">
				<Head>
					<title>WebPageTest Adhoc Helper</title>
				</Head>
				<Masthead />
				{this.props.children}
				<Footer />
			</div>
		);
	}
}

export default StandardLayout;
