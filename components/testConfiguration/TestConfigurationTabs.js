import React from 'react';
import './TestConfigurationTabs.scss';

class TestConfigurationTabs extends React.Component {
   
   
   render() {
      return (
         <div className="TestConfigurationTabsContainer">
            <div className="row">
               <div className={this.props.selectedTab === 'basic' ? "col tab selectedTab" : "col tab deselectedTab"} onClick={() => this.props.updateTab('basic')}>Basic</div>
               <div className={this.props.selectedTab === 'results' ? "col tab selectedTab" : "col tab deselectedTab"} onClick={() => this.props.updateTab('results')}>Results</div>
               <div className="col-5 tab emptyTab">&nbsp;</div>
               <div className="col-5">&nbsp;</div>
            </div>
         </div>
      );
   }
}

export default TestConfigurationTabs;