import 'babel-polyfill';
import React from 'react';
import PropTypes from 'prop-types';

import Utils from './Utils.jsx';

import Header from './Header.jsx';

const VERSION = '1.2.13';

console.log(`**** App.js, VERSION ${VERSION} ***`);
console.log('I\'ll be back, Bennett!');
console.log('Let off some steam, Bennett!');

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
  children: PropTypes.object.isRequired,
};

console.log('John...?  How\'s your arm, John...?');
console.log('Why don\'t you come over and find out...?');
console.log('Let off some steam, Bennett!');

export default App;
