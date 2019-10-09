import React from 'react';
import PropTypes from 'prop-types';

class TestResultTableHeader extends React.Component {
   renderCopy = (resultOption) => {
      let copy = resultOption.name;
      if (resultOption.uom) copy += ' (' + resultOption.uom + ')';
      return copy;
   }
   render() {
      return(
         <tr>
            <th style={{border: '1px solid black'}}></th>
            {this.props.resultOptions.map((resultOption) => (
               <th style={{border: '1px solid black'}}>{this.renderCopy(resultOption)}</th>
            ))}
         </tr>
      );
   }
}

TestResultTableHeader.propTypes = {
   resultOptions: PropTypes.array.isRequired
};

export default TestResultTableHeader;