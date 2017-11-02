import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

export default class IssueEdit extends React.Component { // eslint-disable-line
  render() {
    return (
      <div>
        <h1>This is a placeholder for editing issue {this.props.params.id}.</h1>
        <Link to="/issues">Back to issue list</Link>		
      </div>
    );
  }
}

IssueEdit.propTypes = {
  params: PropTypes.object.isRequired,
}
