import React from 'react';
import PropTypes from 'prop-types';

class TestConfigurationURLs extends React.Component {

   handleUrlChange = idx => e => {
      const tempUrls = this.props.urls.map((url, urlIdx) => {
        if (idx !== urlIdx) return url;
        return { ...url, url: e.target.value };
      });
      this.props.updateURLs(tempUrls);
    };
  
    handleUrlBlur = idx => e => {
      const tempUrls = this.props.urls.map((url, urlIdx) => {
        if (idx !== urlIdx) return url;
        if (e.target.value.indexOf("http") === -1 && e.target.value !== "") {
          return { ...url, url: "https://" + e.target.value };
        } else {
          return { ...url, url: e.target.value };
        }
      });
      this.props.updateURLs(tempUrls);
    };

   render() {
      return(
         <div className="TestConfigurationURLsContainer">
            {this.props.urls.map((url, idx) => (
               <div className="row" key={idx}>
                  <div className="col" key={idx}>
                     <input
                        key={idx}
                        type="text"
                        size="83"
                        value={url.url}
                        onChange={this.handleUrlChange(idx)}
                        onBlur={this.handleUrlBlur(idx)}
                     />
                  </div>
               </div>
            ))}
         </div>
      );
   }
}

TestConfigurationURLs.propTypes = {
   urls: PropTypes.array.isRequired,
   updateURLs: PropTypes.func.isRequired
}

export default TestConfigurationURLs;