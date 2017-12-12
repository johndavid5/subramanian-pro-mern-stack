import 'babel-polyfill';
import React from 'react';
import PropTypes from 'prop-types';

import Utils from './Utils.jsx';

import Header from './Header.jsx';

const VERSION = '1.2.13';

console.log(`**** App.js, VERSION ${VERSION} ***`);
console.log('I\'ll be back, Bennett!');
console.log('Let off some steam, Bennett!');

export default class App extends React.Component {

  static dataFetcher({urlBase,cookie}){
    const headers = cookie ? { headers: { Cookie: cookie}}: null;
    return fetch(`${urlBase||''}/api/users/me`, headers)
    .then(response => {

      if(!response.ok){
        return response.json()
        .then(error=>Promise.reject(error))
      }

      return response.json()
      .then(data => ({App:data}));

    });
  }/* static dataFetcher() */

  constructor(props,context){
    super(props,context);

    const user = context.initialState.App?context.initialSTate.App:{};

    this.state = {
      user
    };

    this.onSignin = this.onSignin.bind(this);
    this.onSignout = this.onSignout.bind(this);
  }

  componentDidMount(){
    App.dataFetcher({})
    .then(data => {
      const user = data.App;
      this.setState({user});
    });
  }/* componentDidMount() */

  onSignin(name){
    this.setState({user: {signedIn: true, name }});
  }

  onSignout(){
    this.setState({user: {signedIn: false, name:'' }});
  }

  render(){ 

    const childrenWithUser = React.Children.map(this.props.children,
      child=>React.cloneElement(child, {user: this.state.user})
    );

    return(
    <div>
      <Header user={this.state.user} onSignin={this.onSignin}
			  onSignout={this.onSignout} />
      <div className="container-fluid">
        {childrenWithUser}
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
        }(this.props))}
      </div>
    </div>
  );
  }/* render() */

}/* class App */

App.contextTypes = {
  initialState: PropTypes.object,
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

console.log('John...?  How\'s your arm, John...?');
console.log('Why don\'t you come over and find out...?');
console.log('Let off some steam, Bennett!');

