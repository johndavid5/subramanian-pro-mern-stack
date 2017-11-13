import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory, withRouter, IndexRoute } from 'react-router';

import Dashboard from './Dashboard.jsx';
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';


const VERSION = '1.2.13';

console.log(`**** App.js, VERSION ${VERSION} ***`);
console.log('I\'ll be back, Bennett!');
console.log('Let off some steam, Bennett!');

const contentNode = document.getElementById('contents');

const NoMatch = () => <h1>Page Not Found</h1>;

const App = (props) => (
  <div>
    <div className="header" style={{display: "table", width: "500px"}}>
      <img style={{float: "left"}} src="/images/tracker.gif" />
      <div style={{display: "table-cell",  verticalAlign: "middle", textAlign: "left"}}><h1>IssueTracker</h1></div>
    </div>
    {
     //
     //   ReactRouter will pass via props.children
     //   the child component resolved as a result of
     //   route matching 		
     //
	}
    <div className="contents">
      {props.children}
    </div>
    <div className="footer" style={{display: 'table', height: '130px'}}> 
	    <div style={{float: 'left', padding: '10px'}}>
	    <h2 style={{display: 'tableCell', verticalAlign: 'middle', fontFamily: 'courier', color: 'blue'}}>Full Subramanian<br />
        source code<br />
        available at this <br />
	    <a href="https://github.com/vasansr/pro-mern-stack" target="_blank" style={{paddingLeft: '0.25em'}}>
	    GitHub&nbsp;repository</a>,<br />
	    Master...
	    </h2>
	    </div>

		<img src="/images/igor.130x130.c.gif" style={{float: 'left', paddingRight: '10px'}}></img>

	    <div style={{float: 'left', padding: '10px'}}>
	    <h2 style={{display: 'tableCell', verticalAlign: 'middle', fontFamily: 'courier', color: 'blue'}}>Johnny Geek's<br />
        source code<br />
        available at this <br />
	    <a href="https://github.com/johndavid5/subramanian-pro-mern-stack" target="_blank" style={{paddingLeft: '0.25em'}}>
	    GitHub&nbsp;repository</a>,<br />
	    Master...
	    </h2>
	    </div>
    </div>
  </div>
);

App.propTypes = {
  children: React.PropTypes.object.isRequired,
};

const RoutedApp = () => (
  <Router history={browserHistory}>
	{
	  // <Redirect from="/" to="/issues" />
    }
    <Route path="/" component={App}>j
      <IndexRoute component={Dashboard} />
	  {
       /*
	   * child component resolved as a result of route matching
       * will be passed to App via props.children 
	   */
	  }
      <Route path="/issues" component={withRouter(IssueList)} />
      <Route path="/issues/:id" component={IssueEdit} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
);

// Render the component inside the content Node
// ReactDOM.render(<IssueList />, contentNode);
ReactDOM.render(<RoutedApp />, contentNode);

// Accept Hot Module Replacement (HMR)...
if (module.hot) {
  module.hot.accept();
}

console.log('John...?  How\'s your arm, John...?');
console.log('Why don\'t you come over and find out...?');
console.log('Let off some steam, Bennett!');

// class IssueHelper {
//  static handleNullDate(leDate) {
//    return (leDate ? leDate.toDateString() : '');
//  }
// }
