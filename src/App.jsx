import 'babel-polyfill';
import React from 'react';
import PropTypes from 'prop-types';
import withToast from './withToast.jsx';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import IssueAddNavItem from './IssueAddNavItem.jsx';
import Utils from './Utils.jsx';

const VERSION = '1.2.13';

console.log(`**** App.js, VERSION ${VERSION} ***`);
console.log('I\'ll be back, Bennett!');
console.log('Let off some steam, Bennett!');

const Header = (props) => (
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
      <IssueAddNavItem showError={props.showError}/>
      <NavDropdown id="user-dropdown" title={<Glyphicon glyph="option-horizontal" />} noCaret>
        <MenuItem>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar>
);

Header.propTypes = {
  showError: PropTypes.func.isRequired,
}

// Use HeaderWithToast to pass showError() through
// via props to IssueAddNavItem.
const HeaderWithToast = withToast(Header);

const App = props => (
  <div>
    <HeaderWithToast />
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
  children: PropTypes.object.isRequired,
};



console.log('John...?  How\'s your arm, John...?');
console.log('Why don\'t you come over and find out...?');
console.log('Let off some steam, Bennett!');

export default App;
