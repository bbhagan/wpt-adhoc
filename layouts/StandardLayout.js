import Masthead from "../components/global/Masthead";
import Footer from "../components/global/Footer";
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
        <Footer />
      </div>
    );
  }
}

export default StandardLayout;
