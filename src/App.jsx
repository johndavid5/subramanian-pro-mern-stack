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

const RoutedApp = () => (
  <Router history={hashHistory}>
    <Redirect from="/" to="/issues" />
    <Route path="/issues" component={withRouter(IssueList)} />
    <Route path="/issues/:id" component={IssueEdit} />
    <Route path="*" component={NoMatch} />
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
