import React from 'react';
/* Update required for React 16.0.0: PropTypes is required as
* a separate module...it will no longer available
* via React.PropTypes.
*/
import PropTypes from 'prop-types';

import 'whatwg-fetch';
import {Link} from 'react-router';

import IssueAdd from './IssueAdd.jsx';
import IssueFilter from './IssueFilter.jsx';
import Utils from './Utils.jsx';

// For performance reasons, stateless components
// should be written as functions rather than classes.
// The view is a pure function of its props.
// const IssueRow = (props)=>(
const IssueRow = (props) => {
  console.log('IssueRow: props = ', props);
  return (
    <tr>
      <td><Link to={`issues/${props.issue._id}`}>{props.issue._id.substr(-4)}</Link></td>
      <td>{props.issue.status}</td>
      <td>{props.issue.owner}</td>
      <td>{props.issue.created.toDateString()}</td>
      <td>{props.issue.effort}</td>
      <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ''}</td>
      <td>{props.issue.title}</td>
    </tr>
  );
};
// );

IssueRow.propTypes = {
  // issue: React.PropTypes.object.isRequired,
  issue: PropTypes.object.isRequired,
};

// For performance reasons, stateless components
// should be written as functions rather than classes.
// The view is a pure function of its props.
function IssueTable(props) {
  const issueRows = props.issues.map(issue => (<IssueRow key={issue._id} issue={issue} />));

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Completion Date</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>{issueRows}</tbody>
    </table>
  );
}

IssueTable.propTypes = {
  // issues: React.PropTypes.array.isRequired,
  issues: PropTypes.array.isRequired,
};

export default class IssueList extends React.Component {
  constructor() {
    super();

    this.state = { issues: [] };

    // Bind once...re-use multiple times...
    // actually, you must bind it here in
    // the constructor since it's now being
    // called from another component...
    this.createIssue = this.createIssue.bind(this);
  }

  // A React lifecycle method to indicate that
  // the component is ready...
  // that is, mounted and placed into the DOM...
  //...a bit like onLoad() in a web page...
  componentDidMount() {
    const sWho = 'componentDidMount';
    console.log(`${sWho}: Calling this.loadData()...`);
    this.loadData();
  }

  // A React lifecycle method to indicate that
  // a property - any property - of the component
  // has changed.
  componentDidUpdate(prevProps){
    const oldQuery = prevProps.location.query;
    const newQuery = this.props.location.query;
    if( oldQuery.status === newQuery.status ){
      return;
    }
    this.loadData();
  }


  loadData() {
    const sWho = 'loadData';

    //const url = '/api/issues';
    const url = `/api/issues${this.props.location.search}`;

    console.log(`${sWho}(): Calling fetch("${url}")...\n`);

    fetch(url)
      .then((response) => {
        console.log(`${sWho}(): recieved response = `, response);
        if (response.ok) {
          response.json()
            .then((data) => {
              console.log('Total count of records:', data._metadata.total_count);

              data.records.forEach((issue) => {
                // Convert from ISO string to Date object...
                issue.created = new Date(issue.created);
                if (issue.completionDate) {
                  issue.completionDate = new Date(issue.completionDate);
                }
              });

              this.setState({ issues: data.records });
            });
        } else {
          response.json()
            .then((error) => {
              alert(`Failed to fetch issues:${error.message}`);
            });
        }
      })
      .catch((err) => {
        alert('HTTP Error in fetching data from server:', err);
      });
  }/* loadData() */

  createIssue(newIssue) {
    // Use Array.slice() to create a shallow copy, meaning
    // it copies references of object elements...and makes
    // copies of primitive elements...
    //
    // const newIssues = this.state.issues.slice();
    // newIssue.id = this.state.issues.length + 1;
    // newIssues.push(newIssue);
    //
    // this.setState({issues: newIssues });

    fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue),
    })
      .then((response) => {
        if (response.ok) {
          response.json()
            .then((updatedIssue) => {
              // Convert ISO 8601 date string to a Date object...
              updatedIssue.created = new Date(updatedIssue.created);
              if (updatedIssue.completionDate) {
                updatedIssue.completionDate = new Date(updatedIssue.completionDate);
              }

              // The concat() method is used to merge two or more
              // arrays. This method does not change the existing arrays,
              // but instead returns a new array.
              const newIssues = this.state.issues.concat(updatedIssue);
              // Remember the state is immutable, so you
              // cannot make modifications to it...
              // So we use the concat() function of Array
              // which creates a copy of the original array,
              // and therefore is safe.

              // When React sees the state being modified
              // via setState(), it triggers a rerendering
              // process for the component, and _all_descendent_
              // components where properties get affected because
              // of the state change.
              this.setState({ issues: newIssues });
            });
        } else {
          response.json()
            .then((error) => {
              alert(`Failed to add issue: ${error.message}`);
            });
        }
      })
      .catch((err) => {
        alert(`Error in sending data to server: ${
          err.message}`);
      });
  }/* createIssue() */

  render() {
    return (
      <div>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
        <hr />
		{(function(props) {
          if (Utils.stringToBool(props.location.query.debug)) {
            return (<pre>this.props={JSON.stringify(props, null, 2)}</pre>);
          }
        })(this.props)}
      </div>
    );
  }
}

IssueList.propTypes = {
  location: React.PropTypes.object.isRequired,
};

