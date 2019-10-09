import React from 'react';
import PropTypes from 'prop-types';

class TestConfigurationSubmitTests extends React.Component {

   handleSubmitTests = e => {
      e.preventDefault();
      this.props.submitTests();
    };

   render() {
      return (
         <div className="TestConfigurationSubmitTestsContainer">
            <div className="row">
               <div className="col">
                  <button onClick={this.handleSubmitTests} className="main">Start Test(s)</button>
               </div>
            </div>
         </div>
      );
   }
}

TestConfigurationSubmitTests.propTypes = {
   submitTests: PropTypes.func.isRequired
}

export default TestConfigurationSubmitTests;