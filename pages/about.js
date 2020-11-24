import React from "react";
import StandardLayout from "../layouts/StandardLayout";

/**
 * Renders the about page
 *
 * @class About
 * @extends {React.Component}
 */
class About extends React.Component {
  /**
   * React lifecycle method
   *
   * @returns
   * @memberof About
   */
  render() {
    return (
      <StandardLayout>
        <div className="aboutPageContainer">
          <div className="container">
            <div className="wptah-section clearfix">
              <h2>About Webpage Ad-hoc Helper</h2>
              <p>
                This utility was created to help in performance testing
                websites. It can do competative analysis, mobile vs. desktop,
                and also before and after tests.
              </p>
              <p>Made by Brian Hagan</p>
              <p>Made using the following technologies:</p>
              <ul>
                <li>
                  Testing by{" "}
                  <a href="https://www.webpagetest.org/">WebPageTest</a>
                </li>
                <li>
                  Display framework by <a href="https://reactjs.org/">React</a>
                </li>
                <li>
                  Server-side rendering by{" "}
                  <a href="https://nextjs.org/">Next.js</a>
                </li>
                <li>
                  Application server by <a href="https://nodejs.org">Node.js</a>
                </li>
                <li>
                  Layout by <a href="https://getbootstrap.com/">Bootstrap</a>
                </li>
                <li>
                  Theme by <a href="https://bootswatch.com/">Bootswatch</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </StandardLayout>
    );
  }
}

export default About;
