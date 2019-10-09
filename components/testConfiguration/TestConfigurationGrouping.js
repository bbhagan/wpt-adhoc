import React from 'react';

class TestConfigurationGrouping extends React.Component {
   render() {
      return(
         <div className="TestConfigurationGroupingContainer">
            <div className="fakeH2">Grouping</div>
            <select>
                  <option value="mobVsDesk">None (Just run the tests)</option>
                  <option value="mobVsDesk">Mobile Vs. Desktop</option>
                  <option value="mobVsDesk">Competative Analysis</option>
                  <option value="mobVsDesk">Before &amp; After</option>
            </select>
         </div>
      );
   }
}

export default TestConfigurationGrouping;