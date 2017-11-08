import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, hashHistory, withRouter } from 'react-router';

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
    <div className="header">
      <h1>IssueTracker</h1>
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
    <div className="footer"> 
	<img src="/images/igor.130x130.c.gif" style={{float: 'left', paddingRight: '10px'}}></img>
	<h1 style={{fontFamily: 'courier', color: 'purple'}}>I'll be back, Bennett!</h1>
	<h1 style={{fontFamily: 'courier', color: 'blue'}}>Let off some steam, Bennett!</h1>
    <p>
    Full source code available at this
    <a href="https://github.com/vasansr/pro-mern-stack">
    GitHub repository</a>.
    </p>
    </div>
  </div>
);

App.propTypes = {
  children: React.PropTypes.object.isRequired,
};

const RoutedApp = () => (
  <Router history={hashHistory}>
    <Redirect from="/" to="/issues" />
    <Route path="/" component={App}>j
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
