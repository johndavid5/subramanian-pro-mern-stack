import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory, withRouter } from 'react-router';
// import { IndexRoute } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// import Dashboard from './Dashboard.jsx';
import IssueList from './IssueList.jsx';
import IssueReport from './IssueReport.jsx';
import IssueEdit from './IssueEdit.jsx';
import IssueAddNavItem from './IssueAddNavItem.jsx';
import Utils from './Utils.jsx';


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
      <IssueAddNavItem />
      <NavDropdown id="user-dropdown" title={<Glyphicon glyph="option-horizontal" />} noCaret>
        <MenuItem>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar>
);

// {
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
      {(function (props) { // Equivalent of Angular ng-if using IIFE()
          if (Utils.stringToBool(props.location.query.igor) || 1 == 1) {
            return (
            <div className="footer">
              <img src="/images/igor.130x130.c.gif" alt="Igor" style={{ width: '100px', height: '100px', float: 'left', paddingRight: '10px' }} />
              <h5>
              Subramanian&apos;s Full source code available at this <a href="https://github.com/vasansr/pro-mern-stack" target="_blank" rel="noopener noreferrer">GitHub repository</a>, Master
              <br />
              <br />
              Igor&apos;s Full source code available at this <a href="https://github.com/johndavid5/subramanian-pro-mern-stack" target="_blank" rel="noopener noreferrer">GitHub repository</a>, Master
              </h5>
            </div>
            );
          }
          else {
            return (
            <h5>
              <small>
              Full Subramanian source code available at this <a href="https://github.com/vasansr/pro-mern-stack" target="_blank" rel="noopener noreferrer">GitHub repository</a>
              <br />
              Full Aynedjian source code available at this <a href="https://github.com/johndavid5/subramanian-pro-mern-stack" target="_blank" rel="noopener noreferrer">GitHub repository</a>
              </small>
            </h5>
            );
          }
      }(props))}
    </div>
  </div>
);

App.propTypes = {
  children: React.PropTypes.object.isRequired,
};

// Inject the router property into the components which need it, using
// ReactRouter's withRouter method.  This method wraps a given component
// and makes the router property available.
//
//    {
//      /*
//      * child component resolved as a result of route matching
//      * will be passed to App via props.children
//      */
//    }
const RoutedApp = () => (
  <Router history={browserHistory}>
    {
      // In case you want an "index" page or "dashboard" 
      // as the default page...
      // <IndexRoute component={Dashboard} />
    }
    <Redirect from="/" to="/issues" />
    <Route path="/" component={App}>
      <Route path="/issues" component={withRouter(IssueList)} />
      <Route path="/issues/:id" component={IssueEdit} />
      <Route path="/reports" component={withRouter(IssueReport)} />
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
