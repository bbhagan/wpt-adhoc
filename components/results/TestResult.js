import React from 'react';
import TestResultTableHeader from './TestResultTableHeader';
import TestResultsLine from './TestResultLine';
import TestResultAverageLine from './TestResultAverageLine';
import PropTypes from 'prop-types';

class TestResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            test: this.props.test,
            continuedStatus400: false
        };
        
    }

    componentDidMount = () => {
        this.fetchTestResults(this.state.test.testId);
    }

    fetchTestResults = (id) => {
        fetch(`/api/getTestResults/${id}`)
        .then(response => response.json())
        .then(resJson => {
            let newTest = this.state.test;
            switch (resJson.statusCode) {
                //Test complete, data came back
                case 200:
                    //update the state with new test values
                    newTest.completed = true;
                    newTest.behindCount = null;
                    newTest.data = resJson.data;
                    this.setState(newTest);
                    break;
                //Test started, not complete
                case 100:
                    //update the test with elapsed time and (potentially) call again
                    newTest.elapsedSeconds = resJson.testElapsedSeconds;
                    this.setState(newTest);
                    if (resJson.testElapsedSeconds < 1000) {
                        setTimeout(() => {this.fetchTestResults(id)}, 2000);
                    }
                    break;
                //Waiting behind other tests
                case 101:
                    newTest.behindCount = resJson.behindCount;
                    this.setState(newTest);
                    setTimeout(() => {this.fetchTestResults(id)}, 2000);
                    break;
                case 400:
                    //test maybe too new to request data on. Retry one time after 5 seconds
                    if (!this.state.continuedStatus400) {
                        setTimeout(() => {this.fetchTestResults(id)}, 5000);
                    }
                    break;
                default:
                    console.log(`Error in fetTestResults, unknown statusCode: ${resJson.statusCode}`);
            }
        })
        .catch();
    }

    renderResultsTable = () => {
        if (this.state.test.completed) {
            return(
                <div>
                    <p>
                        Test Id: <a href={'http://10.10.0.90/result/' + this.state.test.testId} target="_blank" rel="noopener noreferrer">{this.state.test.testId}</a>, 
                        Test URL: <a href={this.state.test.url} target="_blank" rel="noopener noreferrer">{this.state.test.url}</a>, 
                        Location: {this.state.test.location}
                    </p>
                    <table style={{margin: '0 0 40px 0'}}>
                        <tbody>
                            <TestResultTableHeader resultOptions={this.props.resultOptions}/>
                            {this.state.test.data.runs.map((run, idx) => (
                                <TestResultsLine idx={idx} run={run} resultOptions={this.props.resultOptions} />
                            ))}
                            <TestResultAverageLine data={this.state.test.data.average.firstView} resultOptions={this.props.resultOptions}/>
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (
                <p>
                    Test Id: <a href={'http://10.10.0.90/result/' + this.state.test.testId} target="_blank" rel="noopener noreferrer">{this.state.test.testId}</a>,
                    Test URL: <a href={this.state.test.url} target="_blank" rel="noopener noreferrer">{this.state.test.url}</a>,
                    Location: {this.state.test.location}
                    {this.state.test.elapsedSeconds ? ', Elapsed Time: ' + this.state.test.elapsedSeconds + ' seconds' : '' }
                    {this.state.behindCount ? ', Behind Count: ' + this.state.behindCount : ''}
                </p>
            )
        }
    };
    
    
    render() {
        return(
            <div className="TestResultContainer">
                {this.renderResultsTable()}
            </div>
        )
    }
}

TestResults.propTypes = {
    test: PropTypes.object.isRequired,
    key: PropTypes.string.isRequired,
    resultOptions: PropTypes.array.isRequired
};

export default TestResults;