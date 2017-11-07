import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Utils from './Utils.jsx';

export default class IssueEdit extends React.Component { // eslint-disable-line
  render() {
    return (
      <div style={{ paddingBottom: '10px' }}>
        <h1>This is a placeholder for editing issue {this.props.params.id}.</h1>
        <Link to="/issues">Back to issue list</Link>
        {((props) => { // Equivalent of Angular ng-if using IIFE()
            /* console.log('IssueEdit: this.props=', props); */
            /* console.log('IssueEdit: this.props.location=', this.props.location); */
            /* console.log('IssueEdit: this.props.location.query=', this.props.location.query); */
            /* console.log('IssueEdit: this.props.location.query.debug=', this.props.location.query.debug); */
            if (Utils.stringToBool(props.location.query.debug)) {
              return (<pre>this.props={JSON.stringify(props, null, 2)}</pre>);
            }

            return '';
        })(this.props)}
      </div>
    );
  }
}

IssueEdit.propTypes = {
  params: PropTypes.object.isRequired,
};
