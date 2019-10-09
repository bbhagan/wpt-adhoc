import React from 'react';
import PropTypes from 'prop-types';

class TestConfigurationAddMoreURLs extends React.Component {
   handleAddMoreURLs = (e) => {
      e.preventDefault();
      this.props.addMoreURLs();
   }
   
   render() {
      return(
         <div className="TestConfigurationAddMoreURLsContainer">
            <div className="row">
               <div className="column">
                  <button onClick={this.handleAddMoreURLs}>+ Add more URLs</button>
               </div>
            </div>
         </div>
      );
   }
}

TestConfigurationAddMoreURLs.propTypes = {
   addMoreURLs: PropTypes.func.isRequired
};

export default TestConfigurationAddMoreURLs;