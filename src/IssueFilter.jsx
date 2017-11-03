import React from 'react';
import {Link} from 'react-router';

//  3:16  error  Component should be written as a pure function  react/prefer-stateless-function
export default class IssueFilter extends React.Component { // eslint-disable-line
  render() {
    const Separator = () => <span>|</span>;
    return (
      <div>
        <Link to="/issues">All Issues</Link>
        <Separator />
        <Link to={{pathname:'/issues', query: {status: 'Open'}}}>Open Issues</Link>
        <Separator />
        <Link to="/issues?status=Assigned">Assigned Issues</Link>
      </div>
    );
  }
}

