import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, withRouter, IndexRoute } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Dashboard from './Dashboard.jsx';
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';


const VERSION = '1.2.13';

console.log(`**** App.js, VERSION ${VERSION} ***`);
console.log('I\'ll be back, Bennett!');
console.log('Let off some steam, Bennett!');

const contentNode = document.getElementById('contents');

const NoMatch = () => <h1>Page Not Found</h1>;

const Header = () => (
  <Navbar fluid>
    <Navbar.Header>
      <Navbar.Brand>Issue Tracker</Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkContainer to="/issues">
        <NavItem>Issues</NavItem>
      </LinkContainer>
      <LinkContainer to="/reports">
        <NavItem>Reports</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <NavItem><Glyphicon glyph="plus" />Create Issue</NavItem>
      <NavDropdown id="user-dropdown" title={<Glyphicon glyph="option-horizontal" />} noCaret>
        <MenuItem>Logout</MenuItem>
      </NavDropdown> 
    </Nav>
  </Navbar>
);

//{
//
//   ReactRouter will pass via props.children
//   the child component resolved as a result of
//   route matching
//
// }
//
//    <div className="header" style={{ display: 'table', width: '500px' }}>
//      <img style={{ float: 'left' }} alt="" src="/images/tracker.gif" />
//      <div style={{ display: 'table-cell', verticalAlign: 'middle', textAlign: 'left' }}><h1>IssueTracker</h1></div>
//    </div>
//
//    <div className="footer" style={{ display: 'table', height: '130px' }}>
//      <div style={{ float: 'left', padding: '10px' }}>
//        <h2 className="igor" style={{
//                     display: 'tableCell',
//                     verticalAlign: 'middle',
//                     fontFamily: 'courier',
//                     fontSize: '175%',
//                     color: 'blue',
//        }}
//        >Full Subramanian<br />
//        source code<br />
//        available at this <br />
//          <a href="https://github.com/vasansr/pro-mern-stack" target="_blank" rel="noopener noreferrer" style={{ paddingLeft: '0.25em' }}>
//        GitHub&nbsp;repository
//          </a>,
//        <br />
//        Master...
//        </h2>
//      </div>
//
//      <img src="/images/igor.130x130.c.gif" alt="Igor" style={{ float: 'left', paddingRight: '10px' }} />
//
//      <div style={{ float: 'left', padding: '10px' }}>
//        <h2 className="igor" style={{
//                     display: 'tableCell',
//                     verticalAlign: 'middle',
//                     fontFamily: 'courier',
//                     fontSize: '175%',
//                     color: 'blue',
//        }}
//        >Johnny the Geek&apos;s<br />
//        source code<br />
//        available at this<br />
//          <a href="https://github.com/johndavid5/subramanian-pro-mern-stack" target="_blank" rel="noopener noreferrer" style={{ paddingLeft: '0.25em' }}>
//       GitHub&nbsp;repository
//          </a>,<br />
//       Master...
//        </h2>
//      </div>
//    </div>
const App = props => (
  <div>
    <Header />
    <div className="container-fluid">
      {props.children}
      <hr />
      <h5><small>
      Full source code available at this <a href="https://github.com/vasansr/pro-mern-stack">GitHub repository</a>
      </small></h5>
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
    <Route path="/" component={App}>
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
