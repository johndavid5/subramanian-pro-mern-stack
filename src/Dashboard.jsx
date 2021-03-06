import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Utils from './Utils.jsx';

export default class Dashboard extends React.Component { // eslint-disable-line
  render() {
    return (
      <div style={{ paddingBottom: '10px' }}>
        <h1>This is a placeholder for the dashboard...like an "index" page...</h1>
        <Link to="/issues">Issue List</Link>
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

Dashboard.propTypes = {
  params: PropTypes.object.isRequired,
};
